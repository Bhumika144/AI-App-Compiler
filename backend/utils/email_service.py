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

        print("\n========== BREVO DEBUG ==========")
        print("Sender      :", BREVO_SENDER)
        print("Receiver    :", receiver_email)
        print("Subject     :", subject)
        print("API Key Set :", "YES" if BREVO_API_KEY else "NO")

        response = requests.post(
            url,
            headers=headers,
            json=payload,
            timeout=30
        )

        print("Status Code :", response.status_code)
        print("Response    :", response.text)
        print("=================================\n")

        if response.status_code == 201:
            print("✅ Email Sent Successfully")
            return True
        else:
            print("❌ Failed to Send Email")
            return False

    except Exception as e:

        print("\n========== BREVO EXCEPTION ==========")
        print("Sender      :", BREVO_SENDER)
        print("Receiver    :", receiver_email)
        print("Exception   :", str(e))
        print("=====================================\n")

        return False