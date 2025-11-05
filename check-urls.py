#!/usr/bin/env python3

import re
import requests
import sys
from multiprocessing import Pool

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1"
}

def extract_urls(file_path):
    url_pattern = re.compile(r'https?://[^\s<>\"]+')
    trailing_punct = '.,;:!?"\''
    paren_pairs = {')': '(', ']': '[', '}': '{'}

    def clean_url(raw_url):
        url = raw_url
        while url:
            last_char = url[-1]
            if last_char in paren_pairs:
                opener = paren_pairs[last_char]
                if url.count(last_char) > url.count(opener):
                    url = url[:-1]
                    continue
            if last_char in trailing_punct:
                url = url[:-1]
                continue
            break
        return url

    with open(file_path, 'r') as file:
        content = file.read()
    urls = set()
    for match in url_pattern.finditer(content):
        url = clean_url(match.group(0))

        if url:
            urls.add(url)

    return list(urls)

def check_url(url):
    if 'scholar' in url or 'linkedin' in url:
        # ignore Google Scholar and LinkedIn
        return None
    try:
        response = requests.head(url, headers=headers, timeout=5, allow_redirects=True)
        if response.status_code in [200, 301, 302, 403, 429]:
            return None
        if response.status_code == 405:
            raise requests.RequestException("HEAD not allowed")
        return f'{response.status_code}: {url}'
    except requests.RequestException as e:
        try:
            response = requests.get(url, headers=headers, timeout=10, allow_redirects=True)
            if response.status_code in [200, 301, 302, 403, 429]:
                return None
            return f'{response.status_code}: {url}'
        except requests.RequestException as get_error:
            return f'Invalid (Error: {get_error}) {url}'

def main():
    if len(sys.argv) != 2:
        print("Usage: python script.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    urls = extract_urls(file_path)

    if not urls:
        print("No URLs found in the file.")
        sys.exit(0)

    print(f"Found {len(urls)} URL(s). Checking status...\n")

    with Pool(processes=32) as pool:
        results = pool.map(check_url, urls)

    failures = [result for result in results if result]

    if failures:
        for failure in failures:
            print(failure)
        sys.exit(1)

    print("All URLs are valid.")

if __name__ == "__main__":
    main()
