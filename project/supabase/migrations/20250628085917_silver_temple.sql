/*
  # Create books table for public domain library

  1. New Tables
    - `books`
      - `id` (uuid, primary key) - Book identifier
      - `title` (text) - Book title
      - `author` (text) - Book author
      - `description` (text) - Book description
      - `category` (text) - Book category
      - `age_group` (text) - Target age group
      - `cover_image` (text, optional) - Cover image URL
      - `pdf_url` (text, optional) - PDF file URL
      - `is_public_domain` (boolean) - Public domain status
      - `download_count` (integer) - Number of downloads
      - `created_at` (timestamp) - Addition date

  2. Security
    - Enable RLS on `books` table
    - All authenticated users can read books
    - Only admins can manage books
*/

CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  age_group text NOT NULL,
  cover_image text,
  pdf_url text,
  is_public_domain boolean DEFAULT true,
  download_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read books
CREATE POLICY "Books are readable by authenticated users"
  ON books
  FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can manage books
CREATE POLICY "Admins can manage books"
  ON books
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS books_category_idx ON books(category);
CREATE INDEX IF NOT EXISTS books_age_group_idx ON books(age_group);
CREATE INDEX IF NOT EXISTS books_public_domain_idx ON books(is_public_domain);