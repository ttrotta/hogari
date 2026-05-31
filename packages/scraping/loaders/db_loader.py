import os
import json
import psycopg2
from dotenv import load_dotenv

def get_db_connection():
    env_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", ".env.local")
    if os.path.exists(env_path):
        load_dotenv(dotenv_path=env_path)
    else:
        load_dotenv()
        
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        raise ValueError("DATABASE_URL environment variable is missing")
        
    db_url = db_url.replace("sslmode=verify-full", "sslmode=require")
    return psycopg2.connect(db_url)

def get_existing_urls():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT source_url FROM properties WHERE description IS NOT NULL AND description != ''")
        urls = set(row[0] for row in cur.fetchall())
        cur.close()
        conn.close()
        return urls
    except Exception as e:
        print(f"Error fetching existing URLs: {e}")
        return set()

def load_to_database(properties):
    if not properties:
        return
        
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        insert_full_query = """
            INSERT INTO properties (
                title, description, property_type, price, expenses, currency, address, neighborhood,
                geom, rooms, bathrooms, area, amenities, image_urls, source, source_url, raw_metadata
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s,
                ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geography,
                %s, %s, %s, %s, %s, %s, %s, %s
            ) ON CONFLICT (source_url) DO UPDATE SET
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                property_type = EXCLUDED.property_type,
                price = EXCLUDED.price,
                expenses = EXCLUDED.expenses,
                currency = EXCLUDED.currency,
                address = EXCLUDED.address,
                neighborhood = EXCLUDED.neighborhood,
                geom = EXCLUDED.geom,
                rooms = EXCLUDED.rooms,
                bathrooms = EXCLUDED.bathrooms,
                area = EXCLUDED.area,
                amenities = EXCLUDED.amenities,
                image_urls = EXCLUDED.image_urls,
                raw_metadata = EXCLUDED.raw_metadata,
                updated_at = NOW();
        """
        
        insert_partial_query = """
            INSERT INTO properties (
                title, description, property_type, price, expenses, currency, address, neighborhood,
                geom, rooms, bathrooms, area, amenities, image_urls, source, source_url, raw_metadata
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s,
                ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geography,
                %s, %s, %s, %s, %s, %s, %s, %s
            ) ON CONFLICT (source_url) DO UPDATE SET
                price = EXCLUDED.price,
                updated_at = NOW();
        """
        
        for prop in properties:
            has_details = prop["raw_metadata"].get("has_details", False)
            query = insert_full_query if has_details else insert_partial_query
            
            params = (
                prop["title"],
                prop["description"],
                prop["property_type"],
                prop["price"],
                prop["expenses"],
                prop["currency"],
                prop["address"],
                prop["neighborhood"],
                prop["longitude"],
                prop["latitude"],
                prop["rooms"],
                prop["bathrooms"],
                prop["area"],
                prop["amenities"],
                prop["image_urls"],
                prop["source"],
                prop["source_url"],
                json.dumps(prop["raw_metadata"])
            )
            
            cur.execute(query, params)
            
        conn.commit()
        cur.close()
        conn.close()
        print(f"Successfully loaded {len(properties)} properties to the database.")
    except Exception as e:
        print(f"Error loading to database: {e}")
