from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self,name, email, password):
        self.name = name
        self.email = email
        self.password = password
        self.is_active = False      
        db.session.add(self)
        db.session.commit()
        

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
        "id": self.id,
        "name": self.name,
        "email": self.email,
        "is_active": self.is_active
        # do not serialize the password, its a security breach
        }


#  //// Modelo de Caimaneras
class Caimaneras(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    datetime = db.Column(db.String(120), unique=False, nullable=False)
    location = db.Column(db.String(120), unique=False, nullable=False)
    creator = db.Column(db.Integer, db.ForeignKey("user.id"))

    def __init__(self, name, datetime, location, creator):
        self.name = name
        self.datetime = datetime
        self.location = location
        self.creator = creator
        db.session.add(self)
        db.session.commit()

    def serialize(self):
        return {
			"id":self.id,
            "name":self.name,
            "datetime":self.datetime,
            "location":self.location,
            "creator":self.creator}







#  //// Modelo de Inscripciones
class Inscripciones(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("caimaneras.id"))
    player_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def __init__(self, event_id, player_id):
        self.event_id = event_id
        self.player_id = player_id
        db.session.add(self)
        db.session.commit()
    
    def serialize(self):
        return {
            "event_id":self.event_id,
            "player_id":self.player_id
        }
        