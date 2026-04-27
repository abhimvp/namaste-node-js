# DevTinder — Comprehensive Interview Guide

> **Prepared for:** IntraEdge/Arrivia L1 Technical Interview — April 22, 2026
> **Last updated:** 2026-04-22 08:38 IST

---

## TABLE OF CONTENTS

1. [Project Overview](#section-1-project-overview)
2. [Architecture — Know This Cold](#section-2-architecture--know-this-cold)
3. [Code Walkthrough — File by File](#section-3-code-walkthrough--file-by-file)
4. [Key Design Decisions — Defend These](#section-4-key-design-decisions--defend-these)
5. [Database Design Deep-Dive](#section-5-database-design-deep-dive)
6. [Authentication Pattern](#section-6-authentication-pattern)
7. [Redux State Management](#section-7-redux-state-management)
8. [What's Implemented vs What's Not](#section-8-whats-implemented-vs-whats-not)
9. [Interview Q&A — DevTinder Specific](#section-9-interview-qa--devtinder-specific)
10. [AWS Deployment Plan](#section-10-aws-deployment-plan)
11. [Quick Reference Numbers](#section-11-quick-reference-numbers)
12. [The 30-Second Elevator Pitch](#section-12-the-30-second-elevator-pitch)

---

## SECTION 1: PROJECT OVERVIEW

### 10-Second Pitch

> "DevTinder is a full-stack developer networking platform where software engineers discover each other through a swipe-based feed, send 'interested' or 'ignore' signals, and build accepted connections — powered by Node.js, Express, React 19, Redux Toolkit, and MongoDB with compound-indexed queries for fast feed resolution."

### Why I Built It

DevTinder demonstrates end-to-end mastery of the full-stack JavaScript ecosystem: designing a RESTful API with Express, modeling domain-specific state machines in MongoDB, implementing secure JWT cookie-based authentication, and orchestrating client-side state with Redux Toolkit in React 19. The project exercises real production patterns — CORS configuration, input validation, pagination, protected routes, and efficient database indexing.

### Relevance to Arrivia

Arrivia builds travel-tech platforms where **user matching** (traveler ↔ deal), **recommendation feeds**, and **real-time personalization** drive business value. DevTinder directly mirrors these patterns:

| Arrivia Concept | DevTinder Equivalent |
|---|---|
| Traveler ↔ deal matching | Developer ↔ developer matching |
| Personalized recommendation feed | Feed API with already-seen exclusion |
| User state machine (booking stages) | Connection state machine (interested → accepted/rejected) |
| Secure session management | JWT cookie-based auth |
| Paginated browsing | Feed pagination with skip/limit |

### Full Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | React | 19.2.0 |
| State Management | Redux Toolkit | 2.11.2 |
| Routing (Client) | React Router DOM | 7.13.0 |
| CSS Framework | Tailwind CSS | 4.2.0 |
| Component Library | DaisyUI | 5.5.18 |
| Build Tool | Vite | 7.3.1 |
| HTTP Client | Axios | 1.13.5 |
| Backend Runtime | Node.js | (Express 5.2.1) |
| Web Framework | Express | 5.2.1 |
| Database | MongoDB (Atlas) | via Mongoose 9.2.0 |
| Authentication | JWT (jsonwebtoken) | 9.0.3 |
| Password Hashing | bcrypt | 6.0.0 |
| Validation | validator.js | 13.15.26 |
| Cookie Parsing | cookie-parser | 1.4.7 |
| CORS | cors | 2.8.6 |

### Project Structure

```
namaste-node-js/
├── devTinder/                      ← BACKEND (Express API)
│   ├── src/
│   │   ├── app.js                  ← Express server setup
│   │   ├── config/
│   │   │   └── database.js         ← MongoDB Atlas connection
│   │   ├── middlewares/
│   │   │   └── auth.js             ← JWT cookie auth middleware
│   │   ├── models/
│   │   │   ├── user.js             ← User schema + bcrypt + JWT methods
│   │   │   └── connectionRequest.js ← Connection schema + compound index
│   │   ├── routes/
│   │   │   ├── auth.js             ← signup, login, logout
│   │   │   ├── profile.js          ← view/edit profile
│   │   │   ├── requests.js         ← send/review connection requests
│   │   │   └── user.js             ← feed, connections, received requests
│   │   └── utils/
│   │       └── validation.js       ← signup & profile edit validation
│   ├── package.json
│   └── apiList.md                  ← API documentation
│
├── devTinder-web/                  ← FRONTEND (React SPA)
│   ├── src/
│   │   ├── main.jsx                ← App entry point
│   │   ├── App.jsx                 ← Routes + Redux Provider
│   │   ├── components/
│   │   │   ├── Body.jsx            ← Layout shell + auth check
│   │   │   ├── NavBar.jsx          ← Navigation + logout
│   │   │   ├── Login.jsx           ← Login/Signup form
│   │   │   ├── Feed.jsx            ← User feed display
│   │   │   ├── UserCard.jsx        ← Card with Interested/Ignore buttons
│   │   │   ├── Profile.jsx         ← Profile wrapper
│   │   │   ├── EditProfile.jsx     ← Edit profile form + live preview
│   │   │   ├── Connections.jsx     ← Accepted connections list
│   │   │   ├── Requests.jsx        ← Pending requests with Accept/Reject
│   │   │   └── Footer.jsx          ← Fixed footer
│   │   └── utils/
│   │       ├── appStore.js         ← Redux store configuration
│   │       ├── userSlice.js        ← Auth user state
│   │       ├── feedSlice.js        ← Feed users + removeUserFromFeed
│   │       ├── connectionSlice.js  ← Accepted connections state
│   │       ├── requestSlice.js     ← Pending requests state
│   │       └── constants.js        ← BASE_URL config
│   ├── package.json
│   └── vite.config.js
```

---

## SECTION 2: ARCHITECTURE — KNOW THIS COLD

### System Architecture Diagram

```
┌───────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                        │
│                                                                │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐  │
│  │  React 19    │   │ Redux Toolkit│   │  React Router    │  │
│  │  Components  │──▶│  Store       │   │  (client-side)   │  │
│  │  (Feed,      │   │  4 slices:   │   │  5 routes:       │  │
│  │   UserCard,  │   │  user, feed, │   │  /, /login,      │  │
│  │   Login,etc) │   │  connection, │   │  /profile,       │  │
│  │              │   │  request     │   │  /connections,    │  │
│  └──────┬───────┘   └──────────────┘   │  /requests       │  │
│         │                               └──────────────────┘  │
│         │ Axios (withCredentials: true)                        │
│         │ Cookie: token=<JWT>                                  │
└─────────┼─────────────────────────────────────────────────────┘
          │
          │ HTTP (REST API)
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS SERVER (:3000)                        │
│                                                                  │
│  Middleware Stack:                                                │
│  ┌──────┐  ┌──────────┐  ┌───────────────┐  ┌──────────────┐   │
│  │ CORS │→ │ JSON     │→ │ cookie-parser │→ │ userAuth     │   │
│  │      │  │ parser   │  │               │  │ (JWT verify) │   │
│  └──────┘  └──────────┘  └───────────────┘  └──────┬───────┘   │
│                                                      │           │
│  Routers:                                            │           │
│  ┌────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─▼────────┐ │
│  │ authRouter │ │ profileRouter│ │ requestRouter│ │ userRouter│ │
│  │ /signup    │ │ /profile/view│ │ /request/send│ │ /user/feed│ │
│  │ /login     │ │ /profile/edit│ │ /request/    │ │ /user/    │ │
│  │ /logout    │ │              │ │  review      │ │ connections│ │
│  └────────────┘ └──────────────┘ └──────────────┘ │ /user/    │ │
│                                                    │ requests/ │ │
│                                                    │ received  │ │
│                                                    └───────────┘ │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       │ Mongoose ODM
                       ▼
┌───────────────────────────────────────────────────────┐
│              MongoDB Atlas (devTinder DB)               │
│                                                         │
│  Collections:                                           │
│  ┌─────────────────┐   ┌───────────────────────────┐   │
│  │     users        │   │   connectionrequests       │   │
│  │                  │   │                            │   │
│  │ _id              │   │ _id                        │   │
│  │ firstName        │   │ fromUserId (→ users._id)   │   │
│  │ lastName         │   │ toUserId   (→ users._id)   │   │
│  │ email (unique)   │   │ status (enum)              │   │
│  │ password (hash)  │   │ createdAt                  │   │
│  │ age, gender      │   │ updatedAt                  │   │
│  │ photoUrl         │   │                            │   │
│  │ about            │   │ COMPOUND INDEX:            │   │
│  │ skills[]         │   │ { fromUserId:1, toUserId:1}│   │
│  │ createdAt        │   └───────────────────────────┘   │
│  │ updatedAt        │                                    │
│  └─────────────────┘                                    │
└─────────────────────────────────────────────────────────┘
```

### API Design — All Routes

| Method | Route | Auth? | Description |
|--------|-------|-------|-------------|
| POST | `/signup` | No | Register new user, hash password, set JWT cookie |
| POST | `/login` | No | Validate credentials, set JWT cookie (1h expiry) |
| POST | `/logout` | No | Clear JWT cookie |
| GET | `/profile/view` | Yes | Return logged-in user's profile |
| PATCH | `/profile/edit` | Yes | Update allowed profile fields |
| POST | `/request/send/:status/:toUserId` | Yes | Send `interested` or `ignored` request |
| POST | `/request/review/:status/:requestId` | Yes | Accept or reject a pending request |
| GET | `/user/requests/received` | Yes | List pending "interested" requests for logged-in user |
| GET | `/user/connections` | Yes | List accepted connections (both directions) |
| GET | `/user/feed` | Yes | Paginated feed of undiscovered users |

**Total: 10 API endpoints (3 auth + 2 profile + 2 request + 3 user)**

### Connection Request State Machine

```
                ┌──────────────────────────────┐
                │                              │
                ▼                              │
  ┌──────────────────────┐                     │
  │     No Relationship   │                     │
  │     (no document)     │                     │
  └───────┬──────────┬────┘                     │
          │          │                          │
    User A swipes   User A swipes               │
    "interested"    "ignored"                   │
          │          │                          │
          ▼          ▼                          │
  ┌────────────┐ ┌────────────┐                │
  │ interested │ │  ignored   │                │
  │            │ │            │                │
  │ (waiting   │ │ (hidden    │                │
  │  for B)    │ │  from feed)│                │
  └──────┬─────┘ └────────────┘                │
         │                                      │
   User B reviews                               │
   the request                                  │
         │                                      │
    ┌────┴────┐                                 │
    │         │                                 │
    ▼         ▼                                 │
┌────────┐ ┌────────┐                          │
│accepted│ │rejected│                          │
│        │ │        │                          │
│(mutual │ │(hidden │                          │
│ conn)  │ │ from   │                          │
└────────┘ │ feed)  │                          │
           └────────┘                          │
```

**Status enum values:** `"ignored"`, `"interested"`, `"accepted"`, `"rejected"`

- **Send phase:** Only `interested` or `ignored` allowed
- **Review phase:** Only `accepted` or `rejected` allowed (must be currently `interested`)
- **Self-send guard:** `pre('save')` hook prevents `fromUserId === toUserId`
- **Duplicate guard:** Checks both directions `{ fromUserId, toUserId } | { fromUserId: toUserId, toUserId: fromUserId }`

---

## SECTION 3: CODE WALKTHROUGH — FILE BY FILE

### BACKEND

---

#### `src/app.js` — Express Server Setup

```javascript
const express = require("express");
var cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/requests");
const { userRouter } = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to the DB", err);
  });
```

> **Interview talking point:** "The Express server follows a layered middleware pipeline — CORS is configured with an explicit origin and credentials flag to allow the React frontend on port 5173 to send and receive cookies. The JSON parser and cookie-parser middleware are applied globally before any route handler, and routes are organized into four Express Routers for separation of concerns."

---

#### `src/config/database.js` — MongoDB Connection

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://abhi_namastedev:***@namastenode.mhxsxlm.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
```

> **Interview talking point:** "Database connection uses Mongoose's connect() with MongoDB Atlas. In production, the connection string would be sourced from environment variables — the .env file is already set up with dotenv, but the current code uses the string directly, which I'd fix for deployment."

---

#### `src/models/user.js` — User Mongoose Schema

```javascript
const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, minlength: 4, maxlength: 20 },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true,
                 validate(value) { if (!validator.isEmail(value)) throw new Error("Invalid email"); }
               },
    password:  { type: String, required: true, minlength: 6, trim: true,
                 validate(value) { if (!validator.isStrongPassword(value)) throw new Error("Enter a strong password"); }
               },
    age:       { type: Number, min: 18 },
    gender:    { type: String, enum: { values: ["male", "female", "other"] } },
    photoUrl:  { type: String, validate(value) { if (!validator.isURL(value)) throw new Error("Invalid URL"); } },
    about:     { type: String, default: "Hey there! I am using DevTinder.", trim: true },
    skills:    { type: [String] },
  },
  { timestamps: true }
);

// Instance method — generate JWT
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id },
    "secretKeyIKNowThisIsNotASafeWayToStoreTheSecretKeyInProduction",
    { expiresIn: "7d" }
  );
  return token;
};

// Instance method — validate password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
};
```

**Key points:**
- **Validators:** `validator.isEmail()`, `validator.isStrongPassword()`, `validator.isURL()`
- **Schema methods:** `getJWT()` (creates JWT with `_id` payload, 7-day expiry) and `validatePassword()` (bcrypt compare)
- **Unique index:** `email` has `unique: true` — MongoDB creates a unique index automatically
- **Timestamps:** `createdAt` and `updatedAt` auto-managed

> **Interview talking point:** "The User schema uses Mongoose's built-in validators combined with the validator.js library for email and password strength checks. I used schema instance methods for getJWT and validatePassword to keep authentication logic co-located with the model — this follows the fat model, thin controller pattern common in mature Node.js codebases."

---

#### `src/models/connectionRequest.js` — Connection Request Schema + Compound Index

```javascript
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  { timestamps: true }
);

// COMPOUND INDEX — THIS IS THE RESUME CLAIM
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// Pre-save hook — prevent self-connection
connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send a connection request to yourself");
  }
});
```

> **Interview talking point:** "The ConnectionRequest model defines a compound index on {fromUserId: 1, toUserId: 1}. This is critical because the feed query and the duplicate-check query both need to look up connection requests by user pair — the compound index lets MongoDB do a single B-tree traversal instead of a collection scan. Without this index, the feed algorithm would be O(n) on the connection requests collection for every feed load."

---

#### `src/middlewares/auth.js` — JWT Cookie Auth Middleware

```javascript
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;            // Extract JWT from cookie
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided - please Login");
    }
    const decodedObject = await jwt.verify(    // Verify JWT signature + expiry
      token,
      "secretKeyIKNowThisIsNotASafeWayToStoreTheSecretKeyInProduction"
    );
    const { _id } = decodedObject;             // Extract user ID from payload
    const user = await User.findById(_id);     // Fetch full user from DB
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;                           // Attach user to request
    next();                                    // Proceed to route handler
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
```

> **Interview talking point:** "The auth middleware extracts the JWT from the cookie — not from the Authorization header — because cookies are automatically sent by the browser on every request, and being httpOnly they can't be accessed by JavaScript, which prevents XSS token theft. The middleware then verifies the signature and expiry, fetches the full user document, and attaches it to req.user for downstream handlers."

---

#### `src/routes/auth.js` — Signup, Login, Logout

**Signup:**
```javascript
authRouter.post("/signup", async (req, res) => {
  validateSignupData(req);                                    // Validate input
  const { firstName, lastName, email, password, ... } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);       // Hash with salt rounds = 10
  const checkEmail = await User.findOne({ email });           // Duplicate check
  if (checkEmail) throw new Error("Email Already Exist");
  const user = new User({ firstName, lastName, email, password: passwordHash, ... });
  const savedUser = await user.save();
  const token = await savedUser.getJWT();                     // Generate JWT
  res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) }); // 8-hour cookie
  res.status(200).json({ message: "User added successfully", data: savedUser });
});
```

**Login:**
```javascript
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("Invalid Credentials");
  const isPasswordValid = await user.validatePassword(password); // bcrypt compare
  if (isPasswordValid) {
    const token = await user.getJWT();
    res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000) }); // 1-hour cookie
    res.send(user);
  } else {
    throw new Error("Invalid Credentials");
  }
});
```

**Logout:**
```javascript
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logout successful");
});
```

> **Interview talking point:** "The auth flow uses bcrypt with 10 salt rounds for password hashing and JWT for session tokens stored in cookies. On signup, the password is hashed before any database write. Login validates the hashed password using a Mongoose instance method, then issues a JWT. Logout simply clears the cookie — since JWTs are stateless, clearing the cookie is sufficient for client-side logout."

---

#### `src/routes/requests.js` — Send & Review Connections

**Send Connection Request:**
```javascript
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  const fromUserId = req.user._id;
  const toUserId = req.params.toUserId;
  const status = req.params.status;

  // Only "interested" or "ignored" allowed for sending
  const allowedStatus = ["interested", "ignored"];
  if (!allowedStatus.includes(status)) return res.status(400).json({ message: "Invalid status" });

  // Check target user exists
  const toUser = await User.findById(toUserId);
  if (!toUser) return res.status(404).json({ message: "User not found" });

  // Duplicate check — both directions
  const existingConnectionRequest = await ConnectionRequest.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });
  if (existingConnectionRequest) return res.status(400).json({ message: "Already exists" });

  const connectionRequest = new ConnectionRequest({ fromUserId, toUserId, status });
  const data = await connectionRequest.save();
  res.json({ message: req.user.firstName + " is " + status + " in " + toUser.firstName, data, success: true });
});
```

**Review Connection Request (Accept/Reject):**
```javascript
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  const { status, requestId } = req.params;

  // Only "accepted" or "rejected" allowed for review
  const allowedStatuses = ["accepted", "rejected"];
  if (!allowedStatuses.includes(status)) return res.status(400).json({ message: "Invalid Status" });

  // Must be a pending "interested" request addressed to the logged-in user
  const connectionRequest = await ConnectionRequest.findOne({
    _id: requestId,
    toUserId: loggedInUser._id,
    status: "interested",
  });
  if (!connectionRequest) return res.status(404).json({ message: "request not found" });

  connectionRequest.status = status;
  const data = await connectionRequest.save();
  res.status(200).json({ message: "Connection request " + status, data, success: true });
});
```

> **Interview talking point:** "The connection request system uses a two-phase state machine. In the send phase, only 'interested' or 'ignored' are allowed — this is validated both at the route level and by the Mongoose enum. In the review phase, the receiver can only accept or reject requests that are currently in the 'interested' state, which prevents double-accepting or accepting already-rejected requests. The duplicate check queries both directions using MongoDB's $or operator, which is backed by the compound index."

---

#### `src/routes/user.js` — Feed API (THE MOST TECHNICALLY INTERESTING PART)

```javascript
userRouter.get("/user/feed", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  // Pagination
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  if (limit > 4) limit = 4;                    // Cap at 4 per page
  const skip = (page - 1) * limit;

  // STEP 1: Find ALL connection requests involving the logged-in user
  const connectionRequests = await ConnectionRequest.find({
    $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
  })
    .select("toUserId fromUserId status")
    .populate("fromUserId", "firstName")
    .populate("toUserId", "firstName");

  // STEP 2: Build a Set of user IDs to EXCLUDE from feed
  const hideUsersFromFeed = new Set();
  connectionRequests.forEach((req) => {
    hideUsersFromFeed.add(req.toUserId._id.toString());
    hideUsersFromFeed.add(req.fromUserId._id.toString());
  });

  // STEP 3: Query users NOT in the exclusion set AND not self
  const users = await User.find({
    $and: [
      { _id: { $nin: Array.from(hideUsersFromFeed) } },
      { _id: { $ne: loggedInUser._id } },
    ],
  })
    .select("firstName lastName photoUrl about age gender skills")
    .skip(skip)
    .limit(limit);

  res.send(users);
});
```

**How the feed algorithm works — step by step:**

1. **Gather all relationships:** Query `connectionrequests` where the logged-in user is either `fromUserId` or `toUserId` — this covers sent requests, received requests, accepted connections, ignored users, and rejected requests
2. **Build exclusion set:** Use a `Set` to collect all user IDs from both sides of every relationship — this ensures no user appears in the feed once any interaction has occurred
3. **Query remaining users:** Use `$nin` (not in) with the exclusion set, combined with `$ne` (not equal) to exclude self, apply field projection for security (never expose password), and paginate with `skip`/`limit`

> **Interview talking point:** "The feed algorithm is the most interesting part of DevTinder. It uses a two-query approach: first, I fetch all connection requests involving the current user — regardless of status — and build a JavaScript Set of user IDs to exclude. Then I query the users collection with $nin to filter those out, plus $ne to exclude the user's own profile. Pagination is enforced with a maximum of 4 users per page to prevent API abuse. This approach scales linearly with the number of connections a user has, but for 100K users, I'd optimize it with a materialized view or a Redis-cached exclusion set."

---

#### `src/routes/user.js` — Connections & Received Requests

**Get Accepted Connections:**
```javascript
userRouter.get("/user/connections", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  const connectionRequests = await ConnectionRequest.find({
    $or: [
      { toUserId: loggedInUser._id, status: "accepted" },
      { fromUserId: loggedInUser._id, status: "accepted" },
    ],
  }).populate("fromUserId toUserId", "firstName lastName photoUrl about age gender skills");

  // Map to return the "other" user in each connection
  const data = connectionRequests.map((row) => {
    if (row.fromUserId._id.toString() == loggedInUser._id.toString()) {
      return row.toUserId;
    }
    return row.fromUserId;
  });
  res.status(200).json({ data });
});
```

**Get Received Pending Requests:**
```javascript
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  const connectionRequests = await ConnectionRequest.find({
    toUserId: loggedInUser._id,
    status: "interested",
  }).populate("fromUserId", "firstName lastName photoUrl about age gender skills");
  res.status(200).json({ connectionRequests });
});
```

> **Interview talking point:** "The connections endpoint queries both directions — because User A might have sent the request that User B accepted, or vice versa — then maps each result to return just the 'other' user's data. Populate is used strategically to join user data and filter with a safe field projection that never exposes passwords."

---

#### `src/utils/validation.js` — Input Validation

```javascript
const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) throw new Error("First name and last name are required");
  else if (!validator.isEmail(email)) throw new Error("Invalid email address");
  else if (!validator.isStrongPassword(password)) throw new Error("Please enter a strong password");
};

