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
## Frontend:
- Login page: `GET localhost:3000/login`.
- Create account page: `GET localhost:3000/register`.
- Home page: `GET localhost:3000`.
- Report page: `GET localhost:3000/report`.
- Result page: `GET localhost:3000/result`.
- User details page: `GET localhost:3000/user-details`.
## Backend:
- Login: `POST localhost:8000/login/`.
- Create account: `POST localhost:8000/register/`.
- Send report: `POST localhost:8000/report/`.
- Send user answer: `POST /result`.
- Get all users: `GET /users`.
- Get one user: `GET /users/<id>`.
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
# 🤔 Extra
- About page
- FAQ page
- Resting password
- Changing user details
- Email confirmation
- Deploying
- Integrating with mobile app
- Check user Authentication at frontend
- Children endpoints
