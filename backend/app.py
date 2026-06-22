from flask import Flask
from flask_cors import CORS

from routes.generate import generate_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(generate_bp)

@app.route("/")
def home():
    return {
        "message": "Backend Running"
    }

if __name__ == "__main__":
    app.run(debug=True)