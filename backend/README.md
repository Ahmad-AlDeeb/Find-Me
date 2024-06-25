# ⚡ Starting Up
1. Clone the repository
2. Create virtual environment `python -m venv venv`
3. Activate virtual environment `venv/Scripts/activate`
4. Install the project dependencies : `pip install django faker djangorestframework django-cors-headers`
5. Make Migrations `python manage.py makemigrations`
6. Make Migrations for core app  `python manage.py makemigrations core`
7. Apply Migrations `python manage.py migrate`
8. Create Super User `python manage.py createsuperuser`
9. Seeding the database `python manage.py seed_db`
10. Run the server using command `python manage.py runserver`
