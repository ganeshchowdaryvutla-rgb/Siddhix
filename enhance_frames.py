import os
import glob
from PIL import Image, ImageEnhance, ImageFilter

frame_dir = r"c:\Apps\Siddhix\public\frames"
frames = glob.glob(os.path.join(frame_dir, "ezgif-frame-*.jpg"))

print(f"Enhancing {len(frames)} 4K frames...")

for frame in frames:
    try:
        with Image.open(frame) as img:
            # Boost contrast slightly
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(1.1)
            
            # Boost sharpness aggressively
            enhancer = ImageEnhance.Sharpness(img)
            img = enhancer.enhance(2.5)
            
            img.save(frame, quality=95)
    except Exception as e:
        print(f"Error processing {frame}: {e}")

print("Done enhancing!")
