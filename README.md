# LearnLingo 🎓

A modern language learning platform that connects students with qualified teachers worldwide.

## 🌟 Features

- **Teacher Discovery**: Browse and search through qualified language teachers
- **Advanced Filtering**: Filter teachers by language, proficiency level, and price range
- **Favorites System**: Save favorite teachers to your personal list
- **User Authentication**: Secure login and registration with Firebase
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Smooth Animations**: Page transitions and interactive elements with Framer Motion
- **Real-time Database**: Dynamic teacher data with Firebase Realtime Database

## 🛠 Tech Stack

- **Frontend Framework**: React 18.2.0 with React Hooks
- **Routing**: React Router v6
- **State Management**: Redux Toolkit + React-Redux
- **Styling**: Tailwind CSS 3.4.4
- **Animations**: Framer Motion 11.0.0
- **Forms**: React Hook Form with Yup validation
- **Backend**: Firebase (Authentication + Realtime Database)
- **Build Tool**: Vite
- **Code Quality**: ESLint

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account and configuration

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd learnLingo
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a `firebase.js` file in the root directory
   - Add your Firebase credentials

4. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code quality checks

## 📁 Project Structure

```
src/
├── api/                 # API integration
├── assets/              # Static assets (images, icons)
├── components/          # Reusable components
│   ├── headers/        # Navigation header
│   ├── hero/           # Hero section
│   └── stats/          # Statistics display
├── img/                # Image resources
├── pages/              # Page components
│   ├── favorites/      # Favorites page
│   ├── home/           # Home page
│   ├── login/          # Login page
│   ├── logout/         # Logout page
│   ├── register/       # Registration page
│   └── teachers/       # Teachers listing and filtering
├── redux/              # Redux store and slices
│   ├── auth/          # Authentication state management
│   └── store.js       # Redux store configuration
├── routes/             # Route guards and protection
│   ├── PrivateRoute.jsx    # Protected routes
│   └── PublicRoute.jsx     # Public routes
├── schemas/            # Validation schemas
│   └── authSchemas.js
├── App.jsx            # Root component
├── index.css          # Global styles
└── main.jsx           # Entry point
```

## 🎨 Styling & Animations

### Global Theme
- Custom Tailwind CSS configuration with premium shadows (glow-soft, pro-card, pro-hover)
- CSS custom properties for light/dark mode support
- Smooth scrollbar with cyan gradient

### Motion System
- Centralized motion configuration (`motionConfig.js`)
- Spring physics presets for hover and page transitions
- PageTransition wrapper for smooth route animations
- Staggered animations for interactive elements

## 🔐 Authentication

- Secure login and registration with Firebase Authentication
- Protected routes with PrivateRoute component
- Public routes for non-authenticated users
- Automatic user session refresh on app load

## 🎯 Teacher Filtering

The Teachers page includes advanced filtering capabilities:

- **Language Filter**: Select specific teaching languages
- **Level Filter**: Filter by proficiency level (Beginner, Intermediate, Advanced, etc.)
- **Price Range**: Set minimum and maximum hourly rates
- **Reset Filters**: Clear all filters to view all teachers

Filters work reactively and update the teacher list instantly.

## ⭐ Favorites System

- Add/remove teachers from favorites
- Persistent storage using browser localStorage
- View all favorite teachers on dedicated Favorites page
- Quick toggle on teacher cards

## 📱 Responsive Design

The app is fully responsive with:
- Mobile-first design approach
- Tablet and desktop optimizations
- Touch-friendly interface on mobile devices
- Adaptive filter layouts on smaller screens

## 🐛 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- Build size: ~700KB (minified JS), ~220KB (gzip)
- 487 modules in production build
- Optimized for fast load times and smooth interactions

## 🤝 Contributing

To contribute to this project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly with `npm run build`
4. Submit a pull request

## 📄 License

This project is part of the GoIT LMS platform.

---

**Happy Learning! 🚀**
