from django.urls import path
from .views import SportListView, SportDetailView

urlpatterns = [
    path('', SportListView.as_view()),
    path('<int:pk>/', SportDetailView.as_view())
]
