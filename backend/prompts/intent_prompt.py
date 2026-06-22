INTENT_PROMPT = """
You are an expert software architect.

Your task is to analyze the user's application idea and convert it into structured JSON.

Return ONLY valid JSON.

Output Format:

{{
    "application_type": "",
    "features": [],
    "roles": []
}}

User Request:
{user_prompt}
"""