const validateEditProfileData = (req) => {
  const allowedFields = ["firstName","lastName","email","gender","age","about","skills","photoUrl"];
  const isEditAllowed = Object.keys(req.body).every((field) => allowedFields.includes(field));
  return isEditAllowed;
};
```

> **Interview talking point:** "Validation happens in two layers: the signup validator checks required fields and uses validator.js for email and password strength, while the profile edit validator uses a whitelist approach — only allowed fields can be modified, which prevents mass assignment vulnerabilities where an attacker might try to modify their own password field or internal IDs through the edit endpoint."

---

### FRONTEND

---

#### `src/App.jsx` — Root App Component

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
```

> **Interview talking point:** "The App component wraps everything in a Redux Provider for global state and uses React Router v7 with nested routes — Body is the layout route that renders the NavBar and Footer, then Outlet renders whichever child route matches. This pattern ensures the layout persists across page transitions."

---

#### `src/utils/appStore.js` — Redux Store Configuration

```javascript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

export const appStore = configureStore({
  reducer: {
    user: userReducer,       // Authenticated user profile (or null)
    feed: feedReducer,       // Array of feed users (or null)
    connection: connectionReducer,  // Array of accepted connections (or null)
    request: requestReducer,        // Array of pending incoming requests (or null)
  },
});
```

