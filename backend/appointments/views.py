from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer


@api_view(['GET', 'POST'])
def appointment_list_create(request):
    if request.method == 'GET':
        appointments = Appointment.objects.all()
        
        #filter
        status_filter = request.query_params.get('status')
        if status_filter:
            appointments = appointments.filter(status=status_filter)
        
        #search
        search = request.query_params.get('search')
        if search:
            appointments = appointments.filter(service__name__icontains=search)
            
        #date filter
        date_filter = request.query_params.get('date')
        if date_filter:
            appointments = appointments.filter(date=date_filter)
            
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)
    
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def appointment_delete(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    appointment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PATCH'])
def appointment_update(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if 'status' not in request.data:
        return Response({'error': 'Status field is required'}, status=status.HTTP_400_BAD_REQUEST)

    appointment.status = request.data['status']
    appointment.save()
    serializer = AppointmentSerializer(appointment)
    return Response(serializer.data)
