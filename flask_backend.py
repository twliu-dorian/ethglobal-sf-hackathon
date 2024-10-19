from flask import Flask, jsonify, request, render_template_string
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Create a Flask application instance
app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///streamers.db'
db = SQLAlchemy(app)

# Define the Streamer model
class Streamer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    twitch_url = db.Column(db.String(200), unique=True, nullable=False)
    photo = db.Column(db.String(200), nullable=True)

# Define the Wishlist model
class Wishlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    twitch_url = db.Column(db.String(200), db.ForeignKey('streamer.twitch_url'), nullable=False)
    item_name = db.Column(db.String(100), nullable=False)
    provenance_hash = db.Column(db.String(200), nullable=False)
    item_price = db.Column(db.Float, nullable=False)

# Create the database tables
with app.app_context():
    db.create_all()

# Define a route and its corresponding request handler
@app.route('/')
def home():
    streamers = Streamer.query.all()
    response = []
    for streamer in streamers:
        wishlist_items = Wishlist.query.filter_by(twitch_url=streamer.twitch_url).all()
        wishlist = [
            {
                "item_name": item.item_name,
                "provenance_hash": item.provenance_hash,
                "item_price": item.item_price
            }
            for item in wishlist_items
        ]
        response.append({
            "name": streamer.name,
            "twitch_url": streamer.twitch_url,
            "photo": streamer.photo,
            "wishlist": wishlist
        })
    
    html = """
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Streamers and Wishlists</title>
      </head>
      <body>
        <h1>Streamers and Their Wishlists</h1>
        {% for streamer in streamers %}
          <div>
            <h2>{{ streamer['name'] }}</h2>
            <p><strong>Twitch URL:</strong> <a href="{{ streamer['twitch_url'] }}" target="_blank">{{ streamer['twitch_url'] }}</a></p>
            {% if streamer['photo'] %}
              <img src="{{ streamer['photo'] }}" alt="{{ streamer['name'] }}'s photo" style="max-width: 200px;" />
            {% endif %}
            <h3>Wishlist:</h3>
            <ul>
              {% for item in streamer['wishlist'] %}
                <li>{{ item['item_name'] }} - ${{ item['item_price'] }} (Provenance: {{ item['provenance_hash'] }})</li>
              {% endfor %}
            </ul>
          </div>
          <hr>
        {% endfor %}
      </body>
    </html>
    """
    return render_template_string(html, streamers=response)

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

    new_streamer = Streamer(name=name, twitch_url=twitch_url, photo=photo)
    db.session.add(new_streamer)
    db.session.commit()

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

    new_item = Wishlist(twitch_url=twitch_url, item_name=item_name, provenance_hash=provenance_hash, item_price=item_price)
    db.session.add(new_item)
    db.session.commit()

    return jsonify({"message": "Wishlist item added successfully."}), 201

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