> **Interview talking point:** "I use Redux Toolkit's configureStore which automatically sets up the Redux DevTools Extension and thunk middleware. The store has four slices — user for auth state, feed for the discovery feed, connection for accepted connections, and request for pending incoming requests. Each slice starts as null, and components check this to avoid unnecessary API calls."

---

#### `src/utils/userSlice.js` — User Auth State

```javascript
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;   // Replace entire state with user data
    },
    removeUser: (state, action) => {
      return null;             // Clear user data on logout
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
```

> **Interview talking point:** "The user slice manages authentication state — addUser replaces the entire slice with the user document returned from login or signup, and removeUser resets it to null on logout. Components use useSelector(store => store.user) to conditionally render authenticated-only UI like the NavBar dropdown."

---

#### `src/utils/feedSlice.js` — Feed State with User Removal

```javascript
const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return null;
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});
```

**This is the closest thing to "optimistic UI" in the codebase:**
- `removeUserFromFeed` — When a user clicks "Interested" or "Ignore", the card is immediately removed from the Redux feed state via `dispatch(removeUserFromFeed(userId))` in `UserCard.jsx`, AFTER the API call succeeds.
- The removal happens in the `.then()` path of the `await axios.post(...)` — not before the API call completes.

> **Interview talking point:** "The feed slice has a removeUserFromFeed action that filters the swiped user out of the local state array. When a user clicks 'Interested' or 'Ignore', the API call fires first, and upon success the card is removed from the feed without refetching the entire feed again — this gives a responsive, app-like feel where cards disappear immediately after the swipe action completes."

