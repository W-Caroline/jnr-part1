/*
  # Create stories table for magical tales

  1. New Tables
    - `stories`
      - `id` (uuid, primary key) - Story identifier
      - `user_id` (uuid, foreign key) - Creator of the story
      - `title` (text) - Story title
      - `content` (text) - Full story content
      - `category` (text) - Story category (bedtime, educational, adventure, moral)
      - `age_group` (text) - Target age group (3-5, 6-8, 9-12)
      - `cover_image` (text, optional) - Cover image URL
      - `audio_url` (text, optional) - Audio narration URL
      - `life_lesson` (text, optional) - Life lesson taught
      - `reading_time` (integer) - Estimated reading time in minutes
      - `is_favorite` (boolean) - User favorite flag
      - `created_at` (timestamp) - Creation date

  2. Security
    - Enable RLS on `stories` table
    - Users can manage their own stories
    - Stories can be shared publicly for reading
*/

CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL CHECK (category IN ('bedtime', 'educational', 'adventure', 'moral')),
  age_group text NOT NULL CHECK (age_group IN ('3-5', '6-8', '9-12')),
  cover_image text,
  audio_url text,
  life_lesson text,
  reading_time integer NOT NULL DEFAULT 5,
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Users can manage their own stories
CREATE POLICY "Users can manage own stories"
  ON stories
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Anyone can read stories (for sharing)
CREATE POLICY "Stories are publicly readable"
  ON stories
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS stories_user_id_idx ON stories(user_id);
CREATE INDEX IF NOT EXISTS stories_category_idx ON stories(category);
CREATE INDEX IF NOT EXISTS stories_age_group_idx ON stories(age_group);