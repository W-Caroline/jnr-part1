/*
  # Create user progress table for tracking learning journey

  1. New Tables
    - `user_progress`
      - `id` (uuid, primary key) - Progress record identifier
      - `user_id` (uuid, foreign key) - User identifier
      - `content_type` (text) - Type of content (story, activity)
      - `content_id` (uuid) - ID of the story or activity
      - `progress_data` (jsonb) - Progress-specific data
      - `completed_at` (timestamp, optional) - Completion date
      - `created_at` (timestamp) - Start date

  2. Security
    - Enable RLS on `user_progress` table
    - Users can only manage their own progress
*/

CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content_type text NOT NULL CHECK (content_type IN ('story', 'activity')),
  content_id uuid NOT NULL,
  progress_data jsonb DEFAULT '{}',
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Users can only manage their own progress
CREATE POLICY "Users can manage own progress"
  ON user_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS user_progress_user_id_idx ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS user_progress_content_idx ON user_progress(content_type, content_id);

-- Create unique constraint to prevent duplicate progress records
CREATE UNIQUE INDEX IF NOT EXISTS user_progress_unique_idx 
ON user_progress(user_id, content_type, content_id);