# CampusEats – SE3090 Lab 11 Local Demo

A small full-stack CampusEats starter project for running locally and capturing genuine local screenshots for the SE3090 Lab 11 report. This project is not deployed to cloud hosting.

## Stack
- Frontend: React + Vite
- Backend: ASP.NET Core 8 minimal API
- Optional local PostgreSQL via Docker Compose

## Run the frontend
Install Node.js LTS, open a terminal in `frontend/`, then run:
```bash
npm install
npm run dev
```
Open http://localhost:5173.

## Run the backend
Install the .NET 8 SDK, open another terminal in `backend/CampusEats.Api/`, then run:
```bash
dotnet restore
dotnet run --urls http://localhost:5080
```
API health: http://localhost:5080/api/health
Menu JSON: http://localhost:5080/api/menu

## Optional local PostgreSQL
If Docker Desktop is installed, from the project root run `docker compose up -d db`. The current demo API serves sample menu data and does not persist orders to PostgreSQL.

## Evidence for the lab report
Take genuine screenshots of the project in VS Code, frontend running at localhost:5173, API JSON endpoints, and running terminals. Label these as local execution screenshots, not cloud deployment evidence. Do not invent cloud URLs or claim deployment succeeded unless you actually deploy the project.
