from rest_framework import serializers
from events.models import Event
from .models import Sport
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'title', 'image')


class SportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sport
        fields = '__all__'


class PopulatedSportSerializer(SportSerializer):
    owner = UserSerializer()
    events = EventSerializer(many=True)
