import os
import base64
import glob

image_dir = 'src/assets/images'
image_files = sorted(glob.glob(os.path.join(image_dir, '*')))

print(f"Reading {len(image_files)} image files from {image_dir}...")

output_lines = [
    "// AUTO-GENERATED BASE64 SNEAKER ASSETS",
    "// Every sneaker image from src/assets/images embedded directly as Base64 data URL",
    "export const SNEAKER_IMAGES = {"
]

file_to_key = {
    'nike_alpha_trainer_blue_1790831910612.jpg': 'alphaTrainerBlue',
    'nike_court_vision_retro_1790831896521.jpg': 'courtVisionRetro',
    'nike_pegasus_sunset_1790831923529.jpg': 'pegasusSunset',
    'nike_sb_alleyoop_black_1790831934542.jpg': 'sbAlleyoopBlack',
    'nike_air_max_fire_red_1790831947038.jpg': 'airMaxFireRed',
    'nike_quest_volt_1790830468384.jpg': 'questVolt',
    'nike_quest_crimson_1790830481248.jpg': 'questCrimson',
    'nike_quest_sand_1790830495405.jpg': 'questSand',
    'nike_quest_orange_1790830514164.jpg': 'questOrange',
    'nike_hoops_elite_1790830524404.jpg': 'hoopsElite',
}

for img_path in image_files:
    fname = os.path.basename(img_path)
    key = file_to_key.get(fname)
    if not key:
        clean_name = fname.split('_')[1] if '_' in fname else 'image'
        key = clean_name
    ext = os.path.splitext(fname)[1].lower().replace('.', '')
    if ext == 'jpg':
        ext = 'jpeg'
    with open(img_path, 'rb') as f:
        data = f.read()
    b64 = base64.b64encode(data).decode('utf-8')
    data_url = f"data:image/{ext};base64,{b64}"
    output_lines.append(f"  {key}: '{data_url}',")
    print(f"  - {key}: {len(data_url)} chars from {fname}")

output_lines.append("} as const;")
output_lines.append("")
output_lines.append("export type SneakerImageKey = keyof typeof SNEAKER_IMAGES;")

target_file = 'src/data/imageAssets.ts'
with open(target_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(output_lines))

print(f"\nWrote {target_file} ({os.path.getsize(target_file):,} bytes)")
