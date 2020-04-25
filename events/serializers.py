from rest_framework import serializers
from sports.models import Sport
from .models import Event, Review, EventGroup
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = '__all__'


# Will only display sport name where needed
# class SportSerializerForEvent(serializers.ModelSerializer):
#     class Meta:
#         model = Sport
#         fields = ['name']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class EventSerializer (serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class PopulatedReviewSerializer(ReviewSerializer):
    owner = UserSerializer()


class PopulatedEventSerializer(EventSerializer):
    # sport = SportSerializer()
    reviews = PopulatedReviewSerializer(many=True)
    owner = UserSerializer()
    # group = PopulatedEventGroupSerializer(many=True)


class EventGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventGroup
        fields = '__all__'


class AttendeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'profile_image', 'first_name', 'last_name')


class PopulatedEventGroupSerializer(EventGroupSerializer):
    attendees = AttendeesSerializer(many=True)
    event = PopulatedEventSerializer()
    owner = UserSerializer()


# class PopulatedEventGroupSerializer(EventGroupSerializer):
#     event = PopulatedEventSerializer()
#     owner = UserSerializer()
#     attendees = serializers.SerializerMethodField()

#     def get_attendees(self, obj):
#         # check to see if correct
#         return [User.data for Users in obj.attendees.all()]

class PartialEventGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventGroup
        fields = '__all__'


class PartialEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
