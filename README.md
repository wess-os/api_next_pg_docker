# CRUD API NextJS
## Created using:
- NextJS
- TypeScript
- tRPC
- Prisma
- PostgreSQL
- Docker

## How to execute app:
- docker compose up -d;
-- obs:
    - remenber to change your .env file with your database informations;
    - the database starting in the port 5435, for more information check the docker-compose.yml file.
- npx prisma migrate dev --name init;
- (optional: to manage your prisma database) npx prisma studio;
- npm run dev.

