import os
import json

def generate_config(base_dir):
    config = {
        "languages": ["hu", "en"],
        "defaultLanguage": "hu",
        "sidebar": {
            "hu": [],
            "en": []
        }
    }

    for lang in config["languages"]:
        lang_dir = os.path.join(base_dir, lang)
        if not os.path.exists(lang_dir):
            continue

        # Files in the root of the language dir
        root_files = sorted([f for f in os.listdir(lang_dir) if f.endswith('.md') and f != 'SUMMARY.md'])
        root_section = {
            "title": "General",
            "path": lang,
            "files": []
        }
        for file in root_files:
            title = file.replace('.md', '').replace('-', ' ').title()
            if title.lower() == 'readme':
                title = 'Introduction'
            root_section["files"].append({
                "title": title,
                "path": f"{lang}/{file}"
            })
        if root_section["files"]:
            config["sidebar"][lang].append(root_section)

        # Subdirectories
        dirs = sorted([d for d in os.listdir(lang_dir) if os.path.isdir(os.path.join(lang_dir, d))])
        for d in dirs:
            dir_path = os.path.join(lang_dir, d)
            dir_files = sorted([f for f in os.listdir(dir_path) if f.endswith('.md')])
            
            section = {
                "title": d.replace('-', ' ').title(),
                "path": f"{lang}/{d}",
                "files": []
            }

            # Put README first if exists
            if 'README.md' in dir_files:
                section["files"].append({
                    "title": "Overview",
                    "path": f"{lang}/{d}/README.md"
                })
                dir_files.remove('README.md')
                
            for file in dir_files:
                title = file.replace('.md', '').replace('-', ' ').title()
                section["files"].append({
                    "title": title,
                    "path": f"{lang}/{d}/{file}"
                })
                
            if section["files"]:
                config["sidebar"][lang].append(section)

    config_path = os.path.join(base_dir, 'config.json')
    with open(config_path, 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2, ensure_ascii=False)
    
    print(f"Generated {config_path} successfully.")

if __name__ == '__main__':
    # Run in the current directory
    generate_config('.')
