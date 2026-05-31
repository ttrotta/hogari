def map_property_type(raw_type):
    if not raw_type:
        return "apartment"
    
    t = str(raw_type).lower().strip()
    if "house" in t or "casa" in t:
        return "house"
    elif "ph" in t:
        return "ph"
    elif "studio" in t or "monoambiente" in t or "mono" in t:
        return "studio"
    else:
        return "apartment"

def normalize_properties(raw_listings, source_name):
    normalized = []
    
    for raw in raw_listings:
        prop_type = map_property_type(raw.get("property_type_raw", "Apartment"))
        
        currency = raw.get("currency", "ARS")
        if currency not in ["ARS", "USD"]:
            currency = "ARS"
            
        price = raw.get("price")
        try:
            price = float(price) if price is not None else 0.0
        except ValueError:
            price = 0.0
            
        area = raw.get("area")
        try:
            area = float(area) if area is not None else 0.0
        except ValueError:
            area = 0.0
            
        rooms = raw.get("rooms")
        try:
            rooms = int(rooms) if rooms is not None else 0
        except ValueError:
            rooms = 0
            
        bathrooms = raw.get("bathrooms")
        try:
            bathrooms = int(bathrooms) if bathrooms is not None else 1
        except ValueError:
            bathrooms = 1
            
        lat = raw.get("latitude")
        lng = raw.get("longitude")
        try:
            lat = float(lat) if lat is not None else -38.7183
            lng = float(lng) if lng is not None else -62.2663
        except ValueError:
            lat = -38.7183
            lng = -62.2663
            
        norm = {
            "title": raw.get("title", "").strip(),
            "description": raw.get("description", "").strip(),
            "property_type": prop_type,
            "price": price,
            "expenses": 0.0,
            "currency": currency,
            "address": raw.get("address", "").strip(),
            "neighborhood": raw.get("neighborhood", "").strip(),
            "latitude": lat,
            "longitude": lng,
            "rooms": rooms,
            "bathrooms": bathrooms,
            "area": area,
            "amenities": raw.get("amenities", []),
            "image_urls": raw.get("image_urls", []),
            "source": source_name,
            "source_url": raw.get("source_url", "").strip(),
            "raw_metadata": {
                "property_type_raw": raw.get("property_type_raw"),
                "has_details": raw.get("has_details", False)
            }
        }
        
        normalized.append(norm)
        
    return normalized
