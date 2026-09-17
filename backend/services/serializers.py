from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'price', 'duration', 'created_at']
        read_only_fields = ['id', 'created_at']
        
    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("name required")
        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be positive")
        return value

    def validate_duration(self, value):
        if value <= 0:
            raise serializers.ValidationError("Duration must be > 0")
        return value 

