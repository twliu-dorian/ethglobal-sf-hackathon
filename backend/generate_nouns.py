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

if __name__ == "__main__":
    save_random_noun("test.png", 2674723)