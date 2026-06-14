# 🏡 Stayify

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=black)

> *Find your space. Share your place. Stayify makes discovering and listing unique stays effortless — for everyone.*

---

## 📖 Description

**Stayify** is a modern, full-stack accommodation platform that reimagines how people discover and share spaces. Whether you're a traveller hunting for the perfect place to stay or a host with a space worth sharing — Stayify brings both worlds together in one seamless experience.

The platform is built around a simple but powerful idea: **anyone should be able to list a space, and anyone should be able to find one.** Stayify strips away the complexity and puts the focus on what matters — beautiful listings, frictionless discovery, and a secure, trust-first user experience.

Under the hood, Stayify is engineered with a clean MVC architecture: Express.js handles routing and business logic, EJS delivers fast server-rendered views, MongoDB with Mongoose manages flexible data persistence, and Passport.js ensures authentication is rock-solid. The result is a performant, scalable web application that feels as polished as it is purposeful.

---

## ✨ Key Features

- 🔐 **User Authentication** — Secure registration and login using Passport.js with local strategy and session-based persistence.
- 🏨 **Listing Management** — Create, read, update, and delete (CRUD) hotel/stay listings.
- ⭐ **Guest Reviews** — Authenticated users can leave reviews on any listing, sharing their experience to help future travellers make better decisions.
- 🗂️ **Dynamic Templating** — Server-side rendering with EJS for fast, SEO-friendly pages.
- 💬 **Flash Notifications** — Contextual success/error messages via `connect-flash` for a smooth UX.
- 🔁 **HTTP Method Override** — Support for `PUT` and `DELETE` via `method-override` in HTML forms.
- 📱 **Responsive UI** — Clean, mobile-friendly layout powered by Bootstrap 5.
- 🛡️ **Session Management** — Persistent login sessions using `express-session`.

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime environment |
| [Express.js v5](https://expressjs.com/) | Web framework for routing and middleware |
| [Passport.js](https://www.passportjs.org/) | Authentication middleware |
| [passport-local](https://github.com/jaredhanson/passport-local) | Username/password strategy |
| [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose) | Mongoose plugin for Passport |
| [express-session](https://github.com/expressjs/session) | Session management |
| [connect-flash](https://github.com/jaredhanson/connect-flash) | Flash message support |
| [method-override](https://github.com/expressjs/method-override) | REST method override for HTML forms |

### Templating / Frontend
| Technology | Purpose |
|---|---|
| [EJS v5](https://ejs.co/) | Server-side HTML templating engine |
| [Bootstrap 5](https://getbootstrap.com/) | Responsive UI component library |

### Database
| Technology | Purpose |
|---|---|
| [MongoDB](https://www.mongodb.com/) | NoSQL document database |
| [Mongoose v9](https://mongoosejs.com/) | MongoDB ODM for schema modeling |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and populate it with the following keys:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/stayify

# Session Secret (use a long, random string in production)
SESSION_SECRET=your_super_secret_session_key_here

# Server Port (optional, defaults to 3000)
PORT=3000
```

> ⚠️ **Never commit your `.env` file to version control.** It is already listed in `.gitignore`.

---

## 🚀 Installation & Local Setup

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/SushilThakare/Stayify.git
cd Stayify
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
# Create your .env file (see Environment Variables section above)
cp .env.example .env
# Then edit .env with your actual values
```

**4. Start MongoDB** *(skip if using Atlas)*
```bash
mongod
```

**5. Start the development server**
```bash
node app.js
```

**6. Open in your browser**
```
http://localhost:3000
```

> 💡 **Tip:** For auto-restart on file changes during development, install `nodemon`:
> ```bash
> npm install -g nodemon
> nodemon app.js
> ```

---

## 📁 Folder Structure

```
Stayify/
│
├── models/                  # Mongoose data models
│   ├── listing.js           # Schema for hotel/stay listings
│   ├── review.js            # Schema for guest reviews (linked to listings)
│   └── user.js              # Schema for user accounts (with Passport plugin)
│
├── views/                   # EJS templates (server-rendered HTML)
│   ├── layouts/             # Base layout templates (header, footer, navbar)
│   ├── listings/            # Views for listing pages (index, show, new, edit)
│   ├── users/               # Views for login and registration pages
│   └── partials/            # Reusable UI components (flash messages, navbar)
│
├── public/                  # Static assets served to the client
│   ├── css/                 # Custom stylesheets
│   ├── js/                  # Client-side JavaScript
│   └── images/              # Static image assets
│
├── app.js                   # Main application entry point (Express setup, routes, DB connection)
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Locked dependency tree
├── .gitignore               # Git ignore rules (node_modules, .env, etc.)
└── .env                     # 🔒 Environment variables (NOT committed to Git)
```

---

## 🔌 API Endpoints

All routes are server-rendered and return HTML responses. The application follows RESTful conventions, using `method-override` to support `PUT` and `DELETE` from standard HTML forms.

### Listing Routes

| Method | Route | Description |
|--------|--------|-------------|
| `GET` | `/listings` | Browse all listings (home/index page) |
| `GET` | `/listings/new` | Render form to create a new listing |
| `POST` | `/listings` | Submit and save a new listing |
| `GET` | `/listings/:id` | View a single listing's detail page |
| `GET` | `/listings/:id/edit` | Render the edit form for a listing |
| `PUT` | `/listings/:id` | Update an existing listing |
| `DELETE` | `/listings/:id` | Delete a listing |

### Review Routes

| Method | Route | Description |
|--------|--------|-------------|
| `POST` | `/listings/:id/reviews` | Submit a new review for a listing |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete a review from a listing |

### User / Auth Routes

| Method | Route | Description |
|--------|--------|-------------|
| `GET` | `/register` | Render the user registration page |
| `POST` | `/register` | Create a new user account |
| `GET` | `/login` | Render the login page |
| `POST` | `/login` | Authenticate user and create session |
| `GET` | `/logout` | Destroy session and log out user |

---

## 📸 Screenshots


### Home / Listings Page

<img width="1440" height="900" alt="Screenshot 2026-06-01 at 11 26 20 PM" src="https://github.com/user-attachments/assets/af5ad06c-3eaf-4bf7-9fa0-f0d8cfa3b43e" />


### Listing Detail Page

<img width="1440" height="900" alt="Screenshot 2026-06-01 at 11 29 21 PM" src="https://github.com/user-attachments/assets/d3a43d5d-dd81-459c-a015-aa02795030b3" />


### Add New Listing Form

<img width="1440" height="900" alt="Screenshot 2026-06-01 at 11 58 17 PM" src="https://github.com/user-attachments/assets/48bfb4f5-e491-4c2d-96e7-12bba059e9ec" />


### Guest Reviews Section

<img width="1440" height="900" alt="Screenshot 2026-06-01 at 11 29 31 PM" src="https://github.com/user-attachments/assets/f8d2e12f-1b82-4cfd-b941-798060f4f5bc" />


### Login & Register Pages

<img src="https://github.com/user-attachments/assets/170c7313-5449-4865-8f05-fc55bcb8a284" />


---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

<div align="center">
  Made by <a href="https://github.com/SushilThakare">Sushil Thakare</a>
</div>
