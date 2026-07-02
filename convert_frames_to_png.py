import os
import glob
from PIL import Image

frame_dir = r"c:\Apps\Siddhix\public\frames"
webp_frames = glob.glob(os.path.join(frame_dir, "ezgif-frame-*.webp"))
webp_frames.sort()

print(f"Found {len(webp_frames)} WebP frames to convert to PNG...")

for i, webp_path in enumerate(webp_frames):
    try:
        with Image.open(webp_path) as img:
            # Zero-padded to 4 digits, 1-indexed (frame_0001.png to frame_0222.png)
            frame_num = i + 1
            png_name = f"frame_{frame_num:04d}.png"
            png_path = os.path.join(frame_dir, png_name)
            
            # Save as PNG
            img.save(png_path, "PNG")
            
        if (i + 1) % 20 == 0 or (i + 1) == len(webp_frames):
            print(f"Processed {i + 1}/{len(webp_frames)} frames...")
    except Exception as e:
        print(f"Error processing {webp_path}: {e}")

print("Done converting WebP frames to PNG!")
