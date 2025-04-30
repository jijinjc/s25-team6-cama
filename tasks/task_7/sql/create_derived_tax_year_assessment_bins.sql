CREATE OR REPLACE TABLE derived.previous_assessment_bins AS
WITH yearly_stats AS (
  SELECT
    CAST(year AS INT64) AS tax_year,
    LOG10(MIN(market_value)) AS log_min,
    LOG10(MAX(market_value)) AS log_max
  FROM `musa5090s25-team6.source.opa_assessments`
  WHERE market_value > 0
    AND CAST(year AS INT64) < 2025
  GROUP BY tax_year
),

log_bins AS (
  SELECT
    tax_year,
    POWER(10, log_min + (n-1) * ((log_max - log_min)/25)) AS lower_bound,
    POWER(10, log_min + n * ((log_max - log_min)/25)) AS upper_bound,
    n AS bin_num
  FROM yearly_stats
  CROSS JOIN UNNEST(GENERATE_ARRAY(1, 25)) AS n
),

property_counts AS (
  SELECT
    b.tax_year,
    CAST(b.lower_bound AS INT64) AS lower_bound,
    CAST(b.upper_bound AS INT64) AS upper_bound,
    COUNT(a.market_value) AS property_count
  FROM log_bins b
  LEFT JOIN `musa5090s25-team6.source.opa_assessments` a
    ON CAST(a.year AS INT64) = b.tax_year
    AND a.market_value >= b.lower_bound
    AND (a.market_value < b.upper_bound OR 
        (b.bin_num = 25 AND a.market_value <= b.upper_bound))
  GROUP BY b.tax_year, b.lower_bound, b.upper_bound, b.bin_num
)

SELECT
  tax_year,
  lower_bound,
  upper_bound,
  property_count,
FROM property_counts
ORDER BY tax_year, lower_bound;