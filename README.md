# WTWR (What To Wear?)

## About the Project

WTWR is a full-stack weather-based clothing recommendation app. It fetches real-time weather data based on your location and suggests what clothing items to wear based on the current temperature. Users can create an account, log in, add their own clothing items, like items, and manage their profile.

## Functionality

- Displays current weather and temperature for a set location
- Suggests clothing items based on weather conditions (hot, warm, cold)
- Toggle between Fahrenheit and Celsius
- User registration and login with JWT authentication
- Add, view, and delete clothing items
- Like and unlike clothing items
- Edit profile name and avatar
- Protected profile route — only accessible when logged in
- Session persistence — stays logged in on page refresh

## Technologies and Techniques

- **React** — functional components, hooks (useState, useEffect, useContext)
- **React Router** — client-side routing with protected routes
- **Vite** — build tool and dev server
- **CSS / BEM** — component-scoped stylesheets following BEM methodology
- **Context API** — CurrentUserContext and CurrentTemperatureUnitContext
- **JWT Authentication** — token stored in localStorage
- **Express.js** — REST API backend
- **MongoDB / Mongoose** — database and data modeling
- **OpenWeatherMap API** — real-time weather data

## Deployed Project

Frontend: https://jmwtwr.jumpingcrab.com
Backend API: https://api.jmwtwr.jumpingcrab.com

## Links

[Backend Repository](https://github.com/jadynwilson/se_project_express)

[Frontend GitHub Repo](https://jadynwilson.github.io/se_project_react/)

[Project Pitch Video](https://www.loom.com/share/3cb45d2ff99c406c8b69fa72eca24b6d)
