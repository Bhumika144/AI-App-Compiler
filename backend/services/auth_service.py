from datetime import datetime, timedelta

from models.user_model import users_collection
from utils.password_utils import hash_password
from utils.otp_generator import generate_otp


def register_user(name, email, password):
    """
    Register a new user.
    """

    # Check if email already exists
    existing_user = users_collection.find_one(
        {
            "email": email
        }
    )

    if existing_user:
        return {
            "success": False,
            "message": "Email already registered."
        }

    hashed_password = hash_password(password)

    otp = generate_otp()

    otp_expiry = datetime.utcnow() + timedelta(minutes=10)

    user = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "isVerified": False,
        "otp": otp,
        "otpExpiry": otp_expiry,
        "createdAt": datetime.utcnow()
    }

    users_collection.insert_one(user)

    return {
        "success": True,
        "message": "User registered successfully.",
        "otp": otp
    }