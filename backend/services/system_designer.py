def generate_system_design(intent_data):

    pages = [
        "Login",
        "Dashboard"
    ]

    entities = [
        "User"
    ]

    features = intent_data.get(
        "features",
        []
    )

    for feature in features:

        feature_lower = feature.lower()

        if "contact" in feature_lower:
            pages.append("Contacts")
            entities.append("Contact")

        if "deal" in feature_lower:
            pages.append("Deals")
            entities.append("Deal")

        if "activity" in feature_lower:
            pages.append("Activities")
            entities.append("Activity")

        if "report" in feature_lower:
            pages.append("Reports")

    permissions = {}

    for role in intent_data.get(
        "roles",
        []
    ):

        if role.lower() == "administrator":
            permissions[role] = ["all"]

        else:
            permissions[role] = pages

    return {
        "pages": list(set(pages)),
        "entities": list(set(entities)),
        "permissions": permissions
    }