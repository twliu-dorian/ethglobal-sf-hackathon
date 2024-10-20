import os
import random
import io
from PIL import Image

nouns_folder_paths = [
    "./nouns/background",
    "./nouns/bodies",
    "./nouns/accessories",
    "./nouns/heads",
    "./nouns/glasses",
]

def deterministic_choice(items, seed_number):
    random.seed(seed_number)
    return random.choice(items)

def get_random_noun(seed):
    width, height = 320, 320
    base = Image.new("RGBA", (width, height), (0, 0, 0, 0))

    for part in nouns_folder_paths:
        file_list = [f for f in os.listdir(part) if f.endswith('.png')]
        file_name = deterministic_choice(file_list, seed)

        file_path = os.path.join(part, file_name)
        img = Image.open(file_path).convert("RGBA")

        combined = Image.alpha_composite(base, img)
        base = combined
    
    return base

def get_random_noun_bytes(seed):
    img = get_random_noun(seed)

    image_bytes = io.BytesIO()
    img.save(image_bytes, format='PNG')
    image_bytes = image_bytes.getvalue()

    return image_bytes

def save_random_noun(fn, seed):
    img = get_random_noun(seed)
    img.save(fn)

def get_random_noun_svg(seed):
    base = get_random_noun(seed)

    colors = base.getcolors(320 * 320)
    color_map = {}
    for count, color in colors:
        if color not in color_map:
            color_map[color] = []
        color_map[color].append(count)

    svg_content = f'<svg width="{320}" height="{320}" xmlns="http://www.w3.org/2000/svg">\n'

    for color, counts in color_map.items():
        svg_content += f'  <g fill="rgb{color}">\n'
        for y in range(320):
            for x in range(320):
                if base.getpixel((x, y)) == color:
                    svg_content += f'    <rect x="{x}" y="{y}" width="1" height="1" />\n'
        svg_content += '  </g>\n'
    svg_content += '</svg>'
    return svg_content

if __name__ == "__main__":
    random.seed(42)
    for i in range(6):
        seed = random.random()*1000
        svg_content = get_random_noun_svg(seed)
        with open(f"NGO{i}.svg", 'w') as f:
            f.write(svg_content)
        
        save_random_noun(f"NGO{i}.png", seed)