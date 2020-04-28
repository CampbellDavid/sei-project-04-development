#pylint: disable=no-member

from django.db import models
from sports.models import Sport
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model
User = get_user_model()


class Event(models.Model):
    title = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    price = models.PositiveIntegerField()
    image = models.CharField(max_length=500)
    sport = models.ForeignKey(
        Sport, related_name='events', null=True, blank=True, on_delete=models.CASCADE)
    time_and_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    owner = models.ForeignKey(
        User, related_name='events', null=True, on_delete=models.CASCADE)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.title


class Review(models.Model):
    text = models.CharField(max_length=300)
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])
    event = models.ForeignKey(
        Event, related_name='reviews', null=True, on_delete=models.CASCADE)
    owner = models.ForeignKey(
        User, related_name='reviews', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return f'Review {self.id} on {self.event}'


class EventGroup(models.Model):
    group_name = models.CharField(max_length=300)
    attendees = models.ManyToManyField(
        'jwt_auth.User', related_name='event_groups', blank=True)
    event = models.ForeignKey(
        Event, related_name='event_groups', null=True, on_delete=models.CASCADE)
    owner = models.ForeignKey(
        User, null=True, related_name='event_groups+', on_delete=models.CASCADE)

    def __str__(self):
        return f'Group for {self.event} with id: {self.id}'
