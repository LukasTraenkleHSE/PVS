# PVS
Parallele und Verteilte Systeme Lab


Instructions for Installation:
1. Clone this repository via CMD with
git clone https://github.com/LukasTraenkleHSE/PVS.git
or inside VS Code via the terminal.

2. Start Docker and leave it running in the background.

3. Open the folder in VS Code.

4. Then open a terminal and execute
docker compose up.

5. After the build is done, open your favorite browser and visit
localhost:3000.

6. The installation is finished, and you can now test the app.

OR

Include our frontend image ghcr.io/lukastraenklehse/pvs:main in a docker compose yaml with a fitting backend.

OR 

Testable and currently deployed under
https://uni2.mowan.org



Twelve-Factor App Principles
1. Codebase:
Application resources should have a version-managed, source-code repository.
Which is given by this repository.

2. Dependencies:
Should be set up in an app manifest or configuration file and managed externally.
We use a package.json where all dependencies are listed.

3. Config:
Configurations of an app need to be stored independently as environment variables.
This is given by environment variables in the docker-compose.yml.

5. Backing Services:
Services like databases, messaging systems, SMTP services, etc. should be architected as external resources.
The database is easily exchangeable by editing the docker-compose database and backend variables.

6. Build, Release, Run:
There should be three independent steps of a deployment process.
Given by using dockers different stages build/run.
Also the frontend image is getting build on every commit to this Repos main branch.

8. Stateless Processes:
Apps should have the provision to be served by multiple stateless, independent processes.
Remix runs as a stateless process and does not depend on persistent data, beside the database.

9. Port Binding:
Apps directly bind to a port and respond to incoming requests.
For now, we use the standard ports for development and production provided by Remix.
These can changed be by changing the outgoing port of the frontend in the docker compose:

Production: 3000

Development: 5173

8. Concurrency:
Apps need to be broken down into multiple modules for scaling.
It's possible to run multiple instances of the frontend or backend at the same time.

9. Disposability:
Apps should maximize robustness with quick startup and easy shutdown.
We use Docker, which can start and stop containers in a few seconds.

10. DEV/PROD Parity:
Development, staging, and production should be kept as similar as possible.
The mode can easily be switched between production and development by changing a few variables in the compose and dockerfile.

11. Logs:
Treat logs as event streams.
All our processes write it's events to stdout.

12. Admin Processes:
Admin tasks should be run as one-off processes.
No admin processes for now, but they will be implemented later on if needed.
