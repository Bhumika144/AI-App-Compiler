def validate_schema(schema):

    errors = []
    warnings = []

    database = schema.get(
        "database",
        {}
    )

    apis = schema.get(
        "apis",
        []
    )

    pages = schema.get(
        "pages",
        []
    )

    if not database:
        errors.append(
            "Database schema missing"
        )

    if not apis:
        errors.append(
            "API definitions missing"
        )

    if not pages:
        warnings.append(
            "No frontend pages defined"
        )

    for entity, fields in database.items():

        if "id" not in fields:

            errors.append(
                f"{entity} missing id field"
            )

    return {
        "valid": len(errors) == 0,
        "errors": errors,
        "warnings": warnings
    }