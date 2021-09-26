from django.urls import path
from .views import RoomView
from .views import CreateRoomView

urlpatterns = [
    # if we get whatever url call the main function
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view())
]
