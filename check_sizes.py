import os

def get_dir_size(path):
    total = 0
    for root, dirs, files in os.walk(path):
        # Skip node_modules, .git, .next, .vercel
        if any(ignored in root for ignored in ['node_modules', '.git', '.next', '.vercel']):
            continue
        for f in files:
            fp = os.path.join(root, f)
            total += os.path.getsize(fp)
    return total

print("Scanning directory sizes...")
for item in os.listdir('.'):
    if os.path.isdir(item):
        if item in ['node_modules', '.git', '.next', '.vercel']:
            continue
        size = get_dir_size(item)
        print(f"Directory '{item}': {size / (1024*1024):.2f} MB")
    else:
        size = os.path.getsize(item)
        print(f"File '{item}': {size / (1024*1024):.2f} MB")
