from django.urls import path
from .views import EventListView, EventDetailView, ReviewListView, ReviewDetailView, EventGroupListView, EventGroupDetailView

urlpatterns = [
    path('', EventListView.as_view()),
    path('<int:pk>/', EventDetailView.as_view()),
    path('<int:pk>/reviews/', ReviewListView.as_view()),
    path('<int:pk>/reviews/<int:review_pk/', ReviewDetailView.as_view()),
    path('<int:pk>/event_groups/', EventGroupListView.as_view()),
    path('<int:pk>/event_groups/<int:event_group_pk>/',
         EventGroupDetailView.as_view())
]
