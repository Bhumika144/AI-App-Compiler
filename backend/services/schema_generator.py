def generate_schema(system_design):

    entities = system_design.get(
        "entities",
        []
    )

    pages = system_design.get(
        "pages",
        []
    )

    database = {}

    apis = []

    for entity in entities:

        if entity == "User":
            database["User"] = [
                "id",
                "name",
                "email",
                "password",
                "role"
            ]

            apis.extend([
                "POST /login",
                "POST /register",
                "GET /users"
            ])

        elif entity == "Contact":
            database["Contact"] = [
                "id",
                "name",
                "email",
                "phone",
                "company"
            ]

            apis.extend([
                "GET /contacts",
                "POST /contacts",
                "PUT /contacts/:id",
                "DELETE /contacts/:id"
            ])

        elif entity == "Deal":
            database["Deal"] = [
                "id",
                "title",
                "value",
                "status"
            ]

            apis.extend([
                "GET /deals",
                "POST /deals"
            ])

        elif entity == "Activity":
            database["Activity"] = [
                "id",
                "type",
                "description",
                "date"
            ]

            apis.extend([
                "GET /activities",
                "POST /activities"
            ])

    return {
        "database": database,
        "apis": apis,
        "pages": pages
    }