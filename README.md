# Rock Papaer Scissors game
This repository contains a web application built with Next.js, a popular React framework for server-side rendering and static site generation. This project aims to [describe the purpose and goals of the web application].

Checkout live 🔴 project 👉 [here](https://rps-game-topaz.vercel.app)
Git repository [https://github.com/piyawatton/rps_game](https://github.com/piyawatton/rps_game)

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [Node module dependencies](#node-module-dependencies)

## Getting Started

### Prerequisites

Make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org) (LTS version recommended)
- [npm](https://www.npmjs.com/)
- [Postgres Database](https://www.postgresql.org/)

### Installation

To get started with the project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/piyawatton/rps_game.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```
   
### Environment variables
For nextjs environment variable,
We have to create files on root directory
- .env.development.local // for development 
- .env.production.local // for production 

ONLY the variable which start with "NEXT_PUBLIC..." will expose to the client

```bash
POSTGRES_URL=postgres://{{user}}:{{password}}@{{host}}:{{port}}/{{db_name}}
SECRET_KEY=JUST_ANY_SECRET_KEY
NEXT_PUBLIC_TOP_N_HIGH_SCORE=10
NEXT_PUBLIC_DELAY_PLAY=2000
```


### Running the Development Server

To run the development server and see the project in action, use the following command:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`. Open your browser and visit this URL to access the web application.

## Project Structure

Here's a high-level overview of the project structure:
![Overview diagram](https://rps-game-topaz.vercel.app/assets/diagram.png)

```
rps_game/
    ├──  app/               # App routing for web application route
    ├──  migrations/        # Database migration script 
    ├──  public/            # Static assets files (images, etc.)
    ├──  pages/api/            # Page routing for api route
    ├──  src/
        ├── components/     # React components used in the application
        ├── config/         # Config Theme and language(experiments) 
        ├── fetch           # Client fetch api
        ├── lib/            # Provider or Adaptor connect to 3rd party dependencies
        ├── services/       # Bussiness logic functional 
        ├── type/           # Typescript definition
        ├── utils/          # Technical logic functional
    ├── middleware.ts       # Next.js request middleware (handle authorized route, etc..)
    ├── next-env.d          # TypeScript declaration file for Next.js
    ├── next.config         # Configuration file for Next.js
    ├── .gitignore          # Specifies which files to ignore in version control
    ├── package.json        # Project dependencies and scripts
    └── README.md           # Project documentation
```

## Node module dependencies

1. [react](https://react.dev/)
2. [next](https://nextjs.org/) 
2. [next-pwa](https://www.npmjs.com/package/next-pwa)
4. [styled-component](https://styled-components.com/)
5. [antd](https://ant.design/)
5. [axios](https://axios-http.com/)
6. [react-query](https://tanstack.com/query/v3/)
7. [js-cookie](https://www.npmjs.com/package/js-cookie)
8. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
9. [pg](https://www.npmjs.com/package/pg)
10. [pg-promise](https://www.npmjs.com/package/pg-promise)
11. [react-confetti-explosion](https://www.npmjs.com/package/react-confetti-explosion)
12. [node-pg-migrate](https://www.npmjs.com/package/node-pg-migrate?activeTab=readme)

---