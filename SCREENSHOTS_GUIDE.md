# Screenshot guide for the report

Capture these on your own laptop after running the project. These are local screenshots, not cloud deployment proof.

1. Project folders in VS Code.
2. Frontend running at `http://localhost:5173` with the `npm run dev` terminal visible.
3. Backend terminal showing the API running.
4. `http://localhost:5080/api/health` returning JSON.
5. `http://localhost:5080/api/menu` showing the sample menu JSON.
6. Frontend interactions: try search, filter categories and add items to My tray.
7. Optional: Docker Desktop showing PostgreSQL running after `docker compose up -d db`.

Do not label localhost screenshots as Vercel/Render/Neon deployment evidence. The demo API serves sample menu data and does not persist orders to PostgreSQL.