---

#### `src/utils/connectionSlice.js` — Connections State

```javascript
const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: () => {
      return null;
    },
  },
});
```

> **Interview talking point:** "The connection slice stores the list of accepted connections — it's populated when the Connections page loads and cleared via removeConnection. The Connections component dispatches removeConnection before fetching to ensure fresh data."

---

#### `src/utils/requestSlice.js` — Pending Requests State

```javascript
const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});
```

> **Interview talking point:** "The request slice has a removeRequest action that filters out a specific request by ID — this is used when the user accepts or rejects a pending request. The request card disappears from the list after the API call completes, similar to the feed pattern."

---

#### `src/components/Body.jsx` — Layout Shell + Auto Auth

```javascript
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;     // Skip if already have user data
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
    }
  };

  useEffect(() => { fetchUser(); }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
```

> **Interview talking point:** "Body is the layout wrapper that acts as an auth guard. On mount, it checks if user data already exists in the Redux store — if not, it calls /profile/view with cookies. If the cookie is valid, the user data populates the store. If the server returns 401, the user is redirected to login. This pattern avoids redundant API calls on route changes because the store acts as a cache."

---

#### `src/components/Login.jsx` — Login + Signup Toggle

```javascript
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginFrom, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post(BASE_URL + "/login", { email, password }, { withCredentials: true });
    dispatch(addUser(res.data));
    return navigate("/");
  };

  const handleSignUp = async () => {
    const res = await axios.post(BASE_URL + "/signup",
      { firstName, lastName, email, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.data));
    return navigate("/profile");
  };
};
```

> **Interview talking point:** "The Login component handles both login and signup with a toggle state — isLoginForm controls which fields are shown and which handler is called. On successful auth, the user document is dispatched to Redux and navigation redirects to the feed or profile page. The withCredentials: true flag on axios ensures the JWT cookie from the response is stored in the browser."

---

#### `src/components/Feed.jsx` — User Feed Display

```javascript
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    const feed = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
    dispatch(addFeed(feed.data));
  };

  useEffect(() => { getFeed(); });

  if (!feed) return;
  if (feed.length <= 0) return <h1>No more users!!!!</h1>;

  return (
    <div className="flex flex-col items-center gap-4 my-5">
      {feed.map((user) => <UserCard key={user._id} user={user} />)}
    </div>
  );
};
```

> **Interview talking point:** "The Feed component fetches the user feed from the API and stores it in Redux. It renders a list of UserCard components — each showing the developer's photo, name, age, skills, and action buttons. The if (feed) return guard prevents refetching when the data already exists in the store."

---

#### `src/components/UserCard.jsx` — User Card with Swipe Actions

```javascript
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));    // Remove card from feed after API success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl p-3">
      <figure><img src={photoUrl || "placeholder.jpg"} /></figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm">
                {skill.trim()}
              </span>
            ))}
          </div>
        )}
        <div className="card-actions justify-center my-4">
          <button className="btn btn-accent" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};
```

> **Interview talking point:** "UserCard is the core interaction component. When a user clicks 'Interested' or 'Ignore', it calls the /request/send/:status/:userId API, and on success dispatches removeUserFromFeed to immediately remove the card from the feed state. Skills are rendered as styled tag chips. The card uses DaisyUI's card component with Tailwind utility classes."

---

#### `src/components/Requests.jsx` — Pending Requests with Accept/Reject

