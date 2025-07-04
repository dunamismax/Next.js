<p align="center">
  <img src="https://github.com/dunamismax/Next.js/blob/main/nextjs-logo-new.png" alt="Next.js Monorepo logo" width="250"/>
</p>

<p align="center">
  A centralized repository for a diverse collection of Next.js applications, designed for efficient and scalable project management.
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Framework-Next.js-black.svg" alt="Framework: Next.js"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Language-TypeScript-3178C6.svg" alt="Language: TypeScript"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC.svg" alt="Styling: Tailwind CSS"></a>
  <a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/Database-MySQL-4479A1.svg" alt="Database: MySQL"></a>
  <a href="https://github.com/dunamismax/Next.js/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
</p>

---

## Introduction

This monorepo serves as a centralized hub for various Next.js applications. Each project is designed to be independent and self-contained.

## Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dunamismax/Next.js.git
   cd Next.js
   ```

2. **Navigate to a project:**

   ```bash
   cd dunamismax
   # or
   cd api-playground
   ```

3. **Follow the instructions in the project's `README.md` file to get started.**

---

## Repository Structure

```
Next.js/
├── dunamismax/       # A personal blog and portfolio website
└── api-playground/   # A fun and interactive demonstration of various APIs
```

---

## Projects Overview

### Applications

- **[Dunamismax](https://github.com/dunamismax/Next.js/tree/main/dunamismax):** A personal blog and portfolio website built with Next.js, MySQL, and Tailwind CSS.
- **[API Playground](https://github.com/dunamismax/Next.js/tree/main/api-playground):** A fun and interactive demonstration of various APIs, built with Next.js and Tailwind CSS.

---

<details>
<summary>Tech Stack</summary>

### **Core Language**

- **TypeScript:** The primary language used for all applications, ensuring type safety and improved developer experience.
  - **Official Documentation:** [TypeScript](https://www.typescriptlang.org/docs/)

### **Development Environment**

- **macOS:** Used for all development and testing.

### **Production Environment**

- **Ubuntu Server:** A stable and widely-used Linux distribution serving as the foundation for the self-hosted application and database.
  - **Official Documentation:** [Ubuntu Server](https://ubuntu.com/server/docs)
- **Caddy:** A modern, open-source web server acting as a reverse proxy to manage traffic and provide automatic HTTPS for the Next.js application.
  - **Official Documentation:** [Caddy](https://caddyserver.com/docs/)

### **Application & Database**

- **Next.js:** A React framework for building full-stack web applications. It powers the entire application, handling the user-facing frontend, backend API routes, and server-side logic.
  - **Official Documentation:** [Next.js](https://nextjs.org/docs)
- **MySQL:** An open-source relational database management system used for reliable and high-performance persistent data storage.
  - **Official Documentation:** [MySQL](https://dev.mysql.com/doc/)
- **mysql2:** A high-performance MySQL driver for Node.js.
  - **Official Repository:** [mysql2](https://github.com/sidorares/node-mysql2)

### **Styling**

- **Tailwind CSS:** A utility-first CSS framework that enables rapid UI development and ensures design consistency directly in the markup.
  - **Official Documentation:** [Tailwind CSS](https://tailwindcss.com/docs)

### **Development & Testing**

- **Turbopack:** An incremental bundler for JavaScript and TypeScript, used to accelerate local development.
  - **Official Documentation:** [Turbopack](https://turbo.build/pack/docs)
- **ESLint:** A configurable linter tool for identifying and fixing problems in code, helping to maintain code quality and enforce standards.
  - **Official Documentation:** [ESLint](https://eslint.org/docs/latest/)
- **Prettier:** An opinionated code formatter that ensures a consistent code style across the entire codebase, improving readability.
  - **Official Documentation:** [Prettier](https://prettier.io/docs/en/)
- **Jest:** A JavaScript testing framework used for unit and integration testing of non-UI logic such as utility functions, API endpoints, and business logic.
  - **Official Documentation:** [Jest](https://jestjs.io/docs/getting-started)

</details>

---

## Development

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MySQL (for the `dunamismax` project)

### Setup

Each project has its own `package.json` file with the necessary dependencies. Follow the instructions in each project's `README.md` file to install the dependencies and run the development server.

---

## Contributing

Contributions are welcome! Please feel free to fork the repository, create a feature branch, and open a pull request.

---

## License

This repository is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

## Connect

Connect with the author, **dunamismax**, on:

- **Twitter:** [@dunamismax](https://twitter.com/dunamismax)
- **Bluesky:** [@dunamismax.bsky.social](https://bsky.app/profile/dunamismax.bsky.social)
- **Reddit:** [u/dunamismax](https://www.reddit.com/user/dunamismax)
- **Discord:** `dunamismax`
- **Signal:** `dunamismax.66`
