EXPORT DATA OPTIONS (
  uri = 'gs://{{bucket_name}}/property_tile_info_*.geojson',
  format = 'GEOJSON',
  overwrite = true
) AS
WITH latest_tax_year AS (
  SELECT
    property_id,
    SAFE_CAST(year AS INT64) AS year,
    market_value,
    ROW_NUMBER() OVER (
      PARTITION BY property_id
      ORDER BY SAFE_CAST(year AS INT64) DESC
    ) AS rn
  FROM core.opa_assessments
),
final_tax_year AS (
  SELECT
    property_id,
    market_value AS tax_year_assessed_value
  FROM latest_tax_year
  WHERE rn = 1
)
SELECT
  ca.property_id,
  parcels.address,
  parcels.geog,
  ca.predicted_value AS current_assessed_value,
  fy.tax_year_assessed_value
FROM derived.current_assessments ca
LEFT JOIN final_tax_year fy
  ON ca.property_id = fy.property_id
LEFT JOIN core.opa_parcels parcels
  ON ca.property_id = parcels.brt_id
WHERE parcels.geog IS NOT NULL;