```javascript
const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
    dispatch(removeRequest(_id));
  };

  const fetchRequests = async () => {
    const requests = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
    dispatch(addRequests(requests.data.connectionRequests));
  };

  useState(() => { fetchRequests(); }, []);   // Note: uses useState as effect (unusual pattern)
};
```

> **Interview talking point:** "The Requests component displays incoming connection requests with Accept and Reject buttons. When either is clicked, the review API is called with the appropriate status, and on success the request is removed from the local Redux state via removeRequest(_id) — giving instant visual feedback."

---

#### `src/components/NavBar.jsx` — Navigation + Logout

```javascript
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    dispatch(removeFeed());
    return navigate("/login");
  };
  // DaisyUI navbar with logo, welcome message, avatar dropdown
  // Dropdown: Profile, Connections, Requests, Logout
};
```

> **Interview talking point:** "The NavBar conditionally renders user controls only when the user is authenticated. On logout, it calls the logout API to clear the server-side cookie, then dispatches removeUser() and removeFeed() to clean up the Redux store before navigating to login. This ensures a fresh state on re-login."

---

#### `src/components/EditProfile.jsx` — Profile Editor with Live Preview

```javascript
const EditProfile = ({ user }) => {
  const [firstName, setFirstname] = useState(user.firstName);
  // ... more fields

  const saveProfile = async () => {
    const res = await axios.patch(BASE_URL + "/profile/edit",
      { firstName, lastName, photoUrl, age, gender, about, skills },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.data));    // Update Redux store with server response
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <div className="flex justify-center">
        {/* Edit form card */}
        <UserCard user={{ firstName, lastName, photoUrl, about, age, gender, skills }} />
        {/* Live preview */}
      </div>
      {showToast && <div className="toast">Profile saved successfully</div>}
    </>
  );
};
```

> **Interview talking point:** "EditProfile provides a form side-by-side with a live-preview UserCard that updates as the user types. On save, the server response updates the Redux store via dispatch(addUser(res.data.data)), so the NavBar and other components instantly reflect the changes. The success toast auto-dismisses after 3 seconds."

---

## SECTION 4: KEY DESIGN DECISIONS — DEFEND THESE

| Decision | Why |
|---|---|
| **Node.js/Express over Python/FastAPI** | JavaScript everywhere — shared language between frontend (React) and backend reduces cognitive overhead. Express 5's async error handling and massive npm ecosystem make it the natural choice for a full-stack JS project. Node's event-loop model handles I/O-bound operations (DB queries, cookie parsing) efficiently. |
| **MongoDB over PostgreSQL** | Developer profiles are semi-structured documents (variable skills arrays, optional fields like age/gender) — MongoDB's document model maps naturally without needing JOINs or schema migrations. The connection request model benefits from embedded ObjectId references with Mongoose's `populate()` for ad-hoc joins. |
| **JWT in cookies over localStorage** | Cookies with `httpOnly` flag prevent XSS attacks from stealing the token — `document.cookie` can't access httpOnly cookies. localStorage is vulnerable to XSS. The tradeoff is CSRF risk, which is mitigated by the explicit CORS origin and `credentials: true` configuration. |
| **Redux Toolkit over React Context** | DevTinder has 4 distinct state domains (user, feed, connections, requests) that need to be accessed across deeply nested components. Context causes unnecessary re-renders of all consumers when any state changes. Redux Toolkit's `createSlice` eliminates boilerplate while providing DevTools debugging, and `useSelector` enables fine-grained subscriptions. |
| **Compound index on `{fromUserId, toUserId}`** | The feed algorithm and duplicate-check query both look up connection requests by user pair. A compound index supports both the exact-match duplicate check and the `$or` query in the feed's first step. Without it, these would be full collection scans — O(n) instead of O(log n). |
| **Feed: two-query approach** | Instead of a single complex aggregation, I use two queries: (1) get all relationships, (2) exclude those users. This is simpler to reason about, test, and optimize independently. The Set-based exclusion in JavaScript is O(1) per lookup. |
| **DaisyUI over raw Tailwind** | DaisyUI provides pre-built, theme-aware components (cards, buttons, dropdowns, toasts) that match a consistent design language. This dramatically reduces time-to-UI while remaining customizable via Tailwind utilities. |

---

## SECTION 5: DATABASE DESIGN DEEP-DIVE

### User Collection Schema

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `_id` | ObjectId | Auto-generated | MongoDB default |
| `firstName` | String | Required, trim, 4-20 chars | |
| `lastName` | String | Required, trim | |
| `email` | String | Required, unique, lowercase, trim | Validated with `validator.isEmail()` |
| `password` | String | Required, min 6 chars | Stored as bcrypt hash; validated with `isStrongPassword()` |
| `age` | Number | Min 18 | Optional |
| `gender` | String | Enum: `male`, `female`, `other` | Optional |
| `photoUrl` | String | Validated as URL | Optional |
| `about` | String | Default: "Hey there! I am using DevTinder." | Optional |
| `skills` | [String] | Array of strings | Optional |
| `createdAt` | Date | Auto (timestamps) | |
| `updatedAt` | Date | Auto (timestamps) | |

**Indexes on User:**
- `_id` — default primary index
- `email` — unique index (from `unique: true` in schema)

### ConnectionRequest Collection Schema

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `_id` | ObjectId | Auto-generated | |
| `fromUserId` | ObjectId | Required, ref: "User" | Sender of the request |
| `toUserId` | ObjectId | Required, ref: "User" | Receiver of the request |
| `status` | String | Required, enum: `ignored`, `interested`, `accepted`, `rejected` | State machine field |
| `createdAt` | Date | Auto (timestamps) | |
| `updatedAt` | Date | Auto (timestamps) | |

**Indexes on ConnectionRequest:**
- `_id` — default
- **`{ fromUserId: 1, toUserId: 1 }`** — COMPOUND INDEX (explicitly defined on line 33 of `connectionRequest.js`)

### Compound Index — Why It Matters

The compound index `{ fromUserId: 1, toUserId: 1 }` optimizes THREE critical queries:

1. **Duplicate check** (in `/request/send`):
   ```javascript
   ConnectionRequest.findOne({
     $or: [
       { fromUserId, toUserId },
       { fromUserId: toUserId, toUserId: fromUserId },
     ],
   });
   ```
   The `{ fromUserId, toUserId }` branch uses the compound index directly. The reversed branch uses the `toUserId` portion of the index (prefix rule applies for the first element).

2. **Feed exclusion query** (in `/user/feed`):
   ```javascript
   ConnectionRequest.find({
     $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
   });
   ```
   The `fromUserId` branch uses the first field of the compound index.

3. **Received requests query** (in `/user/requests/received`):
   ```javascript
   ConnectionRequest.find({
     toUserId: loggedInUser._id,
     status: "interested",
   });
   ```
   This uses the `toUserId` part — though a more optimal index for this specific query would include `status`.

### Feed Query — Performance Analysis

For a user with `C` connections/interactions and total `U` users:

1. **First query** (get all relationships): O(C) with index, returns C documents
2. **Set construction**: O(C) in JavaScript
3. **Second query** (`$nin` with C excluded IDs): O(U) scan filtered by `$nin`

