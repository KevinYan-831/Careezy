# Careezy

Careezy is an AI‑driven platform for career preparation and resume building. It helps students and early‑career professionals build ATS‑friendly resumes, explore internships, and get AI insights.

## Tech Stack

- Frontend: React (Vite, TypeScript), Material‑UI, React Hook Form, Yup, Axios, React Router
- Backend: Node.js, Express, MongoDB (Atlas), Mongoose
- AI: DeepSeek R1 (default), OpenAI GPT‑4o for premium users
- PDF/LaTeX: Server‑side LaTeX generation with a platform default and the “Jake Gutierrez” template

## Key Features

- Resume Builder with real‑time preview and template selector (Platform Default / Jake Gutierrez (LaTeX))
- Internship Explorer with AI match scoring
- Career advice, resume suggestions, skills analysis via AI endpoints
- Auth: JWT‑based sign up / login, protected routes on client
- Export to PDF and Google Docs (via LaTeX service)

## Local Development

1) Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

2) Configure backend
- Create `server/.env`:
```
MONGODB_URI=mongodb+srv://<USER>:<URL_ENCODED_PASSWORD>@<CLUSTER>.mongodb.net/careezy?retryWrites=true&w=majority&appName=<APP>
MONGO_URI=mongodb+srv://<USER>:<URL_ENCODED_PASSWORD>@<CLUSTER>.mongodb.net/careezy?retryWrites=true&w=majority&appName=<APP>
JWT_SECRET=your_dev_secret
PORT=5000
CLIENT_URL=http://localhost:5173
DEEPSEEK_API_KEY=your_deepseek_key
# Optional for premium
OPENAI_API_KEY=your_openai_key
```

3) Start servers
```
npm --prefix server install
npm --prefix client install

npm --prefix server run dev
npm --prefix client run dev
```
- API health: `http://localhost:5000/api/health`
- Client: `http://localhost:5173`

## How the product works

1) Authentication
- Client posts to `/api/auth/register` and `/api/auth/login` (email is normalized to lowercase)
- JWT is stored in `localStorage`; protected routes (`/resume`, `/internships`, `/dashboard`) require a token

2) Resume Builder
- Form pages powered by React Hook Form feed a live preview
- Users select a template; when “Jake Gutierrez (LaTeX)” is chosen, API calls append `?template=custom`
- Server generates LaTeX via `latexService.js` and returns a PDF

3) AI Integration
- Default AI model: DeepSeek `deepseek-r1`
- If request includes `isPremium: true` and `OPENAI_API_KEY` is set, backend uses OpenAI `gpt-4o`
- AI responses are normalized to match the Mongoose `Resume` schema

## Talking points (for demos/interviews)

- Clear separation of concerns: Vite/React frontend and Express/Mongoose backend with a simple `/api` proxy
- Robust auth and route protection; token is verified by the backend and enforced by the client
- Flexible AI layer that can switch between DeepSeek and OpenAI per request (premium toggling)
- LaTeX pipeline with safe escaping to generate clean, ATS‑friendly PDFs; includes a well‑known “Jake Gutierrez” template
- Schema sync: frontend forms and backend Mongoose models are aligned to prevent data mismatch
- Dev ergonomics: Hot‑reload via Vite, Nodemon for server, `.env`‑driven configuration

## Folder Structure

```
Careezy/
  client/        # React frontend (Vite + TS + MUI)
  server/        # Express + Mongoose backend, AI & LaTeX services
  admin/         # Admin dashboard (Vite)
```

## Troubleshooting

- Mongo connection errors: ensure Atlas `Network Access` allows your IP or 0.0.0.0/0 for dev; verify `MONGODB_URI`
- If client requests hit the wrong origin, use the proxied `/api` paths; Vite proxy forwards to `http://localhost:5000`
- Registration errors in browser: check DevTools → Network → `register` request body/response

