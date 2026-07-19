import os
import requests
from dotenv import load_dotenv

load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
BREVO_SENDER = os.getenv("BREVO_SENDER")


def send_email(receiver_email, subject, body):

    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
    }

    payload = {
        "sender": {
            "email": BREVO_SENDER,
            "name": "AI App Compiler"
        },
        "to": [
            {
                "email": receiver_email
            }
        ],
        "subject": subject,
        "textContent": body
    }

    try:

        response = requests.post(
            url,
            headers=headers,
            json=payload
        )

        if response.status_code == 201:

            print("✅ Email Sent Successfully")

            return True

        else:

            print("❌ Brevo Error:", response.text)

            return False

    except Exception as e:

        print("❌ Email Exception:", e)

        return False