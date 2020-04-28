from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Sport(models.Model):
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=500)
    description = models.CharField(max_length=1000)
    owner = models.ForeignKey(
        User, related_name='sports', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
