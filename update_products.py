with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    "'/images/nike_alpha_trainer_blue_1790831910612.jpg'": "SNEAKER_IMAGES.alphaTrainerBlue",
    "'/images/nike_court_vision_retro_1790831896521.jpg'": "SNEAKER_IMAGES.courtVisionRetro",
    "'/images/nike_pegasus_sunset_1790831923529.jpg'": "SNEAKER_IMAGES.pegasusSunset",
    "'/images/nike_sb_alleyoop_black_1790831934542.jpg'": "SNEAKER_IMAGES.sbAlleyoopBlack",
    "'/images/nike_air_max_fire_red_1790831947038.jpg'": "SNEAKER_IMAGES.airMaxFireRed",
    "'/images/nike_quest_volt_1790830468384.jpg'": "SNEAKER_IMAGES.questVolt",
    "'/images/nike_quest_crimson_1790830481248.jpg'": "SNEAKER_IMAGES.questCrimson",
    "'/images/nike_quest_sand_1790830495405.jpg'": "SNEAKER_IMAGES.questSand",
    "'/images/nike_quest_orange_1790830514164.jpg'": "SNEAKER_IMAGES.questOrange",
    "'/images/nike_hoops_elite_1790830524404.jpg'": "SNEAKER_IMAGES.hoopsElite",
}

for old, new in replacements.items():
    count = content.count(old)
    content = content.replace(old, new)
    print(f"Replaced {old} -> {new}: {count} times")

if "import { SNEAKER_IMAGES } from './imageAssets';" not in content:
    content = "import { SNEAKER_IMAGES } from './imageAssets';\n" + content

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated src/data/products.ts successfully!")
