# ⚡ Starting Up
01. Clone the repository: `git clone https://github.com/Ahmad-AlDeeb/Find-Me`
02. Change directory to backend `cd ./backend/`
03. Create virtual environment `python -m venv venv`
04. Activate virtual environment
   - Windows: `venv/Scripts/activate`
   - Linux: `source venv/bin/activate`
05. Install Django dependencies
```
pip install django faker djangorestframework django-cors-headers opencv-python-headless numpy scikit-learn facenet-pytorch
```
06. Make migrations `python manage.py makemigrations`
07. Make migrations for core app `python manage.py makemigrations core`
08. Apply migrations `python manage.py migrate`
09. Create super user `python manage.py createsuperuser`
10. Run Django server `python manage.py runserver`
11. Open new terminal and change directory to frontend `cd ./frontend/`
12. Install React dependencies `npm install`
13. Run React app `npm run start`
# 🎬 Demo
https://github.com/Ahmad-AlDeeb/Find-Me/assets/122436546/9dd25694-c0fe-497d-892a-fa2a9905f2e2
