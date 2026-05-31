# Hogari - Scraping Package

Property extraction and normalization module using a generic Python framework with BeautifulSoup and psycopg2.

## Scraper Architecture

The module is designed to be modular and extensible. If you want to add a new real estate source or website, simply add a new `.py` file to the `scrapers/` folder.

### File Structure
* **`main.py`**: Main CLI execution entry point. Dynamically loads the selected scraper, normalizes the data, and sends it to the database.
* **`scrapers/base.py`**: Base class implementing request rate control, random delays to avoid blocks, and robots.txt compliance.
* **`scrapers/rentola.py`**: Site-specific scraper for Rentola.ar.
* **`normalizers/property_normalizer.py`**: Normalizes extracted data (e.g. property types, price conversions) to match the database schema.
* **`loaders/db_loader.py`**: Manages connection and insertion/update (`UPSERT`) statements in the Neon PostgreSQL database.

## Python Dependencies

To run this module, you need the following libraries installed in your Python environment:

* `beautifulsoup4` (HTML parsing)
* `requests` (HTTP requests)
* `psycopg2-binary` (PostgreSQL connector)
* `python-dotenv` (Environment variables loader)

### Installing Dependencies
Run the following command to install them:
```bash
python3 -m pip install beautifulsoup4 requests psycopg2-binary python-dotenv
```

## Running the Scraper

To start scraping from the root of the monorepo, run the generic script specifying the source and the city:

```bash
pnpm --filter @hogari/scraping scrape --source rentola --city bahia-blanca --limit 2
```

### Arguments:
* `--source`: Name of the scraper to use (must match a file in `scrapers/`, e.g., `rentola`).
* `--city`: City to scrape (formatted automatically for the URL).
* `--limit`: Maximum page limit to scrape (defaults to 2).