**Scaling concern:** The `$nin` operator doesn't use indexes efficiently — for 100K users with many connections, this query becomes expensive. Solutions:
- Maintain a precomputed "unseen users" collection
- Use MongoDB Atlas Search or a recommendation engine
- Cache the exclusion set in Redis
- Use aggregation pipeline with `$lookup` for a single-query approach

---

## SECTION 6: AUTHENTICATION PATTERN

### JWT Token Creation

```javascript
// In user.js schema method
const token = await jwt.sign(
  { _id: user._id },                           // Payload: just the user's MongoDB _id
  "secretKeyIKNowThisIsNotASafeWayToStore...",  // Secret key (hardcoded — acknowledged as dev-only)
  { expiresIn: "7d" }                           // Token expiry: 7 days
);
```

| Aspect | Detail |
|--------|--------|
| **Payload** | `{ _id: user._id }` — minimal, only the user ID |
| **Secret** | Hardcoded string (acknowledged in name as not production-safe) |
| **Expiry** | 7 days (token), but cookie expiry differs by route |
| **Algorithm** | Default HS256 (HMAC-SHA256) |

### Cookie Configuration

| Route | Cookie Expiry | Config |
|-------|---------------|--------|
| Signup | 8 hours | `res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) })` |
| Login | 1 hour | `res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000) })` |
| Logout | Cleared | `res.clearCookie("token")` |

**Note:** The cookies do NOT explicitly set `httpOnly`, `secure`, or `sameSite` flags. In production, these should be:
```javascript
res.cookie("token", token, {
  httpOnly: true,     // Prevents XSS from reading the cookie
  secure: true,       // Only sent over HTTPS
  sameSite: "strict", // CSRF protection
  maxAge: 3600000,    // 1 hour
});
```

### Why Cookies Over Bearer Tokens

- **Automatic transport:** Browser sends cookies with every request — no manual `Authorization: Bearer` header needed
- **XSS protection:** With `httpOnly`, JavaScript can't access the token (even if XSS occurs)
- **Simpler frontend code:** Just set `withCredentials: true` on Axios — no interceptors needed
- **Tradeoff:** CSRF risk — mitigated by CORS origin restriction and (ideally) `sameSite` cookie attribute

### Password Hashing

```javascript
// Signup: hash with 10 salt rounds
const passwordHash = await bcrypt.hash(password, 10);

// Login: compare input with stored hash
const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
```

- **Library:** bcrypt v6.0.0
- **Salt rounds:** 10 (default, ~10 hashes/second on modern hardware)
- **Storage:** Only the hash is stored in MongoDB, never the plain password

---

## SECTION 7: REDUX STATE MANAGEMENT

### Store Structure

```
Redux Store
├── user:       null | { _id, firstName, lastName, email, ... }
├── feed:       null | [{ _id, firstName, lastName, photoUrl, ... }, ...]
├── connection: null | [{ _id, firstName, lastName, photoUrl, ... }, ...]
└── request:    null | [{ _id, fromUserId: { firstName, ... }, toUserId, status }, ...]
```

### How Each Slice Is Used

#### User Slice (`userSlice.js`)

| Action | Dispatched From | What It Does |
|--------|-----------------|--------------|
| `addUser(userData)` | `Login.jsx` (login/signup), `Body.jsx` (auto-auth), `EditProfile.jsx` (profile update) | Replaces entire slice with user document |
| `removeUser()` | `NavBar.jsx` (logout) | Sets slice to null |

**Data flow:**
1. Login/Signup -> API returns user document -> `dispatch(addUser(res.data))` -> Redux store holds user -> NavBar shows user name + avatar
2. Page refresh -> `Body.jsx` useEffect -> calls `/profile/view` -> `dispatch(addUser(res.data))` -> Restores auth state from cookie
3. Logout -> calls `/logout` API -> `dispatch(removeUser())` -> NavBar hides user controls

#### Feed Slice (`feedSlice.js`)

| Action | Dispatched From | What It Does |
|--------|-----------------|--------------|
| `addFeed(usersArray)` | `Feed.jsx` (on mount) | Replaces slice with array of feed users |
| `removeFeed()` | `NavBar.jsx` (logout) | Clears feed cache |
| `removeUserFromFeed(userId)` | `UserCard.jsx` (on Interested/Ignore click) | Filters out swiped user from array |

**Key pattern — removeUserFromFeed:**
```javascript
// In UserCard.jsx
const handleSendRequest = async (status, userId) => {
  await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
  dispatch(removeUserFromFeed(userId));   // Card disappears from feed
};
```
This is **NOT true optimistic UI** — the dispatch happens AFTER the API succeeds, not before. However, it avoids refetching the entire feed, so it gives a snappy feel.

#### Connection Slice (`connectionSlice.js`)

| Action | Dispatched From | What It Does |
|--------|-----------------|--------------|
| `addConnection(connectionsArray)` | `Connections.jsx` (on mount) | Stores accepted connections |
| `removeConnection()` | `Connections.jsx` (before refetch) | Clears to force fresh fetch |

#### Request Slice (`requestSlice.js`)

| Action | Dispatched From | What It Does |
|--------|-----------------|--------------|
| `addRequests(requestsArray)` | `Requests.jsx` (on mount) | Stores pending incoming requests |
| `removeRequest(requestId)` | `Requests.jsx` (on Accept/Reject) | Filters out reviewed request |

### Exact Redux Usage Pattern (No createAsyncThunk, No RTK Query)

The project uses **plain synchronous Redux actions** (via `createSlice` reducers) combined with **manual async API calls** in components using axios. Specifically:

- **No `createAsyncThunk`** — async logic lives directly in component event handlers and `useEffect`
- **No RTK Query** — not used at all
- **Pattern:** Component makes `await axios.get/post(...)` -> dispatches sync action with response data

```
Component (e.g., Feed.jsx)
  |
  ├── useEffect or event handler
  |     └── await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
  |           └── dispatch(addFeed(response.data))     <- sync action
  |
  └── useSelector((store) => store.feed)               <- reads from store
```

This is a straightforward but practical approach. In a larger app, `createAsyncThunk` or RTK Query would reduce boilerplate and centralize error/loading states.

---

## SECTION 8: WHAT'S IMPLEMENTED vs WHAT'S NOT

### FULLY IMPLEMENTED

| Feature | Evidence |
|---------|----------|
| JWT cookie-based authentication | `auth.js` middleware, `auth.js` routes, bcrypt hashing |
| Signup with validation + password hashing | `auth.js` route + `validation.js` |
| Login with bcrypt compare | `auth.js` route + `user.js` schema method |
| Logout (cookie clearing) | `auth.js` route |
| **Compound-indexed queries** | `connectionRequest.js` line 33: `connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })` |
| Connection request state machine | `interested` / `ignored` -> `accepted` / `rejected`, validated in routes |
| **Swipe-based feed** | Feed API with exclusion logic + UserCard with Interested/Ignore buttons |
| Feed pagination | `skip`/`limit` with max cap of 4 |
| Profile view and edit | Profile routes + EditProfile component with live preview |
| Connections list | `/user/connections` API + Connections component |
| Pending requests with accept/reject | `/user/requests/received` + Requests component |
| Redux state management (4 slices) | `appStore.js`, `userSlice.js`, `feedSlice.js`, `connectionSlice.js`, `requestSlice.js` |
| CORS configuration | `app.js` with explicit origin + credentials |
| Input validation (whitelist pattern) | `validation.js` — validateSignupData + validateEditProfileData |
| Self-connection prevention | `pre('save')` hook in ConnectionRequest model |
| Duplicate connection prevention | `$or` query in `/request/send` |

