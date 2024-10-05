import os
import json
from pathlib import Path


def load_mapignore(root_dir):
    mapignore_path = Path(root_dir) / '.mapignore'
    ignore_patterns = []

    if mapignore_path.is_file():
        with open(mapignore_path) as f:
            ignore_patterns = [line.strip() for line in f if
                               line.strip() and not line.startswith('#')]

    return ignore_patterns


def should_ignore(path, ignore_patterns):
    for pattern in ignore_patterns:
        if path.startswith(pattern) or pattern in path:
            return True
    return False


def generate_json_structure(base_url, root_dir, ignore_patterns):
    structure = {
        "data": {},
        "images": {},
        "site_map.json": f"{base_url}/site_map.json",
    }

    for dirpath, dirnames, filenames in os.walk(root_dir):
        if '.git' in dirpath:
            continue

        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            relative_path = os.path.relpath(file_path, root_dir)

            if should_ignore(relative_path, ignore_patterns):
                continue

            url = f"{base_url}/{relative_path.replace(os.sep, '/')}"

            if filename.endswith('.json'):
                structure["data"][filename] = url
            elif filename.endswith(('.png', '.jpg', '.jpeg', '.gif')):
                structure["images"][filename] = url
            else:
                structure[filename] = url

    return structure


def main():
    base_url = "https://vstahelin.github.io/cms-portfolio"
    root_dir = os.getcwd()
    ignore_patterns = load_mapignore(root_dir)

    json_structure = generate_json_structure(base_url, root_dir, ignore_patterns)

    with open('site_map.json', 'w') as json_file:
        json.dump(json_structure, json_file, indent=4)


if __name__ == "__main__":
    main()
