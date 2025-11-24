# 📝 React To-Do List App

A modern, **animated To-Do List app** built with **React**, **Tailwind CSS**, and a **Node.js backend** with user authentication, featuring:
- ✅ Add, toggle, and delete tasks with smooth animations
- ✏️ **Task editing** – Edit task text and deadlines directly
- 📝 **Detailed descriptions** – Add optional descriptions to tasks
- ⏰ **Deadline scheduling** – Set due dates with datetime picker
- 🔒 User authentication with JWT tokens, allowing secure login and registration
- 💾 Persistent storage using a backend API powered by MongoDB
- 🎚 Filter tasks (All / Active / Completed) with animated transitions
- 🧹 Clear all or clear completed tasks
- 🌙 Dark mode toggle with playful animations (🌙/☀️)
- 📱 Responsive design
- ✨ **Smooth animations** throughout the entire app
- 🎯 Enhanced UX with hover effects and visual feedback
- 🎨 Custom CSS animations combined with Tailwind utilities
- 📋 **Expandable details** – Show/hide additional input fields

---

## 🚀 Live Demo
[Click here to try it out](https://shlok-shinde.github.io/todo-list)

---

## 🛠 Tech Stack
### Frontend
- [React](https://react.dev/) – Frontend library with hooks
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- **Custom CSS Animations** – Keyframe animations and transitions
- [Axios](https://axios-http.com/) – HTTP client for API requests

### Backend
- [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) – REST API server
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) – Document database and ODM
- [JSON Web Tokens (JWT)](https://jwt.io/) – Authentication tokens
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) – Password hashing
- [dotenv](https://www.npmjs.com/package/dotenv) – Environment variable management
- [cors](https://www.npmjs.com/package/cors) – Cross-origin resource sharing

---

## ⚙️ Installation
Clone the repo and install dependencies:

```bash
git clone https://github.com/shlok-shinde/todo-list.git
cd todo-list
npm install
```

### Run Backend Server

```bash
cd server
npm install
node server.js
```

The backend server listens on port 5000 by default.

### Run Frontend App

In a separate terminal window:

```bash
npm start
```

---

## ✨ Animation Features

### 🎯 **Interactive Animations**
- **Todo Creation**: Smooth slide-in animation from bottom
- **Todo Editing**: Expandable edit mode with smooth transitions
- **Todo Deletion**: Elegant slide-out animation with fade
- **Completion Toggle**: Visual feedback with checkbox scaling and color transitions
- **Hover Effects**: Subtle lift and shadow effects on interactive elements
- **Input Expansion**: Smooth expand/collapse animation for description and deadline fields
- **Form Interactions**: Focus/blur animations with color transitions and border effects

### 🎨 **Custom CSS Animations**
- **slideInUp/slideOutDown**: Custom keyframe animations for todo items
- **Smooth Transitions**: Optimized cubic-bezier timing functions
- **Button Press Effects**: Scale animations for tactile feedback
- **Theme Toggle**: Playful rotation animation with emoji icons

### 🎪 **Enhanced UX**
- **Focus States**: Accessible focus rings with smooth transitions
- **Loading States**: Pulse animations for form submissions
- **Responsive Design**: Animations work seamlessly across devices

---

## 🔮 Future Enhancements
- 📊 **Analytics dashboard** – task completion statistics
- 🔔 **Push notifications** – task reminders

## 👨‍💻 Author

Built by [Shlok Shinde](https://github.com/shlok-shinde)
