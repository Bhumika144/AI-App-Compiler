def repair_schema(schema):

    database = schema.get(
        "database",
        {}
    )

    repaired = False

    for entity, fields in database.items():

        if "id" not in fields:

            fields.insert(0, "id")

            repaired = True

    return {
        "repaired": repaired,
        "schema": schema
    }