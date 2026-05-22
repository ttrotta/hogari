// Scraping Orchestrator
// Usage: pnpm --filter @hogari/scraping scrape

// import { scrapeZonaprop } from "./scrapers/zonaprop";
// import { scrapeArgenprop } from "./scrapers/argenprop";
// import { scrapeMercadolibre } from "./scrapers/mercadolibre";
// import { normalizeProperty } from "./normalizers/property-normalizer";
// import { loadToDatabase } from "./loaders/db-loader";

async function main() {
  console.log("🏠 Starting scraping pipeline...");

  // Step 1: Scrape from all sources
  // const raw = [
  //   ...await scrapeZonaprop(),
  //   ...await scrapeArgenprop(),
  //   ...await scrapeMercadolibre(),
  // ];

  // Step 2: Normalize to common schema
  // const normalized = raw.map(normalizeProperty);

  // Step 3: Load into PostgreSQL
  // await loadToDatabase(normalized);

  console.log("✅ Scraping pipeline complete.");
}

main().catch(console.error);
