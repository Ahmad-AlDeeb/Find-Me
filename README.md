# ⚡ Starting Up
1. Clone the repository
2. Create virutal environment by running  `python -m venv venv`
3. Activate virtual environment by running `venv/Scripts/activate`
4. Install the project dependencies by running: `pip install django`
5. Make Migrations by running `python manage.py makemigrations`
6. Apply Migrations by running `python manage.py migrate`
7. Run the server using command `python manage.py runserver`
# 👤 User Story 
## As `Parent` Who Lost My Child I Want To
- Upload my child photo.
- Get location and phone number of `Helper` who found him (success case✅).
- Receive notification when my child is found (failure case ❌).
## As `Helper` Who Found Lost Child I Want To
- Upload the lost child photo.
- Get location and phone number of `Parent` who lost his child (success case✅).
- Receive notification when the lost child's parent is found (failure case ❌).
# 🚩User Journey
   - **Login/signup page:**
	   - Create account.
	   - Log in.
   - **Home page:**
	   - Report missing.
	   - Report found.
   - **Report page:**
	   - Upload image.
   - **Success page**.
   - **Failure page**.
# 🔵Endpoints
- Login page: `GET /login`.
- Logging in: `POST /login`.
- Create account page: `GET /register`.
- Creating account: `POST /register`.
- Home page: `GET /`.
- Report page: `GET /report`.
- Send report details: `POST /report`.
- Result page: `GET /result`.
# 🟡Models
- `user`:
	- `id`.
	- `first_name`.
	- `last_name`.
	- `email`.
 	- `password`. 
	- `phone`.
	- `state`.
	- `city`.
- `child`:
	- `id`.
	- `user_id`.
	- `img_url`.
	- `status`.
# 💀 Problems
- Email Confirmation
- Deploying
# 🤔 Extra
- About page
- Resting password
- Changing user details
