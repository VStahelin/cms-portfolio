# CMS Portfolio

This project uses **GitHub Pages** to host the portfolio content, with an automated system to generate a file map (`site_map.json`). The generated structure includes JSON files, images, and other static resources from the repository.

## Project Structure

The `site_map.json` file maps the project's resources as follows:

- **data**: JSON files that contain structured data.
- **images**: Image resources such as `.png`, `.jpg`, `.jpeg`, and `.gif`.
- Other files are listed directly in the root of the structure.

Example of the generated structure:

```json
{
    "data": {
        "profile.json": "https://vstahelin.github.io/cms-portfolio/data/profile.json"
    },
    "images": {
        "profile_photo_1.png": "https://vstahelin.github.io/cms-portfolio/images/profile_photo_1.png",
        "protile_photo_2.jpg": "https://vstahelin.github.io/cms-portfolio/images/protile_photo_2.jpg"
    },
    "map_generator.py": "https://vstahelin.github.io/cms-portfolio/map_generator.py",
    "README.md": "https://vstahelin.github.io/cms-portfolio/README.md"
}
```

## How It Works

- Whenever a push is made to the main branch, a **GitHub Action** runs to update the `site_map.json` file. This file contains URLs pointing to the files hosted on the GitHub Pages site.
- The script responsible for generating the map can be found in the repository as `map_generator.py`.

## Usage

1. Clone the repository:
    ```bash
    git clone https://github.com/vstahelin/cms-portfolio.git
    ```
   
2. Run the script manually (optional):
    ```bash
    python map_generator.py
    ```

3. The `site_map.json` file will automatically update on new pushes, but you can run the script locally to check the structure.