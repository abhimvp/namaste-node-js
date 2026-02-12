# devTinder API's

## authRouter

- POST /signup
- POST /login
- POST /logout

The above three api's are related to auth, so we will create authRouter & add the api's into this.

---

## profileRouter

- GET /profile/view --> to fetch and view profile
- PATCH /profile/edit --> other fields
- PATCH /profile/password --> only for password

- The profile Router will have all these 3 API's

---

Status: ignore(pass) , interested(like) , accepted , rejected

---

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestID

- Adds the above API's into connection request router

---

## userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed - gets you the profiles of other users of the platform

- Organize our API's using [express router](https://expressjs.com/en/5x/api.html#express.router)
