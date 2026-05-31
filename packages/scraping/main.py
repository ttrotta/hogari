import importlib
import argparse
import sys

def main():
    parser = argparse.ArgumentParser(description="Hogari Scraping Pipeline")
    parser.add_argument("--source", required=True)
    parser.add_argument("--city", required=True)
    parser.add_argument("--limit", type=int, default=2)
    args = parser.parse_args()

    try:
        module = importlib.import_module(f"scrapers.{args.source}")
        class_name = f"{args.source.capitalize()}Scraper"
        scraper_class = getattr(module, class_name)
    except (ImportError, AttributeError) as e:
        print(f"Error loading scraper: {e}", file=sys.stderr)
        sys.exit(1)

    from loaders.db_loader import get_existing_urls
    existing_urls = get_existing_urls()

    scraper = scraper_class(city=args.city, max_pages=args.limit, existing_urls=existing_urls)
    raw_listings = scraper.run()
    
    if not raw_listings:
        return

    from normalizers.property_normalizer import normalize_properties
    normalized_properties = normalize_properties(raw_listings, args.source)

    from loaders.db_loader import load_to_database
    load_to_database(normalized_properties)

if __name__ == "__main__":
    main()
