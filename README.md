# 👤 User Story 
## As `Parent` Who Lost My Child I Want To
- Upload my child photo.
- Get location and phone number of `Helper` who found him (success case✅).
- Receive notification when my child is found (failure case ❌).
## As `Helper` Who Found Lost Child I Want To
- Upload the lost child photo.
- Get location and phone number of `Parent` who lost his child (success case✅).
- Receive notification when the lost child's parent is found (failure case ❌).
# 🔵Endpoints
## Frontend
- Login page: `GET localhost:3000/login`.
- Create account page: `GET localhost:3000/register`.
- Home page: `GET localhost:3000`.
- Report page: `GET localhost:3000/report`.
- Result page: `GET localhost:3000/result`.
## Backend
- Login: `POST localhost:8000/login/`.
- Create account: `POST localhost:8000/register/`.
- Send report: `POST localhost:8000/report/`.
- Get all users: `GET localhost:8000/users/`.
- Get one user: `GET localhost:8000/users/<id>/`.
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
 	- `is_found`.
# 🎬 Demos
- Create new account and log in (admin & frontend)
- View & Update profile (admin & frontend)
- Delete account (admin & frontend)
- Report lost child with NO/YES answer
- Report found child with NO/YES answer
# 🤔 To-do-list
- About page
- FAQ page
- User profile
- Children endpoints
- Resize uploaded image to specific size
# 💀 Hard-list
- JWT Authentication
- Email confirmation
- Resetting password
- Integrating with mobile app
- Deploying
