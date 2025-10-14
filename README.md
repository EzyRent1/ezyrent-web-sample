# EzyRent Web

Welcome to the **EzyRent Web** repository! This project is the web version of EzyRent, developed using **Next.js**, **TailwindCSS**, and **TypeScript** for a modern, responsive, and scalable application. The repository follows a structured branching model with `main`, `develop`, and `staging` branches for effective development and deployment.

---
## Table of Contents

1. [Branch Overview](#branch-overview)
2. [Project Architecture](#project-architecture)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Environment Variables](#environment-variables)
   - [Steps to Set Up the Project Locally](#steps-to-set-up-the-project-locally)
5. [Workflow Guidelines](#workflow-guidelines)
6. [Key Commands](#key-commands)
7. [Contributing](#contributing)
8. [Contact](#contact)
---
## Branch Overview

### 1. **Main**

- Production-ready branch containing the stable version of the application.
- **Direct pushes are prohibited.** All changes must be merged via Pull Requests (PRs) from `staging`.

### 2. **Develop**

- Active development branch where new features and bug fixes are implemented.
- Developers create feature or bugfix branches from `develop` and merge them back after completing their work.

### 3. **Staging**

- A pre-production branch for integration testing and QA.
- Aggregates changes from `develop` and prepares them for deployment to `main`.

---
## Project Architecture

### Overview

EzyRent Web is built with a focus on modularity, scalability, and performance:

- **Frontend Framework**: Next.js with Server-Side Rendering (SSR) and Static Site Generation (SSG)
- **State Management**: React Context API (or Redux for complex state scenarios)
- **Styling**: TailwindCSS with reusable component structures

### Structure

```plaintext
ezyrent-web/
  ├── app/                # Main application logic and pages
     ├── (auth)/          # Application auth logic and pages
     ├── (api)/           # Application API logic
     ├── index.tsx        # Main application entry point
     ├── +not-found.tsx   # Not found pages
  ├── components/         # Reusable UI components
  ├── lib/                # Utility functions and shared logic
  ├── types/              # TypeScript types and interfaces
  ├── assets/             # Static assets (images, fonts, etc.)
  └── scripts/            # Automation and other scripts
```
---

## Tech Stack

### Core Technologies

- **Frontend Framework**: Next.js 13+
- **TypeScript**: For type safety and scalability
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Validation**: Zod
- **Form Handling**: React Hook Form

### Development Tools

- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions

### Deployment

- **Hosting**: Vercel
- **Version Control**: GitHub

---

## Getting Started

### Prerequisites

- **Node.js** (latest LTS version recommended)
- **npm** (default package manager)
- **Git** (for version control)
- A code editor, preferably **VS Code**

### Environment Variables

Create an `.env.local` file in the root directory with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.ezyrent.com/v1
NEXT_PUBLIC_API_KEY=your_api_key_here

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_AUTH_CLIENT_ID=your_client_id

# Optional Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_optional

# Development Flags
NEXT_PUBLIC_FEATURE_FLAGGING=true
```

**Important**:

- Never commit `.env.local` to version control.
- Use secure storage for environment secrets.

### Steps to Set Up the Project Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/EzyRentOrg/ezyrent-web.git
   cd ezyrent-web
   ```

2. **Checkout the Appropriate Branch**:

   ```bash
   git checkout develop
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Workflow Guidelines

### Feature Development

1. Create a new branch from `develop`:

   ```bash
   git checkout develop
   git pull
   git checkout -b feature/your-feature-name
   ```

2. Commit your changes:

   ```bash
   git add .
   git commit -m "Add: Description of changes"
   git push origin feature/your-feature-name
   ```

3. Create a PR to `develop`.

4. After PR is approved and merged
   ```bash
   git checkout develop
   git pull origin develop
   git branch -d feature/your-feature-name   # Deletes local branch
   git push origin --delete feature/your-feature-name  # Deletes remote branch
   ```
5. After testing, merge `develop` into `staging` and subsequently into `main`.

---

## Key Commands

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Linting

```bash
npm run lint
```

---

## Contributing

- Follow branch naming conventions (`feature/`, `bugfix/`, etc.).
- Write descriptive commit messages.
- Test changes locally before creating PRs.

---

## Contact

- **Email**: support@ezyrent.com
- **Slack**: [EzyRent Dev Team](ezyrentteam.slack.com)
