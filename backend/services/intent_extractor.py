import json

from config.gemini_config import model
from prompts.intent_prompt import INTENT_PROMPT


def extract_intent(user_prompt):

    prompt = INTENT_PROMPT.format(
        user_prompt=user_prompt
    )

    response = model.generate_content(
        prompt
    )

    text = response.text.strip()

    # Remove markdown if Gemini returns it
    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    try:
        return json.loads(text)

    except Exception as e:
        return {
            "error": "Failed to parse Gemini response",
            "raw_response": text,
            "details": str(e)
        }