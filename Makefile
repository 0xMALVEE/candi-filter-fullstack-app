dev:
	concurrently "cd backend && npm run start:dev" "cd frontend && npm run dev"

install:
	cd backend && npm install && cd ../frontend && npm install

.PHONY: dev install
