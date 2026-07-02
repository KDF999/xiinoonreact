import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        page = await b.new_page()
        await page.goto("file:///home/z/my-project/report-out/cover.html")
        await page.wait_for_load_state("networkidle")
        await page.emulate_media(media="print")
        # A4 exact in points: 595.276 x 841.89
        await page.pdf(
            path="/home/z/my-project/report-out/cover.pdf",
            width="8.27in",
            height="11.69in",
            print_background=True,
            margin={"top":"0","right":"0","bottom":"0","left":"0"},
            prefer_css_page_size=False,
        )
        await b.close()
        print("Cover rendered at exact A4 points")

asyncio.run(main())
