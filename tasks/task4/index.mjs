import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

import { BigQuery } from '@google-cloud/bigquery';
import { Storage } from '@google-cloud/storage';
import functions from '@google-cloud/functions-framework';

functions.http('generate-assessment-chart-configs', async (req, res) => {
  console.log('Generating tax year assessment Json data...');

  try {
    const bigquery = new BigQuery();
    const query = `
      SELECT tax_year, lower_bound, upper_bound, property_count
      FROM derived.previous_assessment_bins
    `;
    const [rows] = await bigquery.query({ query });

    const jsonData = JSON.stringify(rows, null, 2);

    const bucketName = process.env.PUBLIC_BUCKET_NAME;
    const destination = 'configs/previous_assessment_bins.json';

    const storage = new Storage();
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(destination);

    await file.save(jsonData, {
      contentType: 'application/json',
      resumable: false,
    });

    console.log(`File uploaded to gs://${bucketName}/${destination}`);
    res.status(200).send('Success to generate JSON file!');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Failed to generate JSON file.');
  }
});
