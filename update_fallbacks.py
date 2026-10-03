import re

files = [
    'src/components/OrdersModal.tsx',
    'src/components/SearchModal.tsx',
    'src/components/FeaturedSpotlight.tsx',
    'src/components/ProductCard.tsx',
    'src/components/ProductQuickViewModal.tsx',
    'src/components/WishlistDrawer.tsx',
    'src/components/CartDrawer.tsx',
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "import { SNEAKER_IMAGES } from '../data/imageAssets';" not in content:
        # Insert import after the first import line
        lines = content.split('\n')
        lines.insert(1, "import { SNEAKER_IMAGES } from '../data/imageAssets';")
        content = '\n'.join(lines)
    
    content = content.replace("'/images/nike_quest_crimson_1790830481248.jpg'", "SNEAKER_IMAGES.questCrimson")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")

