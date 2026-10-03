import os
import glob
import re

css_files = glob.glob('dist/assets/*.css')
js_files = glob.glob('dist/assets/*.js')

if not css_files or not js_files:
    raise Exception("dist/assets css or js not found! Run npm run build first.")

css_path = css_files[0]
js_path = js_files[0]

print(f"Reading CSS from {css_path}")
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Strip any external comments
css_content = re.sub(r'/\*[\s\S]*?\*/', '', css_content)

print(f"Reading JS from {js_path}")
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Verify that base64 encoded sneaker images are directly present in the JavaScript
base64_matches = len(re.findall(r'data:image/jpeg;base64,', js_content))
print(f"Verified Base64 sneaker image strings in JS bundle: {base64_matches} occurrences")

# Offline typography fallbacks
offline_font_override = """
/* Offline typography fallbacks */
:root {
  --font-headline: 'Barlow Condensed', 'Arial Black', Impact, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
body {
  font-family: var(--font-sans);
}
h1, h2, h3, .font-headline {
  font-family: var(--font-headline);
  letter-spacing: -0.01em;
}
"""

html_template = f"""<!doctype html>
<html lang="en" class="dark scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nike Sneaker Storefront | Find Your Next Move</title>
    <meta name="description" content="Explore the latest Nike sneakers built for everyday movement. Premium dark-mode footwear collection, dynamic filtering, and signature performance." />
    <meta property="og:title" content="Nike Sneaker Storefront | Find Your Next Move" />
    <meta property="og:description" content="Explore the latest Nike sneakers built for everyday movement. Premium dark-mode footwear collection, dynamic filtering, and signature performance." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <style>
{css_content}
{offline_font_override}
    </style>
  </head>
  <body class="bg-[#0b0b0d] text-neutral-100 antialiased selection:bg-[#ff461e] selection:text-white overflow-x-hidden">
    <div id="root"></div>
    <script>
(() => {{
{js_content}
}})();
    </script>
  </body>
</html>
"""

output_path = 'Nike-Sneaker-Storefront.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html_template)

file_size_mb = os.path.getsize(output_path) / (1024 * 1024)
print(f"\n==================================================")
print(f"SUCCESS: Generated {output_path}")
print(f"File Size: {file_size_mb:.2f} MB ({os.path.getsize(output_path):,} bytes)")
print(f"Location: {os.path.abspath(output_path)}")
print(f"Base64 Images in HTML: {len(re.findall(r'data:image/jpeg;base64,', html_template))}")
print(f"==================================================")
