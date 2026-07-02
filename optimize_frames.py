import os
import glob
from PIL import Image

frame_dir = r"c:\Apps\Siddhix\public\frames"

# 1. Clean up the WebP files
webp_files = glob.glob(os.path.join(frame_dir, "ezgif-frame-*.webp"))
print(f"Cleaning up {len(webp_files)} WebP files...")
for webp_path in webp_files:
    try:
        os.remove(webp_path)
    except Exception as e:
        print(f"Error removing {webp_path}: {e}")

# 2. Optimize the PNG files
png_files = glob.glob(os.path.join(frame_dir, "frame_*.png"))
png_files.sort()
print(f"Optimizing {len(png_files)} PNG frames...")

for i, png_path in enumerate(png_files):
    try:
        with Image.open(png_path) as img:
            # Resize to max width 1920 for high quality but responsive size
            if img.width > 1920:
                aspect_ratio = img.height / img.width
                new_width = 1920
                new_height = int(1920 * aspect_ratio)
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Quantize to 8-bit palette (extremely high compression for web)
            optimized_img = img.convert('P', palette=Image.Palette.ADAPTIVE, colors=256)
            
            # Save PNG optimized
            optimized_img.save(png_path, "PNG", optimize=True)
            
        if (i + 1) % 20 == 0 or (i + 1) == len(png_files):
            print(f"Optimized {i + 1}/{len(png_files)} frames...")
    except Exception as e:
        print(f"Error optimizing {png_path}: {e}")

print("All frames optimized successfully!")
