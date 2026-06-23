import os
import glob
from PIL import Image, ImageFilter

frame_dir = r"c:\Apps\Siddhix\public\frames"
frames = glob.glob(os.path.join(frame_dir, "ezgif-frame-*.jpg"))

print(f"Found {len(frames)} frames. Upscaling to 4K with sharpening...")

for frame in frames:
    try:
        with Image.open(frame) as img:
            new_width = 3840
            new_height = int(img.height * (new_width / img.width))
            new_size = (new_width, new_height)
            
            if hasattr(Image, 'Resampling'):
                resample_filter = Image.Resampling.LANCZOS
            else:
                resample_filter = Image.LANCZOS
                
            upscaled = img.resize(new_size, resample_filter)
            
            # Apply slight sharpening
            upscaled = upscaled.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
            
            upscaled.save(frame, quality=98)
    except Exception as e:
        print(f"Error processing {frame}: {e}")

print("Done!")
