/*
  # Create Companies Directory Schema

  1. New Tables
    - `companies`
      - `id` (uuid, primary key) - Unique identifier for each company
      - `name` (text) - Company name
      - `industry` (text) - Industry sector (e.g., Technology, Healthcare, Finance)
      - `location` (text) - Company location/headquarters
      - `employee_count` (integer) - Number of employees
      - `founded_year` (integer) - Year the company was founded
      - `description` (text) - Brief description of the company
      - `website` (text) - Company website URL
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `companies` table
    - Add policy for public read access (directory is public)
    - Add policy for authenticated users to insert/update companies

  3. Sample Data
    - Insert sample companies for demonstration
*/

CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text NOT NULL,
  location text NOT NULL,
  employee_count integer DEFAULT 0,
  founded_year integer,
  description text DEFAULT '',
  website text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view companies"
  ON companies FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert companies"
  ON companies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update companies"
  ON companies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete companies"
  ON companies FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(name);
CREATE INDEX IF NOT EXISTS idx_companies_industry ON companies(industry);
CREATE INDEX IF NOT EXISTS idx_companies_location ON companies(location);

INSERT INTO companies (name, industry, location, employee_count, founded_year, description, website) VALUES
  ('TechVision Inc', 'Technology', 'San Francisco, CA', 250, 2015, 'Leading provider of AI-powered business solutions and cloud infrastructure services.', 'https://techvision.example.com'),
  ('HealthCare Plus', 'Healthcare', 'Boston, MA', 500, 2010, 'Innovative healthcare technology company focused on patient care management systems.', 'https://healthcareplus.example.com'),
  ('GreenEnergy Co', 'Energy', 'Austin, TX', 180, 2018, 'Sustainable energy solutions provider specializing in solar and wind power systems.', 'https://greenenergy.example.com'),
  ('FinanceHub', 'Finance', 'New York, NY', 350, 2012, 'Digital banking platform offering comprehensive financial services and investment tools.', 'https://financehub.example.com'),
  ('EduTech Solutions', 'Education', 'Seattle, WA', 120, 2016, 'E-learning platform providing interactive courses and professional development programs.', 'https://edutech.example.com'),
  ('RetailMax', 'Retail', 'Chicago, IL', 800, 2008, 'Omnichannel retail solutions connecting online and offline shopping experiences.', 'https://retailmax.example.com'),
  ('CloudStream', 'Technology', 'San Jose, CA', 300, 2017, 'Enterprise cloud storage and collaboration platform for modern businesses.', 'https://cloudstream.example.com'),
  ('BioPharm Labs', 'Healthcare', 'Philadelphia, PA', 450, 2011, 'Biotechnology research company developing breakthrough pharmaceutical treatments.', 'https://biopharm.example.com'),
  ('AutoDrive Systems', 'Automotive', 'Detroit, MI', 600, 2014, 'Autonomous vehicle technology and advanced driver assistance systems manufacturer.', 'https://autodrive.example.com'),
  ('FoodTech Global', 'Food & Beverage', 'Portland, OR', 220, 2019, 'Plant-based food technology company creating sustainable protein alternatives.', 'https://foodtech.example.com'),
  ('CyberShield', 'Technology', 'Washington, DC', 175, 2015, 'Cybersecurity firm providing enterprise security solutions and threat intelligence.', 'https://cybershield.example.com'),
  ('PropTech Ventures', 'Real Estate', 'Miami, FL', 140, 2020, 'Real estate technology platform revolutionizing property management and transactions.', 'https://proptech.example.com'),
  ('MediaStream Pro', 'Entertainment', 'Los Angeles, CA', 400, 2013, 'Digital media streaming service offering premium content and original productions.', 'https://mediastream.example.com'),
  ('LogiChain', 'Logistics', 'Dallas, TX', 550, 2009, 'Supply chain management and logistics optimization platform for global operations.', 'https://logichain.example.com'),
  ('AeroSpace Dynamics', 'Aerospace', 'Houston, TX', 750, 2007, 'Aerospace engineering company specializing in satellite technology and space systems.', 'https://aerospace.example.com'),
  ('DesignStudio Pro', 'Design', 'San Francisco, CA', 95, 2021, 'Creative design agency offering branding, UX/UI, and digital marketing services.', 'https://designstudio.example.com'),
  ('AgriTech Innovations', 'Agriculture', 'Des Moines, IA', 160, 2016, 'Agricultural technology company developing precision farming and crop monitoring solutions.', 'https://agritech.example.com'),
  ('SportsTech Labs', 'Sports', 'Denver, CO', 110, 2018, 'Sports analytics and performance tracking technology for athletes and teams.', 'https://sportstech.example.com'),
  ('TravelEase', 'Travel', 'Orlando, FL', 280, 2014, 'Travel booking platform with AI-powered personalized vacation planning services.', 'https://travelease.example.com'),
  ('SmartHome Systems', 'Technology', 'Atlanta, GA', 190, 2017, 'IoT smart home automation and security systems for residential and commercial use.', 'https://smarthome.example.com');
