import re
import os
import glob
import shutil

html_files = glob.glob('*.html')
project_root = os.getcwd()

# Ensure we have a list of absolute paths from the HTML
for file in html_files:
    print(f"Processing {file}...")
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all file:/// references
    matches = re.findall(r'file:///([^\s"\'>]+)', content)
    
    new_content = content
    for match in matches:
        # Resolve absolute path
        decoded_path = match.replace('%20', ' ')
        if not decoded_path.startswith('/'):
            decoded_path = '/' + decoded_path
        
        filename = os.path.basename(decoded_path)
        
        # 1. Copy file to project root if it exists
        if os.path.exists(decoded_path):
            try:
                shutil.copy2(decoded_path, os.path.join(project_root, filename))
                print(f"  Copied: {filename}")
            except Exception as e:
                print(f"  Error copying {filename}: {e}")
        else:
            print(f"  Warning: Path does not exist: {decoded_path}")
        
        # 2. Update content to use relative path
        # We replace the entire file:/// match with just the filename
        # Note: We must be careful with the original match string which might contain percents
        original_string = 'file:///' + match
        new_content = new_content.replace(original_string, filename)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("\nMIGRATION COMPLETE. All absolute paths converted to relative.")
