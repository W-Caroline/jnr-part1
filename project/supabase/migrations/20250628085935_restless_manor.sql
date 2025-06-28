/*
  # Create donations table for community impact

  1. New Tables
    - `donations`
      - `id` (uuid, primary key) - Donation identifier
      - `donor_name` (text) - Donor's name
      - `donor_email` (text) - Donor's email
      - `item_type` (text) - Type of donation (book, educational-material, monetary)
      - `description` (text) - Donation description
      - `quantity` (integer, optional) - Quantity for physical items
      - `amount` (decimal, optional) - Monetary amount
      - `status` (text) - Donation status (pending, approved, distributed)
      - `recipient_info` (text, optional) - Information about recipient
      - `created_at` (timestamp) - Donation date
      - `distributed_at` (timestamp, optional) - Distribution date

  2. Security
    - Enable RLS on `donations` table
    - Donors can view their own donations
    - Admins can manage all donations
*/

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  donor_email text NOT NULL,
  item_type text NOT NULL CHECK (item_type IN ('book', 'educational-material', 'monetary')),
  description text NOT NULL,
  quantity integer,
  amount decimal(10,2),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'distributed')),
  recipient_info text,
  created_at timestamptz DEFAULT now(),
  distributed_at timestamptz
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Donors can view their own donations
CREATE POLICY "Donors can view own donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (donor_email = auth.email());

-- Anyone can create donations
CREATE POLICY "Anyone can create donations"
  ON donations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admins can manage all donations
CREATE POLICY "Admins can manage all donations"
  ON donations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS donations_donor_email_idx ON donations(donor_email);
CREATE INDEX IF NOT EXISTS donations_status_idx ON donations(status);
CREATE INDEX IF NOT EXISTS donations_item_type_idx ON donations(item_type);