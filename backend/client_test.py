import requests
import base64

from test_populate import NGOs
from generate_nouns import get_random_noun_bytes

BASE_URL = 'http://127.0.0.1:5000'

# Function to create a NGO profile
def create_ngo(name, NGOid, photo=None):
    url = f"{BASE_URL}/api/create_ngo"
    payload = {
        'name': name,
        'NGOid': NGOid,
        'photo': photo
    }
    response = requests.post(url, json=payload)
    return response.json()

# Function to create or append to a wishlist for a given NGO wallet id
def create_wishlist(NGOid, item_name, provenance_hash, item_price):
    url = f"{BASE_URL}/api/create_wishlist"
    payload = {
        'NGOid': NGOid,
        'item_name': item_name,
        'provenance_hash': provenance_hash,
        'item_price': item_price,
        'fulfilled': False
    }
    response = requests.post(url, json=payload)
    return response.json()

def test_deploy():
    url = f"{BASE_URL}/api/smart_contract/donate"
    response = requests.post(url, json={})
    return response.json()

if __name__ == '__main__':
    # for NGO in NGOs:
    #     NGO["photo"] = "data:image/png;base64," + base64.b64encode(get_random_noun_bytes(NGO["photo"])).decode('utf-8')
    #     create_ngo(**NGO)
    print(test_deploy())

