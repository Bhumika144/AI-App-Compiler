from flask import Blueprint, request, jsonify
import bcrypt
from datetime import datetime, timedelta
from config.jwt_config import generate_token
from models.user_model import users_collection
from utils.email_service import send_email
from utils.otp_generator import generate_otp

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/signup", methods=["POST"])
def signup():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Check if email already exists
    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email already registered."
        }), 400

    # Hash Password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    # Generate OTP
    otp = generate_otp()

    # OTP Expiry (10 minutes)
    otp_expiry = datetime.utcnow() + timedelta(minutes=10)

    # User Document
    user = {
        "name": name,
        "email": email,
        "password": hashed_password.decode("utf-8"),

        "isVerified": False,

        "otp": otp,
        "otpExpiry": otp_expiry
    }

    # Save User
    users_collection.insert_one(user)

    print("✅ User Saved Successfully")
    print("Generated OTP:", otp)

    # Send Welcome Email (Temporary)
    email_sent = send_email(
        receiver_email=email,
        subject="🎉 Welcome to AI App Compiler",
        body=f"""
Hello {name},

Welcome to AI App Compiler!

Your account has been created successfully.

Your Generated OTP is: {otp}

This OTP will expire in 10 minutes.

Regards,
AI App Compiler Team
"""
    )

    if email_sent:
        print("✅ Welcome Email Sent")
    else:
        print("❌ Failed to Send Welcome Email")

    return jsonify({
        "success": True,
        "message": "User registered successfully."
    }), 201



@auth_bp.route("/verify-otp", methods=["POST"])
def verify_otp():

    data = request.json

    email = data.get("email")
    otp = data.get("otp")

    # Find user
    user = users_collection.find_one({
        "email": email
    })

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    # Check OTP
    if user["otp"] != otp:
        return jsonify({
            "success": False,
            "message": "Invalid OTP."
        }), 400

    # Check Expiry
    if datetime.utcnow() > user["otpExpiry"]:
        return jsonify({
            "success": False,
            "message": "OTP Expired."
        }), 400

    # Verify User
    users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "isVerified": True
            },
            "$unset": {
                "otp": "",
                "otpExpiry": ""
            }
        }
    )

    print("✅ User Verified Successfully")

    return jsonify({
        "success": True,
        "message": "OTP Verified Successfully."
    }), 200



@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    # Find User
    user = users_collection.find_one({
        "email": email
    })

    if not user:

        return jsonify({
            "success": False,
            "message": "User not found."
        }), 404

    # Check Email Verification
    if not user["isVerified"]:

        return jsonify({
            "success": False,
            "message": "Please verify your email first."
        }), 401

    # Check Password
    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):

        return jsonify({
            "success": False,
            "message": "Incorrect password."
        }), 401

    # Generate JWT
    token = generate_token(user["_id"])

    print("✅ Login Successful")

    return jsonify({

        "success": True,

        "message": "Login Successful.",

        "token": token,

        "user": {

            "id": str(user["_id"]),

            "name": user["name"],

            "email": user["email"]

        }

    }), 200