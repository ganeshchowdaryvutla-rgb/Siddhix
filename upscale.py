import os
import glob
from PIL import Image

frame_dir = r"c:\Apps\Siddhix\public\frames"
frames = glob.glob(os.path.join(frame_dir, "ezgif-frame-*.jpg"))

print(f"Found {len(frames)} frames. Upscaling by 1.5x...")

for frame in frames:
    try:
        with Image.open(frame) as img:
            new_size = (int(img.width * 1.5), int(img.height * 1.5))
            if hasattr(Image, 'Resampling'):
                resample_filter = Image.Resampling.LANCZOS
            else:
                resample_filter = Image.LANCZOS
                
            upscaled = img.resize(new_size, resample_filter)
            upscaled.save(frame, quality=95)
    except Exception as e:
        print(f"Error processing {frame}: {e}")

print("Done!")
