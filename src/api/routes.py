"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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
    email = body.get('email', None)
    password = body.get('password', None)
    if email is None or password is None: 
        return jsonify(
        "revise el payload de su solicitud"
        ), 400
    new_user = User(email, password)
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