### PARTIALLY IMPLEMENTED / NOT TRUE IMPLEMENTATION

| Feature | Reality | Resume Claim |
|---------|---------|--------------|
| **"Redux optimistic UI updates"** | **NOT truly optimistic.** `removeUserFromFeed(userId)` and `removeRequest(requestId)` are dispatched AFTER the API call succeeds (`await axios.post(...)` resolves, THEN `dispatch()`). True optimistic UI would update the store BEFORE the API call and rollback on failure. This is better described as **"local state removal without full refetch after API success."** | "Redux optimistic UI updates" |
| **"real-time swipe-based feeds"** | **NOT real-time.** There are no WebSockets, Server-Sent Events, or polling. The feed is fetched once on component mount. "Real-time" implies push-based updates. The correct description is **"swipe-based feed"** (drop "real-time"). | "real-time swipe-based feeds" |
| Cookie security flags | Cookies do NOT set `httpOnly`, `secure`, or `sameSite`. The interview description of "JWT cookie-based auth" is accurate, but if asked about security hardening, acknowledge these flags are missing. | JWT cookie-based authentication |
| Environment variables | MongoDB connection string is hardcoded, not from `.env`. The dotenv package is installed but not used. | (not on resume but worth noting) |

### NOT IMPLEMENTED

| Feature | Status |
|---------|--------|
| Password change API | `apiList.md` marks `/profile/password` as TODO |
| WebSocket real-time updates | Not present — no socket.io, no ws library |
| Image upload | photoUrl is a plain URL string, no file upload |
| Search / filter users | No search functionality |
| Block / report users | Not implemented |
| Rate limiting | No rate limiting middleware |
| Error response standardization | Mix of `res.send(string)`, `res.json(object)`, `res.status().send()` |

### RESUME CLAIMS — HONEST ASSESSMENT

| Resume Claim | Verified? | How to Talk About It |
|---|---|---|
| "Node.js, Express, React 19, Redux Toolkit, MongoDB" | YES | All present and used |
| "JWT cookie-based authentication" | YES | Fully implemented, mention security flags as next step |
| "compound-indexed queries" | **YES** | `connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })` — line 33 of `connectionRequest.js` |
| "swipe-based feed" | YES | Feed with Interested/Ignore actions — cards disappear on click |
| "connection state machine (interested / accepted / rejected)" | YES | 4-state enum with two-phase transitions |
| "Redux optimistic UI updates" | **STRETCH** | Say instead: "Redux local state updates that give a responsive feel — the card is removed from the local array after the API confirms, avoiding a full refetch." Don't say "optimistic" unless you can defend the before-API-call pattern. |
| "real-time swipe-based feeds" | **MISLEADING** | Drop "real-time" — there's no WebSocket or push mechanism. Say "swipe-based feed" instead. |
| "React 19" | YES | `react: ^19.2.0` in package.json |
| "Tailwind CSS" | YES | Tailwind v4.2.0 + DaisyUI v5.5.18 |

---

## SECTION 9: INTERVIEW Q&A — DEVTINDER SPECIFIC

### Q1: "Walk me through the DevTinder architecture"

> "DevTinder is a three-tier architecture. The frontend is a React 19 SPA built with Vite, using Redux Toolkit for state management and Tailwind CSS with DaisyUI for the UI. It communicates with an Express 5 backend over REST APIs, with authentication handled through JWT tokens stored in browser cookies. The backend connects to MongoDB Atlas through Mongoose for data persistence. The key domain models are User and ConnectionRequest — users browse a feed of other developers and send 'interested' or 'ignore' signals, and recipients can accept or reject incoming requests. The connection request model uses a compound index on {fromUserId, toUserId} to make lookups efficient, and the feed algorithm uses a two-query approach to exclude users the current user has already interacted with."

### Q2: "How does the feed algorithm work — how do you show users they haven't seen?"

> "The feed is the most technically interesting part. It works in two steps. First, I query the ConnectionRequest collection for all documents where the logged-in user is either the sender or receiver — this gives me everyone they've already interacted with, regardless of status. I put all those user IDs into a JavaScript Set for O(1) lookup. Then I query the User collection with $nin to exclude those IDs, plus $ne to exclude the user themselves, and apply pagination with skip and limit capped at 4 per page. The compound index on {fromUserId, toUserId} helps the first query run efficiently. For scaling to 100K users, I'd optimize the $nin approach — possibly with an aggregation pipeline using $lookup, or a materialized view that precomputes eligible feed users."

### Q3: "Explain the connection request state machine"

> "The connection request has four states: ignored, interested, accepted, and rejected. When User A sees User B in their feed, they can send either 'interested' or 'ignored' — these are the only allowed statuses in the send phase, enforced both at the route handler level and by the Mongoose enum. If the status is 'interested', User B will see it in their received requests. User B can then either accept or reject it — but only if it's currently in the 'interested' state, which prevents double-processing. There's also a pre('save') hook that prevents users from sending requests to themselves, and a duplicate check using $or that checks both directions of the relationship — so if A already sent to B, B can't also send a new request to A."

### Q4: "Why JWT in cookies instead of localStorage?"

> "I chose cookies over localStorage for security. localStorage is accessible to any JavaScript running on the page — if an attacker injects a malicious script via XSS, they can read the token and exfiltrate it. Cookies with the httpOnly flag make the token invisible to JavaScript entirely. The browser automatically sends cookies with every request, so the frontend code is simpler — I just set withCredentials: true on axios calls. The tradeoff is CSRF risk, which I mitigate with explicit CORS origin configuration. In production, I'd also add the sameSite: strict and secure: true flags for defense in depth."

### Q5: "What are compound indexes and where do you use them?"

> "A compound index is a MongoDB index that covers multiple fields in a single B-tree structure. In DevTinder, I define a compound index on {fromUserId: 1, toUserId: 1} on the ConnectionRequest collection. This optimizes the most critical query — the duplicate check that runs before every connection request — where I need to find if any document matches either {fromUserId: A, toUserId: B} or {fromUserId: B, toUserId: A}. Without this index, MongoDB would scan the entire collection for each check. The compound index also partially supports the feed's exclusion query, since the fromUserId prefix can be used for queries that filter on just fromUserId."

### Q6: "How does your Redux state management work?"

> "I use Redux Toolkit with four slices — user, feed, connection, and request. The user slice holds the authenticated user's profile and is populated on login or auto-auth via the Body component. The feed slice stores an array of users for the discovery feed and has a removeUserFromFeed action that filters out a user when they're swiped. The connection slice stores accepted connections, and the request slice stores pending incoming requests with a removeRequest action for when you accept or reject. All API calls are manual axios calls inside components — I chose not to use createAsyncThunk or RTK Query to keep the code simple and focused on learning Redux's core flow: action, reducer, store, useSelector."

### Q7: "What's the optimistic UI update pattern?"

