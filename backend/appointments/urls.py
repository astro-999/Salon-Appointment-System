from django.urls import path
from . import views

urlpatterns = [
    path('appointments/', views.appointment_list_create, name='appointment-list-create'),
    path('appointments/<int:pk>/', views.appointment_delete, name='appointment-detail'),
    path('appointments/<int:pk>/status/', views.appointment_update, name='appointment-status'),
]   