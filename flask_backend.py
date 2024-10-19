from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

# Create a Flask application instance
app = Flask(__name__)
CORS(app)

# Configure MongoDB client
client = MongoClient('mongodb://localhost:27017/')
db = client['streamers_db']
streamers_collection = db['streamers']
wishlist_collection = db['wishlists']

# Define a route and its corresponding request handler
@app.route('/')
def home():
    return "Hello, Flask!"

# Define an API endpoint to return JSON data
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

# API endpoint to create a streamer profile
@app.route('/api/create_streamer', methods=['POST'])
def create_streamer():
    data = request.get_json()
    name = data.get('name')
    twitch_url = data.get('twitch_url')
    photo = data.get('photo')

    if not name or not twitch_url:
        return jsonify({"error": "Name and Twitch URL are required."}), 400

    new_streamer = {
        "name": name,
        "twitch_url": twitch_url,
        "photo": photo
    }
    streamers_collection.insert_one(new_streamer)

    return jsonify({"message": "Streamer profile created successfully."}), 201

# API endpoint to create or append to a wishlist for a given Twitch URL
@app.route('/api/create_wishlist', methods=['POST'])
def create_wishlist():
    data = request.get_json()
    twitch_url = data.get('twitch_url')
    item_name = data.get('item_name')
    provenance_hash = data.get('provenance_hash')
    item_price = data.get('item_price')

    if not twitch_url or not item_name or not provenance_hash or not item_price:
        return jsonify({"error": "All fields are required."}), 400

    new_item = {
        "twitch_url": twitch_url,
        "item_name": item_name,
        "provenance_hash": provenance_hash,
        "item_price": item_price
    }
    wishlist_collection.insert_one(new_item)

    return jsonify({"message": "Wishlist item added successfully."}), 201

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
