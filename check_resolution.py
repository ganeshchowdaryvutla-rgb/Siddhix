from PIL import Image
import os

img_path = r"c:\Apps\Siddhix\public\frames\frame_0001.png"
with Image.open(img_path) as img:
    print(f"Frame image size: {img.width}x{img.height} (ratio: {img.width/img.height:.4f})")
