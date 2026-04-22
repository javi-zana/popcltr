import re
import os
import glob

html_files = glob.glob('*.html')
absolute_paths = set()

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        # Find all strings that look like file:/// URIs
        matches = re.findall(r'file:///([^\s"\'>]+)', content)
        for match in matches:
            # Decode URL encoding (like %20)
            decoded = match.replace('%20', ' ')
            # On Mac/Linux, file:/// usually starts with / (after the three slashes)
            if not decoded.startswith('/'):
                decoded = '/' + decoded
            absolute_paths.add(decoded)

print("UNIQUE ABSOLUTE PATHS FOUND:")
for path in sorted(absolute_paths):
    print(path)
