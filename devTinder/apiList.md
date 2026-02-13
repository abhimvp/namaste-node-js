# devTinder API's

## authRouter

- POST /signup - done
- POST /login - done
- POST /logout - done

The above three api's are related to auth, so we will create authRouter & add the api's into this.

---

## profileRouter

- GET /profile/view --> to fetch and view profile - done
- PATCH /profile/edit --> other fields - done
- PATCH /profile/password --> only for password - TODO

- The profile Router will have all these 3 API's

---

Status: ignore(pass) , interested(like) , accepted , rejected

---

## connectionRequestRouter

- POST /request/send/:status/:userId -> :status can be interested or ignored

- POST /request/review/:status/:requestID -> :status can be rejected or accepted

- Adds the above API's into connection request router

---

## userRouter

- GET /user/connections - who has accepted my connection requests
- GET /user/requests/received - shows all the requested the user has received
- GET /user/feed - gets you the profiles of other users of the platform

- Organize our API's using [express router](https://expressjs.com/en/5x/api.html#express.router)
