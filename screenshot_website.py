#!/usr/bin/env python3
"""
Capture a full-page screenshot of a website.

Usage:
  python screenshot_website.py --url https://example.com --output linkedin-post.png
"""

from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path


def normalize_url(url: str) -> str:
    if not url.startswith(("http://", "https://")):
        return f"https://{url}"
    return url


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Take a full-page website screenshot (great for social posts)."
    )
    parser.add_argument(
        "--url",
        required=True,
        help="Website URL to capture, e.g. https://your-site.com",
    )
    parser.add_argument(
        "--output",
        default="website-full.png",
        help="Output file path (default: website-full.png)",
    )
    parser.add_argument(
        "--width",
        type=int,
        default=1440,
        help="Viewport width in pixels (default: 1440)",
    )
    parser.add_argument(
        "--height",
        type=int,
        default=2400,
        help="Viewport height in pixels (default: 2400)",
    )
    parser.add_argument(
        "--wait",
        type=float,
        default=1.5,
        help="Extra wait time in seconds after page load (default: 1.5)",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=60000,
        help="Navigation timeout in ms (default: 60000)",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    url = normalize_url(args.url)
    output_path = Path(args.output).expanduser().resolve()

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print(
            "Playwright is not installed.\n"
            "Install it with:\n"
            "  pip install playwright\n"
            "  python -m playwright install chromium",
            file=sys.stderr,
        )
        return 1

    output_path.parent.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": args.width, "height": args.height})

        page.goto(url, wait_until="networkidle", timeout=args.timeout)
        if args.wait > 0:
            time.sleep(args.wait)

        page.screenshot(path=str(output_path), full_page=True)
        browser.close()

    print(f"Screenshot saved to: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