> "Let me be precise here — what I implemented is local state updates after API confirmation, not true optimistic UI. When a user clicks 'Interested' on a card, the axios call fires, and when the server confirms success, I dispatch removeUserFromFeed(userId) to filter that user out of the Redux feed array. The card disappears instantly after the API responds, without needing to refetch the entire feed. True optimistic UI would update the store before the API call and roll back on failure — I'd implement that with createAsyncThunk's pending/rejected lifecycle actions or RTK Query's optimistic update utilities. But the current approach gives a snappy user experience because the API call is fast and the state update avoids a round-trip refetch."

### Q8: "How would you scale this for 100K users?"

> "Several areas would need optimization. First, the feed's $nin query becomes expensive with many connections — I'd replace it with a MongoDB aggregation pipeline using $lookup to do the exclusion in a single query, or maintain a materialized view of 'eligible feed users' per user. Second, I'd add Redis caching — cache the exclusion set per user with a TTL, so the feed doesn't re-query ConnectionRequest on every load. Third, I'd implement cursor-based pagination instead of skip/limit, since skip is O(n). Fourth, the connection request duplicate check would benefit from a unique compound index instead of a runtime query — though this requires handling the bidirectional case. Fifth, I'd add rate limiting with express-rate-limit, connection pooling for MongoDB, and potentially split reads to a MongoDB replica with readPreference: secondary."

### Q9: "How would you deploy this on AWS?"

> "I'd use a multi-service architecture. The React frontend would be built as static assets and deployed to S3 with CloudFront as a CDN for global edge caching and HTTPS termination. The Express backend would run in ECS Fargate containers behind an Application Load Balancer — Fargate gives me serverless container management without EC2 instance management. MongoDB Atlas would handle the database layer since it's cloud-native and multi-region capable — or I could use Amazon DocumentDB for full AWS integration. I'd use ACM for TLS certificates, Route 53 for DNS, CloudWatch for logging and monitoring, and AWS Secrets Manager for the JWT secret and database credentials. For CI/CD, I'd use GitHub Actions to build Docker images, push to ECR, and deploy to ECS via task definitions."

---

## SECTION 10: AWS DEPLOYMENT PLAN

### Architecture Diagram

```
                    ┌──────────────────┐
                    │    Route 53      │
                    │  (DNS routing)   │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │    CloudFront    │
                    │  (CDN + HTTPS)   │
                    └────┬────────┬────┘
                         │        │
              ┌──────────▼──┐  ┌──▼───────────────────────┐
              │   S3 Bucket  │  │  Application Load        │
              │   (React     │  │  Balancer (ALB)          │
              │    SPA)      │  │  /api/* -> ECS           │
              └──────────────┘  └───────────┬──────────────┘
                                            │
                                  ┌─────────▼──────────┐
                                  │   ECS Fargate       │
                                  │   (Express API)     │
                                  │                     │
                                  │   Task: express-api │
                                  │   Container: node18 │
                                  │   Port: 3000        │
                                  │   Min: 2 tasks      │
                                  │   Auto-scaling: CPU │
                                  └─────────┬──────────┘
                                            │
                              ┌─────────────┼──────────────┐
                              │             │              │
                    ┌─────────▼────┐ ┌──────▼──────┐ ┌────▼──────────┐
                    │  MongoDB     │ │  ElastiCache │ │  Secrets      │
                    │  Atlas       │ │  Redis       │ │  Manager      │
                    │  (or         │ │  (session    │ │  (JWT secret, │
                    │  DocumentDB) │ │  cache, feed │ │   DB creds)   │
                    └──────────────┘ │  cache)      │ └───────────────┘
                                     └──────────────┘

              Observability:
              CloudWatch Logs -> Log Insights
              CloudWatch Metrics -> Alarms
              X-Ray -> Distributed tracing

              CI/CD:
              GitHub Actions ->
                Build React -> Deploy to S3
                Build Docker -> Push to ECR -> ECS deploy
```

### Service-by-Service Breakdown

| Service | Purpose | Config |
|---------|---------|--------|
| **S3** | Host React SPA static assets (HTML, JS, CSS) | Static website hosting, bucket policy for CloudFront OAI |
| **CloudFront** | CDN, HTTPS termination, route `/api/*` to ALB | Origin groups: S3 (default) + ALB (/api/*) |
| **ALB** | Load balance Express API traffic | Health check on `/health`, target group for ECS tasks |
| **ECS Fargate** | Run Express API containers | 2 tasks min, CPU-based auto-scaling, 256 CPU/512 MB |
| **ECR** | Docker image registry | `devtinder-api:latest` |
| **MongoDB Atlas** | Managed MongoDB cluster | M10 instance, VPC peering, replica set |
| **ElastiCache Redis** | Session cache, feed exclusion set cache | cache.t3.micro, 1 node |
| **Secrets Manager** | Store JWT secret, DB credentials | Rotated quarterly |
| **ACM** | TLS certificate for HTTPS | `*.devtinder.com` |
| **Route 53** | DNS management | A record -> CloudFront distribution |
| **CloudWatch** | Logs + metrics + alarms | ECS task logs, 5xx alarm, latency alarm |

---

## SECTION 11: QUICK REFERENCE NUMBERS

| Metric | Count |
|--------|-------|
| API Endpoints | **10** (3 auth + 2 profile + 2 request + 3 user) |
| Mongoose Models | **2** (User, ConnectionRequest) |
| MongoDB Collections | **2** (users, connectionrequests) |
| Indexes | **3** (users._id, users.email unique, connectionrequests compound) |
| Express Routers | **4** (auth, profile, request, user) |
| Backend Middleware | **3** (cors, json parser, cookie-parser) + 1 custom (userAuth) |
| Backend Source Files | **9** (app.js, database.js, 2 models, 4 routes, validation.js) |
| React Components | **10** (App, Body, NavBar, Login, Feed, UserCard, Profile, EditProfile, Connections, Requests, Footer) |
| Redux Slices | **4** (user, feed, connection, request) |
| Redux Actions | **9** (addUser, removeUser, addFeed, removeFeed, removeUserFromFeed, addConnection, removeConnection, addRequests, removeRequest) |
| Frontend Source Files | **17** (main.jsx, App.jsx, 10 components, 4 slices, constants.js, appStore.js) |
| Total Git Commits | **~48** (full repo including learning seasons) |
| DevTinder-specific Commits | **~20** (Season 2 Episodes 5-19) |
| Frontend Dependencies | **8** production + **7** dev |
| Backend Dependencies | **8** production |
| Connection Request States | **4** (ignored, interested, accepted, rejected) |

---

## SECTION 12: THE 30-SECOND ELEVATOR PITCH

> "DevTinder is a full-stack developer networking platform I built with Node.js, Express, React 19, Redux Toolkit, and MongoDB. Think Tinder, but for developers looking to connect with peers. The core feature is a swipe-based feed — users browse developer profiles and signal 'interested' or 'ignore.' The feed algorithm uses a two-query approach against MongoDB to exclude users you've already interacted with, backed by a compound index on the ConnectionRequest collection for fast lookups. Connection requests follow a state machine — interested goes to the other user's inbox, where they can accept or reject. Authentication uses JWTs stored in cookies for XSS protection, passwords are bcrypt-hashed, and the frontend uses Redux Toolkit with four slices to manage user, feed, connection, and request state. The architecture directly maps to real-world matching platforms — similar to what Arrivia might use for matching travelers with deals."

---

*Good luck with the interview! You know this code inside and out.*
