# Salon Appointment Booking System

Simple booking system for a salon. Made for college assessment.
Staff can manage services and appointments.

### What it does
- Add / Edit / Delete salon services (Haircut, Facial etc)
- Book new appointments (customer name, phone, service, date, time)
- View all appointments, filter by status, search by name
- Update appointment status (Pending -> Confirmed -> Completed/Cancelled)
- Delete appointments
- Prevent double booking for same service at same time

### Tech Used
- Backend: Django + Django REST Framework (function based views)
- Frontend: React + Vite
- Database: SQLite (db.sqlite3)

### How to Run - Backend
1. Open terminal in `backend` folder
2. Create venv (if not already):
    python -m venv venv
    venv\Scripts\activate # on Windows
3. Install packages:
    pip install django,djangorestframework,django-cors-headers
4. Run database:
    python manage.py migrate
5. Start server:
    python manage.py runserver 8000
        Backend will run on http://127.0.0.1:8000

### How to Run - Frontend
1. Open new terminal in `frontend` folder
2. Install:
    npm run dev

    Frontend will run on http://127.0.0.1:5173

    Go to http://127.0.0.1:5173 to use the app.

### API Endpoints

Services:
- GET    /api/services/  - list all services
- POST   /api/services/  - create service {name, price, duration}
- PUT    /api/services/<id>/ - update service
- DELETE /api/services/<id>/ - delete service

Appointments:
- GET    /api/appointments/ - list all (can filter ?status=Pending&search=Ram&date=2026-09-18)
- POST   /api/appointments/ - create {customer_name, customer_phone, service, date, time, notes}
- PATCH  /api/appointments/<id>/status/ - update status {status: "Confirmed"}
- DELETE /api/appointments/<id>/ - delete

### Database
- Service table: id, name, price, duration, created_at
- Appointment table: id, customer_name, customer_phone, service (ForeignKey), date, time, notes, status, created_at
- Used ForeignKey so appointment must have valid service
- Added unique check for same service + date + time to stop double booking

### Sample Data
After migrate, you can add:
- Services: Haircut Rs.500 30min, Hair Coloring Rs.2500 120min, Facial Rs.1500 60min
- Appointments: Ram Sharma - Haircut - 2026-09-18 10:00 Pending, Sita Thapa - Facial - 2026-09-18 11:00 Confirmed

Or just add them from the frontend.

### How to Test Booking Flow
1. Go to Services tab, add Haircut
2. Go to New Booking, fill form, select Haircut, pick date/time, click Book
3. Try to book same service same time again - it should show error "Already booked"
4. Go to Appointments, change status from Pending to Confirmed, try delete

### Notes
- No login needed for this task
- Simple design, no payment or SMS
- Works on local only