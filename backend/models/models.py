from mongoengine import Document, StringField
from mongoengine import (
    connect, Document, StringField, ListField, EmbeddedDocument, EmbeddedDocumentField, BooleanField, IntField, DynamicDocument
)
import random
class SparkCollection(Document):
    text = StringField(required=True)
    type = StringField(required=True)
    scene_description = StringField(required=True)
    image_url = StringField(required=True)
    description = StringField(required=True)

class Choice(EmbeddedDocument):
    text = StringField(required=True)
    type = StringField(required=True)
    scene_description = StringField()
    image_url = StringField()
    description = StringField()
    is_chosen = BooleanField(default=False)

class Prompt(EmbeddedDocument):
    order = IntField(required=True)
    prompt = StringField(required=True)
    type = StringField(required=True)
    image_url = StringField()
    choices = ListField(EmbeddedDocumentField(Choice))
    scene_description = StringField()
    text = StringField()

class Book(Document):
    id = IntField(primary_key=True, default=random.randint(1111111, 9999999))
    name = StringField(required=True)
    is_finished = BooleanField(default=False)
    storyline = ListField(EmbeddedDocumentField(Prompt))

class User(Document):
    id = StringField(primary_key=True)
    email = StringField(required=True)
    # books = ListField(EmbeddedDocumentField(Book))

