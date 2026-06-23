import os
import glob
from PIL import Image

frame_dir = r"c:\Apps\Siddhix\public\frames"
frames = glob.glob(os.path.join(frame_dir, "ezgif-frame-*.jpg"))

print(f"Converting {len(frames)} 4K frames to WebP to reduce size...")

for frame in frames:
    try:
        with Image.open(frame) as img:
            base_name = os.path.splitext(frame)[0]
            webp_path = f"{base_name}.webp"
            # High quality WebP reduces size by 60-80% with no visible quality loss
            img.save(webp_path, "WEBP", quality=90)
        os.remove(frame)
    except Exception as e:
        print(f"Error processing {frame}: {e}")

print("Done converting to WebP!")
