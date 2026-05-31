import time
import random
import urllib.request
import urllib.robotparser
from urllib.parse import urlparse

class BaseScraper:
    def __init__(self, city, max_pages=2):
        self.city = city
        self.max_pages = max_pages
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        self.robots_parsers = {}

    def is_allowed(self, url):
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
        
        if base_url not in self.robots_parsers:
            rp = urllib.robotparser.RobotFileParser()
            try:
                req = urllib.request.Request(f"{base_url}/robots.txt", headers=self.headers)
                with urllib.request.urlopen(req) as response:
                    content = response.read().decode("utf-8")
                rp.parse(content.splitlines())
                self.robots_parsers[base_url] = rp
            except Exception:
                return True
                
        return self.robots_parsers[base_url].can_fetch(self.headers["User-Agent"], url)

    def fetch_url(self, url):
        if not self.is_allowed(url):
            print(f"Skipping {url} due to robots.txt restrictions")
            return None

        time.sleep(random.uniform(2.0, 5.0))
        
        req = urllib.request.Request(url, headers=self.headers)
        try:
            with urllib.request.urlopen(req) as response:
                return response.read().decode("utf-8")
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None

    def run(self):
        raise NotImplementedError
