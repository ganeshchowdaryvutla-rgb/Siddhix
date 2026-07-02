import os

public_dir = "./public"
print("Scanning files in public/...")
for root, dirs, files in os.walk(public_dir):
    dir_size = sum(os.path.getsize(os.path.join(root, f)) for f in files)
    print(f"Folder '{root}': {dir_size / (1024*1024):.2f} MB ({len(files)} files)")
