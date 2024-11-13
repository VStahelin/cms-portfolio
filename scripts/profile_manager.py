import json

def sort_projects_by_order_id(profile_path):
    with open(profile_path, 'r', encoding='utf-8') as file:
        profile = json.load(file)
    
    profile['projects'] = sorted(profile['projects'], key=lambda x: x['order_id'])
    
    with open(profile_path, 'w', encoding='utf-8') as file:
        json.dump(profile, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    sort_projects_by_order_id('../data/profile.json')