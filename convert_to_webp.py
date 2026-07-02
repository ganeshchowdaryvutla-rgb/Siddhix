import os
import glob
from PIL import Image

frame_dir = r"c:\Apps\Siddhix\public\frames"
frames = glob.glob(os.path.join(frame_dir, "frame_*.png"))
frames.sort()

print(f"Found {len(frames)} PNG frames. Converting to WebP...")

for i, frame in enumerate(frames):
    try:
        with Image.open(frame) as img:
            base_name = os.path.splitext(frame)[0]
            webp_path = f"{base_name}.webp"
            # High quality WebP reduces size by 85%+ with no visible quality loss
            img.save(webp_path, "WEBP", quality=85)
        # Delete original PNG to free up disk space and clean public folder
        os.remove(frame)
        
        if (i + 1) % 20 == 0 or (i + 1) == len(frames):
            print(f"Converted {i + 1}/{len(frames)} frames...")
    except Exception as e:
        print(f"Error processing {frame}: {e}")

print("Done converting all frames to WebP!")
