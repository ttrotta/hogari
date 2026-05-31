CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'house', 'ph', 'studio')),
  price NUMERIC NOT NULL,
  expenses NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL CHECK (currency IN ('ARS', 'USD')),
  address TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  geom GEOGRAPHY(Point, 4326) NOT NULL,
  rooms INTEGER NOT NULL DEFAULT 0,
  bathrooms INTEGER NOT NULL DEFAULT 0,
  area NUMERIC NOT NULL DEFAULT 0,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  image_urls TEXT[] NOT NULL DEFAULT '{}',
  source TEXT NOT NULL,
  source_url TEXT NOT NULL UNIQUE,
  raw_metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS properties_geom_idx ON properties USING GIST (geom);
CREATE INDEX IF NOT EXISTS properties_raw_metadata_idx ON properties USING gin (raw_metadata);
