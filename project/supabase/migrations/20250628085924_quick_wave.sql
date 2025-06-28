/*
  # Create activities table for learning adventures

  1. New Tables
    - `activities`
      - `id` (uuid, primary key) - Activity identifier
      - `user_id` (uuid, foreign key) - Creator of the activity
      - `title` (text) - Activity title
      - `type` (text) - Activity type (coloring, puzzle, drawing, etc.)
      - `difficulty` (text) - Difficulty level (easy, medium, hard)
      - `age_group` (text) - Target age group
      - `content` (jsonb) - Activity-specific content
      - `instructions` (text) - Activity instructions
      - `image_url` (text, optional) - Activity image URL
      - `completion_count` (integer) - Times completed
      - `created_at` (timestamp) - Creation date

  2. Security
    - Enable RLS on `activities` table
    - Users can manage their own activities
    - Activities can be shared publicly
*/

CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('coloring', 'puzzle', 'drawing', 'math', 'letters', 'words', 'dictation', 'paint-by-numbers')),
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  age_group text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  instructions text NOT NULL,
  image_url text,
  completion_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Users can manage their own activities
CREATE POLICY "Users can manage own activities"
  ON activities
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Anyone can read activities (for sharing)
CREATE POLICY "Activities are publicly readable"
  ON activities
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS activities_user_id_idx ON activities(user_id);
CREATE INDEX IF NOT EXISTS activities_type_idx ON activities(type);
CREATE INDEX IF NOT EXISTS activities_difficulty_idx ON activities(difficulty);
CREATE INDEX IF NOT EXISTS activities_age_group_idx ON activities(age_group);