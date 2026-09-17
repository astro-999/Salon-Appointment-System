from rest_framework import serializers
from .models import Appointment
from services.models import Service
from services.serializers import ServiceSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    service_detail = ServiceSerializer(source='service', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'customer_name', 'customer_phone', 'service', 'service_detail', 'date', 'time', 'notes', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

    def validate_customer_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Customer name required")
        return value.strip()

    def validate_customer_phone(self, value):
        if not value.strip():
            raise serializers.ValidationError("Customer phone required")
        return value.strip()

    def validate(self, data):
        service = data.get('service')
        date = data.get('date')
        time = data.get('time')
        if Appointment.objects.filter(service=service, date=date, time=time).exists():
            raise serializers.ValidationError("This time slot is already booked for this service")
        return data