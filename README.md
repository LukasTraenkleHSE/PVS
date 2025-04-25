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
localhost:4173.

6. The installation is finished, and you can now test the app.


Twelve-Factor App Principles
1. Codebase
Application resources should have a version-managed, source-code repository.
Which is given by this repository.

2. Dependencies
Should be set up in an app manifest or configuration file and managed externally.
We use a package.json where all dependencies are listed.

3. Config
Configurations of an app need to be stored independently as environment variables.
This is not yet the case, but with an .env file all sensitive data will be hidden.

4. Backing Services
Services like databases, messaging systems, SMTP services, etc. should be architected as external resources.
We don't use any database right now, but it can be done via a database set up in the .env file.

5. Build, Release, Run
There should be three independent steps of a deployment process.
Not given right now in single steps, but this will be implemented when Kubernetes is involved.

6. Stateless Processes
Apps should have the provision to be served by multiple stateless, independent processes.
Remix runs as a stateless process.

7. Port Binding
Apps directly bind to a port and respond to incoming requests.
For now, we use the standard ports for development and production provided by Remix:

Production: 4173

Development: 5173

8. Concurrency
Apps need to be broken down into multiple modules for scaling.
Not given yet, but Kubernetes will take care of scaling.

9. Disposability
Apps should maximize robustness with quick startup and easy shutdown.
We use Docker, so this is given.

10. DEV/PROD Parity
Development, staging, and production should be kept as similar as possible.
This is kind of done, but with an .env file it would be even closer to a real-world environment.

11. Logs
Treat logs as event streams.
For now, we only use console.log.

12. Admin Processes
Admin tasks should be run as one-off processes.
No admin processes for now, but they will be implemented later on if needed.

Answers based on this source since the official slides are not available right now.
Sources: [Twelve-Factor App Principles](https://blog.rheinwerk-computing.com/twelve-factor-app-principles-for-developers)
