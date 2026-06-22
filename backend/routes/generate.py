from flask import Blueprint
from flask import request
from services.system_designer import generate_system_design
from services.intent_extractor import extract_intent
from services.schema_generator import generate_schema
from validators.schema_validator import validate_schema
from services.repair_engine import repair_schema
from services.runtime_simulator import simulate_runtime

generate_bp = Blueprint(
    "generate",
    __name__
)

@generate_bp.route(
    "/generate-intent",
    methods=["POST"]
)
def generate_intent():

    data = request.json

    prompt = data.get("prompt")

    result = extract_intent(prompt)

    return result


@generate_bp.route(
    "/generate-system-design",
    methods=["POST"]
)
def generate_system_design_route():

    data = request.json

    intent_data = data.get(
        "intentData"
    )

    result = generate_system_design(
        intent_data
    )

    return result



@generate_bp.route(
    "/generate-schema",
    methods=["POST"]
)
def generate_schema_route():

    data = request.json

    system_design = data.get(
        "systemDesign"
    )

    result = generate_schema(
        system_design
    )

    return result


@generate_bp.route(
    "/validate-schema",
    methods=["POST"]
)
def validate_schema_route():

    data = request.json

    schema = data.get(
        "schemaData"
    )

    result = validate_schema(
        schema
    )

    return result



@generate_bp.route(
    "/repair-schema",
    methods=["POST"]
)
def repair_schema_route():

    data = request.json

    schema = data.get(
        "schemaData"
    )

    result = repair_schema(
        schema
    )

    return result


@generate_bp.route(
    "/simulate-runtime",
    methods=["POST"]
)
def simulate_runtime_route():

    data = request.json

    schema = data.get(
        "schemaData"
    )

    result = simulate_runtime(
        schema
    )

    return result