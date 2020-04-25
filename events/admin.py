from django.contrib import admin
from .models import Event, Review, EventGroup

admin.site.register(Event)
admin.site.register(Review)
admin.site.register(EventGroup)
