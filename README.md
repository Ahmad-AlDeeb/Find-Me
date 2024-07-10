# 👤 User Story 
## As `Parent` Who Lost My Child I Want To
- Upload my child photo.
- Get location and phone number of `Helper` who found him.
## As `Helper` Who Found Lost Child I Want To
- Upload the lost child photo.
- Get location and phone number of `Parent` who lost his child.
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
# 🎬 Demo
https://github.com/Ahmad-AlDeeb/Find-Me/assets/122436546/9dd25694-c0fe-497d-892a-fa2a9905f2e2
