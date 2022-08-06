from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    subscriptions = db.relationship('Inscripciones', back_populates='player')
    caimaneras = db.relationship('Caimaneras', back_populates='creator')

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
    longitud = db.Column(db.String(120), unique=False, nullable=False)
    latitud = db.Column(db.String(120), unique=False, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    creator = db.relationship('User', back_populates='caimaneras')
    subscribed = db.relationship('Inscripciones', back_populates='event')

    def __init__(self, name, datetime, longitud, latitud, creator_id):
        self.name = name
        self.datetime = datetime
        self.latitud = latitud
        self.longitud = longitud
        self.creator_id = creator_id
        db.session.add(self)
        db.session.commit()

    def serialize(self):
        return {
			"id":self.id,
            "name":self.name,
            "datetime":self.datetime,
            "location":{
                "lat": self.latitud,
                "long": self.longitud
            },
            "creator":self.creator.name,
            "subscribed": list(map(
                lambda s: s.players(), self.subscribed
            ))
            }







#  //// Modelo de Inscripciones
class Inscripciones(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("caimaneras.id"))
    event = db.relationship('Caimaneras', back_populates='subscribed')
    player_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    player = db.relationship('User', back_populates='subscriptions')

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
    
    def players(self): 
        return {
            "player_name": self.player.serialize()
        }