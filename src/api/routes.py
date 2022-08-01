"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Caimaneras, Inscripciones
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required



api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# ////Metodo POST de usuario para SignUp
@api.route('/users', methods=['POST'])
def handle_users():
    body = request.json
    name = body.get('name', None)
    email = body.get('email', None)
    password = body.get('password', None)
    if name is None or email is None or password is None: 
        return jsonify(
        "revise el payload de su solicitud"
        ), 400
    new_user = User(name, email, password)
    return jsonify(new_user.serialize()), 201

@api.route('/token', methods=['POST'])
def create_token(): 
    body = request.json
    email = body.get('email', None)
    password = body.get('password', None)
    
    if email is None or password is None:
        return jsonify("revise el payload de su solicitud..."), 400
    user = User.query.filter_by(email=email).one_or_none()
    
    if user is None or password != user.password:
        return jsonify("password o usuario incorrecto"), 401
    
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "token" : access_token
    }), 201

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200


#.  //// metodo post de caimaneras (falta arreglar flux)
@api.route("/caimaneras", methods=["POST"])
@jwt_required()
def create_caimanera():
    body = request.json
    name = body.get('name',None)
    datetime = body.get('datetime', None)
    location = body.get('location', None)
    if datetime is None or location is None or name is None: 
        return jsonify("param missing in payload"),400
    current_user_id = get_jwt_identity()
    new_caimanera = Caimaneras(name, datetime, location, current_user_id)
    creator_inscripciones = Inscripciones(new_caimanera.id, current_user_id)
    return (new_caimanera.serialize()),201

       # listo esta manguangua
