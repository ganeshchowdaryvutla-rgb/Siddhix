import imageio
import glob
from PIL import Image
import numpy as np

frames = sorted(glob.glob(r"c:\Apps\Siddhix\public\frames\ezgif-frame-*.jpg"))

video_path = r"c:\Apps\Siddhix\public\hero-video.mp4"

print(f"Loading {len(frames)} frames...")

first_img = Image.open(frames[0])
new_width = 3840
new_height = int(first_img.height * (new_width / first_img.width))
if new_width % 2 != 0: new_width -= 1
if new_height % 2 != 0: new_height -= 1

print(f"Creating 4K video ({new_width}x{new_height}) with all-intra keyframes...")

writer = imageio.get_writer(
    video_path,
    fps=30,
    macro_block_size=2,
    ffmpeg_params=["-g", "1", "-preset", "fast", "-crf", "18", "-pix_fmt", "yuv420p"]
)

for idx, frame_path in enumerate(frames):
    img = Image.open(frame_path)
    if hasattr(Image, 'Resampling'):
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    else:
        img = img.resize((new_width, new_height), Image.LANCZOS)
        
    writer.append_data(np.array(img))
    
    if idx % 10 == 0:
        print(f"Processed {idx}/{len(frames)} frames")

writer.close()
print("Video perfectly created!")
