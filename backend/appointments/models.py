from django.db import models
from services.models import Service
from django.utils import timezone

class Appointment(models.Model):
    customer_name = models.CharField(max_length=200)
    customer_phone = models.CharField(max_length=20)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)     
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Confirmed', 'Confirmed'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')], default='Pending')
