import requests

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
        'item_price': item_price
    }
    response = requests.post(url, json=payload)
    return response.json()

if __name__ == '__main__':
    # Test creating a ngo profile
    ngo_response = create_ngo(
        name='Test ngo',
        NGOid='https://twitch.tv/new',
        photo='https://nouns.wtf/static/media/noggles.7644bfd0.svg'
    )
    print("ngo Response:", ngo_response)

    # Test creating a wishlist item
    wishlist_response = create_wishlist(
        NGOid='https://twitch.tv/new',
        item_name='Gaming Chair',
        provenance_hash='abc123',
        item_price=299.99
    )
    print("Wishlist Response:", wishlist_response)

    # Access the home page to display all ngos and their wishlists
    home_response = requests.get(BASE_URL)
    print("Home Page HTML:")
    print(home_response.text)
