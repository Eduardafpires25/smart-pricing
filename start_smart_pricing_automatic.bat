
@echo off
echo Iniciando o Smart Pricing Automático...

:: BACK-END
start cmd /k "cd backend && npm install && npx ts-node src/index.ts"
start http://localhost:3001

:: Aguarda 5 segundos para garantir que o back-end esteja pronto
timeout /t 5 > nul

:: FRONT-END
start cmd /k "cd frontend && npm install && npm run dev"
start http://localhost:5173

pause
