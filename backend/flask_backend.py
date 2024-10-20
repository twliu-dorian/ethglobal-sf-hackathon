from datetime import datetime
import subprocess
import os
from flask import Flask, jsonify, request, render_template_string
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import contextlib


@contextlib.contextmanager
def new_cd(x):
    d = os.getcwd()

    # This could raise an exception, but it's probably
    # best to let it propagate and let the caller
    # deal with it, since they requested x
    os.chdir(x)

    try:
        yield

    finally:
        # This could also raise an exception, but you *really*
        # aren't equipped to figure out what went wrong if the
        # old working directory can't be restored.
        os.chdir(d)


# Create a Flask application instance
app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///NGOs.db'
db = SQLAlchemy(app)

# Define the NGO model
class NGO(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    NGOid = db.Column(db.String(200), unique=True, nullable=False)
    photo = db.Column(db.String(200), nullable=True)

class Donor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    donorid = db.Column(db.String(200), unique=True, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    proof_of_deposit = db.Column(db.String(200), unique=True, nullable=True)
    photo = db.Column(db.String(200), nullable=True)

# Define the Wishlist model
class Wishlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    NGOid = db.Column(db.String(200), db.ForeignKey('ngo.NGOid'), nullable=False)
    item_name = db.Column(db.String(100), nullable=False)
    provenance_hash = db.Column(db.String(200), unique=True, nullable=False)
    item_price = db.Column(db.Float, nullable=False)
    fulfilled = db.Column(db.Boolean, default=True, nullable=False)

# Create the database tables
with app.app_context():
    db.create_all()

# Define a route and its corresponding request handler
@app.route('/')
def home():
    NGOs = NGO.query.all()
    response = []
    for ngo in NGOs:
        wishlist_items = Wishlist.query.filter_by(NGOid=ngo.NGOid).all()
        wishlist = [
            {
                "item_name": item.item_name,
                "provenance_hash": item.provenance_hash,
                "item_price": item.item_price,
                "fulfilled": item.fulfilled,
            }
            for item in wishlist_items
        ]
        response.append({
            "name": ngo.name,
            "NGOid": ngo.NGOid,
            "photo": ngo.photo,
            "wishlist": wishlist
        })
    
    html = """
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>NGOs and Wishlists</title>
      </head>
      <body>
        <h1>NGOs and Their Wishlists</h1>
        {% for ngo in NGOs %}
          <div>
            <h2>{{ ngo['name'] }}</h2>
            <p><strong>NGO wallet address:</strong> <a href="{{ ngo['NGOid'] }}" target="_blank">{{ ngo['NGOid'] }}</a></p>
            {% if ngo['photo'] %}
              <img src="{{ ngo['photo'] }}" alt="{{ ngo['name'] }}'s photo" style="max-width: 200px;" />
            {% endif %}
            <h3>Wishlist:</h3>
            <ul>
              {% for item in ngo['wishlist'] %}
                <li>{{ item['item_name'] }} - ${{ item['item_price'] }} (Provenance: {{ item['provenance_hash'] }}) Fulfilled: {{ item['provenance_hash'] }}</li>
              {% endfor %}
            </ul>
          </div>
          <hr>
        {% endfor %}
      </body>
    </html>
    """
    return render_template_string(html, NGOs=response)

# Define an API endpoint to return JSON data
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

# API endpoint to create a ngo profile
@app.route('/api/create_ngo', methods=['POST'])
def create_ngo():
    data = request.get_json()
    name = data.get('name')
    NGOid = data.get('NGOid')
    photo = data.get('photo')

    if not name or not NGOid:
        return jsonify({"error": "Name (name) and NGO wallet id (NGOid) are required."}), 400

    # Check if an NGO with the same NGOid already exists
    existing_ngo = NGO.query.filter_by(NGOid=NGOid).first()

    if existing_ngo:
        # Update the existing NGO
        existing_ngo.name = name
        existing_ngo.photo = photo
        db.session.commit()
        return jsonify({"message": "NGO profile updated successfully."}), 200
    else:
        # Create a new NGO
        new_ngo = NGO(name=name, NGOid=NGOid, photo=photo)
        db.session.add(new_ngo)
        db.session.commit()
        return jsonify({"message": "NGO profile created successfully."}), 201

# API endpoint to create or append to a wishlist for a given Twitch URL
@app.route('/api/create_wishlist', methods=['POST'])
def create_wishlist():
    data = request.get_json()
    NGOid = data.get('NGOid')
    item_name = data.get('item_name')
    provenance_hash = data.get('provenance_hash')
    item_price = data.get('item_price')
    fulfilled = data.get('fulfilled')

    if not provenance_hash:
        return jsonify({"error": "provenance_hash required."}), 400

    existing_item = Wishlist.query.filter_by(provenance_hash=provenance_hash).first()

    if existing_item:
        # Update existing wishlist item
        existing_item.NGOid = NGOid
        existing_item.item_name = item_name
        existing_item.item_price = item_price
        existing_item.fulfilled = fulfilled
        db.session.commit()
        return jsonify({"message": "Wishlist item updated successfully."}), 200

    else:
        
        if not NGOid or not item_name or not provenance_hash or not item_price or not fulfilled:
            return jsonify({"error": "All fields are required."}), 400
        new_item = Wishlist(NGOid=NGOid, item_name=item_name, provenance_hash=provenance_hash, item_price=item_price)
        db.session.add(new_item)
        db.session.commit()

        return jsonify({"message": "Wishlist item added successfully."}), 201

@app.route('/api/smart_contract/deploy', methods=['POST'])
def deploy_contract():
    with new_cd("../smart-contracts"):
        output = subprocess.run("npx hardhat run scripts/blockchain/deploy.js".split(), capture_output=True)
        data = {"output": str(output.stdout)}
    return jsonify(data), 200

@app.route('/api/smart_contract/add_wish_list', methods=['POST'])
def add_wish_list():
    with new_cd("../smart-contracts"):
        output = subprocess.run("npx hardhat run scripts/blockchain/addWishList.js".split(), capture_output=True)
        data = {"output": str(output.stdout)}
    return jsonify(data), 200

@app.route('/api/smart_contract/donate', methods=['POST'])
def donate():
    with new_cd("../smart-contracts"):
        output = subprocess.run("npx hardhat run scripts/blockchain/fulfillWishList.js".split(), capture_output=True)
        data = {"output": str(output.stdout)}
    return jsonify(data), 200

@app.route('/api/smart_contract/track_NFT', methods=['POST'])
def trackNFT():
    with new_cd("../smart-contracts"):
        output = subprocess.run("npx hardhat run scripts/blockchain/trackNFT.js".split(), capture_output=True)
        data = {"output": str(output.stdout)}
    return jsonify(data), 200

@app.route('/api/smart_contract/check_bal', methods=['POST'])
def checkBal():
    with new_cd("../smart-contracts"):
        output = subprocess.run("npx hardhat run scripts/blockchain/checkBalance.js".split(), capture_output=True)
        data = {"output": str(output.stdout)}
    return jsonify(data), 200

@app.route('/api/smart_contract/transfer_to_manu', methods=['POST'])
def transferManu():
    with new_cd("../smart-contracts"):
        output = subprocess.run("npx hardhat run scripts/blockchain/transferToManu.js".split(), capture_output=True)
        data = {"output": str(output.stdout)}
    return jsonify(data), 200

@app.route('/api/smart_contract/check_ownership', methods=['POST'])
def ckcOwner():
    with new_cd("../smart-contracts"):
        output = subprocess.run("npx hardhat run scripts/blockchain/checkOwnership.js".split(), capture_output=True)
        data = {"output": str(output.stdout)}
    return jsonify(data), 200

@app.route('/api/smart_contract/redeemNFT', methods=['POST'])
def redeemNFT():
    with new_cd("../smart-contracts"):
        output = subprocess.run("npx hardhat run scripts/blockchain/redeemNFT.js".split(), capture_output=True)
        data = {"output": str(output.stdout)}
    return jsonify(data), 200

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
