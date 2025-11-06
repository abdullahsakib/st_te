# Quiz Project (Django + React (Vite))

This repository contains a minimal full-stack quiz app:
- Backend: Django + DRF + SimpleJWT
- Frontend: React (Vite) + Axios + Tailwind

## Deploying to Render (quick notes)

You can deploy the **backend** as a Python Web Service on Render:
- Set build command: `pip install -r requirements.txt`
- Set start command: `gunicorn quiz_project.wsgi --log-file -`
- Provide environment variables: `DJANGO_SECRET_KEY` (and set `DJANGO_DEBUG=0` for production)

Deploy the **frontend** as a separate Static Site or Web Service:
- For static site: build (`npm run build`) and serve the `dist` folder.
- Or deploy using Render's Static site with the output directory set to `dist` and build command `npm install && npm run build`.
- Ensure the frontend knows the API URL: set `VITE_API_URL` environment variable to your backend API root (like `https://your-backend.onrender.com/api/`)

## Local development
See `backend/` and `frontend/` folders. Run backend on port 8000 and frontend on port 5173 by default.

