from flask import Flask
from flask_cors import CORS
import os
from routes.auth import auth_bp
# MongoDB Connection
from config.db import db

# Routes
from routes.generate import generate_bp

app = Flask(__name__)

# Enable CORS
CORS(app)

# Register Blueprints
app.register_blueprint(generate_bp)
app.register_blueprint(auth_bp)


@app.route("/")
def home():
    return {
        "status": "success",
        "message": "🚀 AI App Compiler Backend Running",
        "database": "MongoDB Atlas Connected"
    }


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)