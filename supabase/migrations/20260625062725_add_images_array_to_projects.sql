/*
# Add multi-image support to projects table

1. Modified Tables
- `projects`
  - Added `images text[]` column to support up to 10 project screenshots (replaces single `image_url`).
  - The new column is nullable during migration; existing rows are backfilled from `image_url`.
  - `image_url` is kept for backwards compatibility (data safety — never drop columns).

2. Data Migration
- For every existing project row, populate `images` as a single-element array containing the old `image_url` value, so no data is lost.

3. Security
- No RLS policy changes. Existing anon + authenticated CRUD policies on `projects` continue to apply to the new column automatically.

4. Important Notes
- The frontend now reads/writes the `images` array and ignores `image_url` for new entries.
- `image_url` remains in the schema but is no longer used by the application.
*/

-- 1. Add the new images array column (nullable initially so backfill can run)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS images text[];

-- 2. Backfill: convert each existing single image_url into a one-element images array
UPDATE projects SET images = ARRAY[image_url] WHERE images IS NULL AND image_url IS NOT NULL;

-- 3. For any rows where image_url was null, set an empty array so the column is never null going forward
UPDATE projects SET images = '{}' WHERE images IS NULL;
