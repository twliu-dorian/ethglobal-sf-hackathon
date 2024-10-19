import requests

BASE_URL = 'http://127.0.0.1:5000'

# Function to create a streamer profile
def create_streamer(name, twitch_url, photo=None):
    url = f"{BASE_URL}/api/create_streamer"
    payload = {
        'name': name,
        'twitch_url': twitch_url,
        'photo': photo
    }
    response = requests.post(url, json=payload)
    return response.json()

# Function to create or append to a wishlist for a given Twitch URL
def create_wishlist(twitch_url, item_name, provenance_hash, item_price):
    url = f"{BASE_URL}/api/create_wishlist"
    payload = {
        'twitch_url': twitch_url,
        'item_name': item_name,
        'provenance_hash': provenance_hash,
        'item_price': item_price
    }
    response = requests.post(url, json=payload)
    return response.json()

if __name__ == '__main__':
    # Test creating a streamer profile
    streamer_response = create_streamer(
        name='Test Streamer',
        twitch_url='https://twitch.tv/new',
        photo='https://nouns.wtf/static/media/noggles.7644bfd0.svg'
    )
    print("Streamer Response:", streamer_response)

    # Test creating a wishlist item
    wishlist_response = create_wishlist(
        twitch_url='https://twitch.tv/new',
        item_name='Gaming Chair',
        provenance_hash='abc123',
        item_price=299.99
    )
    print("Wishlist Response:", wishlist_response)

    # Access the home page to display all streamers and their wishlists
    home_response = requests.get(BASE_URL)
    print("Home Page HTML:")
    print(home_response.text)
