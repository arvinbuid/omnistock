# Omnistock

Web-Based Inventory Management System built with Next.js, TypeScript, and Prisma.

<div align="center">
    <img src="/public/images/project-showcase.png" alt="Project Showcase">
  </a>
  <br />
  <div>
    <img src="https://img.shields.io/badge/NEXT.JS-000000?logo=next.js&logoColor=white&style=for-the-badge" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
   <img src="https://img.shields.io/badge/-Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </div>
</div>

## Features

- Authentication
- Dynamic Dashboard
- Pagination
- Search form
- Products Management
- Audit Logs
- Responsive Design

## Usage

### Install Dependencies

```bash
npm install
```

### Environment Variables

Rename the `.example-env` file to `.env` and add the following:

##### PostgreSQL Database Url

Sign up for a free PostgreSQL database through Neon Serverless. Log into Neon, click on 'New Project' to create a new Postgres database. Add the URL

Example:

```bash
DATABASE_URL="postgresql://username:password@host:port/dbname"
```

##### Neon Auth Environment Variables

Inside your project/database, navigate to 'Auth' &rarr; 'Configuration' and click Environment Variables. Select Next.js tab and click 'Copy snippet'. Add the credentials

Example:

```bash
# Neon Auth environment variables for Next.js
NEXT_PUBLIC_STACK_PROJECT_ID='your-next-public-stack-project-id'
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY='your-next-public-stack-publishable-client-key'
STACK_SECRET_SERVER_KEY='your-stack-secret-server-key'
```

### Run

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production mode
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Seed Database

To seed the database with sample data, run the following command in your terminal.

```bash
node prisma/seed.ts
```

Make sure that Node.js v22.18.0 onwards for this command to work.
