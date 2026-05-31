import json
import re
from bs4 import BeautifulSoup
from scrapers.base import BaseScraper

RENTOLA_URL = "https://rentola.ar/alquiler"

class RentolaScraper(BaseScraper):
    def __init__(self, city, max_pages=2, existing_urls=None):
        super().__init__(city, max_pages)
        self.existing_urls = existing_urls or set()

    def run(self):
        listings = []
        city_slug = self.city.lower().replace(" ", "-")
        
        for page in range(1, self.max_pages + 1):
            print(f"Scraping page {page} of {self.max_pages}...")
            url = f"{RENTOLA_URL}/{city_slug}"
            if page > 1:
                url = f"{url}?page={page}"
                
            html = self.fetch_url(url)
            if not html:
                print(f"No HTML content received for page {page}.")
                break
                
            soup = BeautifulSoup(html, "html.parser")
            scripts = soup.find_all("script", type="application/ld+json")
            if not scripts:
                continue
                
            search_page_data = None
            for script in scripts:
                try:
                    data = json.loads(script.string or "")
                    if data.get("@type") == "SearchResultsPage":
                        search_page_data = data
                        break
                except Exception:
                    continue
                    
            if not search_page_data:
                continue
                
            main_entity = search_page_data.get("mainEntity", {})
            items = main_entity.get("itemListElement", [])
            print(f"Found {len(items)} properties on page {page}.")
            
            for element in items:
                item_data = element.get("item", {})
                if not item_data:
                    continue
                    
                source_url = item_data.get("url")
                if not source_url:
                    continue
                    
                name = item_data.get("name", "")
                image = item_data.get("image", "")
                
                offers = item_data.get("offers", {})
                price = offers.get("price")
                currency = offers.get("priceCurrency", "ARS")
                
                item_offered = offers.get("itemOffered", {})
                prop_type_raw = item_offered.get("@type", "Apartment")
                
                address_data = item_offered.get("address", {})
                address = address_data.get("streetAddress", "")
                locality = address_data.get("addressLocality", "")
                
                geo = item_offered.get("geo", {})
                lat = geo.get("latitude")
                lng = geo.get("longitude")
                
                floor_size = item_offered.get("floorSize", {})
                area = floor_size.get("value", 0)
                
                bedrooms_data = item_offered.get("numberOfBedrooms", {})
                rooms = bedrooms_data.get("value", 0)
                
                listing_item = {
                    "title": name,
                    "source_url": source_url,
                    "price": price,
                    "currency": currency,
                    "address": address,
                    "neighborhood": locality,
                    "latitude": lat,
                    "longitude": lng,
                    "area": area,
                    "rooms": rooms,
                    "property_type_raw": prop_type_raw,
                    "source": "rentola",
                    "image_urls": [image] if image else [],
                    "description": "",
                    "bathrooms": 1,
                    "amenities": [],
                    "has_details": False
                }
                
                if source_url in self.existing_urls:
                    print(f"Skipping details for existing property: {source_url}")
                    listings.append(listing_item)
                    continue
                    
                print(f"Fetching details for new property: {source_url}")
                detail_html = self.fetch_url(source_url)
                if detail_html:
                    detail_soup = BeautifulSoup(detail_html, "html.parser")
                    
                    description = ""
                    desc_header = detail_soup.find("h2", class_=re.compile(r"text-lg|font-bold", re.I))
                    if desc_header and desc_header.parent:
                        description = desc_header.parent.get_text(separator="\n").strip()
                    listing_item["description"] = description
                    
                    bathrooms = 1
                    desc_lower = description.lower()
                    bath_matches = re.findall(r"(\d+)\s*baño", desc_lower)
                    if bath_matches:
                        bathrooms = int(bath_matches[0])
                    elif "dos baños" in desc_lower or "2 baños" in desc_lower:
                        bathrooms = 2
                    listing_item["bathrooms"] = bathrooms
                    
                    amenities = []
                    detail_specs = {}
                    for spec in detail_soup.find_all("div", class_=re.compile(r"flex.*justify-between.*border-b", re.I)):
                        p_tags = spec.find_all("p")
                        if len(p_tags) >= 2:
                            k = p_tags[0].get_text(strip=True)
                            v = p_tags[1].get_text(strip=True)
                            detail_specs[k] = v
                            
                    if detail_specs.get("Con patio") == "Si" or "patio" in desc_lower:
                        amenities.append("patio")
                    if "garage" in desc_lower or "cochera" in desc_lower:
                        amenities.append("cochera")
                    if "calefacción" in desc_lower or "calefaccion" in desc_lower:
                        amenities.append("calefacción")
                    if "piscina" in desc_lower or "pileta" in desc_lower:
                        amenities.append("piscina")
                    if "balcón" in desc_lower or "balcon" in desc_lower:
                        amenities.append("balcón")
                    if "parrilla" in desc_lower:
                        amenities.append("parrilla")
                        
                    listing_item["amenities"] = amenities
                    
                    detail_images = []
                    for img in detail_soup.find_all("img"):
                        src = img.get("src") or img.get("data-src") or img.get("data-lazy")
                        if src and ("rentola.com" in src or "propiedades" in src):
                            if src not in detail_images:
                                detail_images.append(src)
                                
                    if detail_images:
                        listing_item["image_urls"] = detail_images
                        
                    listing_item["has_details"] = True
                    
                listings.append(listing_item)
                
        return listings
