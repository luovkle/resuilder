from flask import Flask

from app.routers import bp

app = Flask(__name__)
app.register_blueprint(bp)
