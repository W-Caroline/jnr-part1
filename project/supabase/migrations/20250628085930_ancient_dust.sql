/*
  # Create voice profiles table for voice magic

  1. New Tables
    - `voice_profiles`
      - `id` (uuid, primary key) - Voice profile identifier
      - `user_id` (uuid, foreign key) - Owner of the voice profile
      - `name` (text) - Profile name (e.g., "Mom's Voice", "Dad's Voice")
      - `audio_sample` (text) - Audio sample URL
      - `elevenlabs_voice_id` (text, optional) - ElevenLabs voice ID
      - `is_processed` (boolean) - Processing status
      - `created_at` (timestamp) - Creation date

  2. Security
    - Enable RLS on `voice_profiles` table
    - Users can only manage their own voice profiles
*/

CREATE TABLE IF NOT EXISTS voice_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  audio_sample text NOT NULL,
  elevenlabs_voice_id text,
  is_processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE voice_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only manage their own voice profiles
CREATE POLICY "Users can manage own voice profiles"
  ON voice_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS voice_profiles_user_id_idx ON voice_profiles(user_id);