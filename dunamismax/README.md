# Dunamismax - Personal Blog & Portfolio

This is a Next.js application that serves as a personal blog and portfolio. It uses a MySQL database for content storage and Tailwind CSS for styling, and features a stunning dark theme.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html)

## Getting Started

### 1. Clone the Repository

If you haven't already, clone the main repository:
```bash
git clone <repository-url>
cd Next.js/dunamismax
```

### 2. Install Dependencies

Install the necessary packages using npm or yarn:
```bash
npm install
# or
yarn install
```

### 3. Set Up the Database

Create a new MySQL database and run the `schema.sql` file to create the necessary tables.

### 4. Set Up Environment Variables

Create a `.env.local` file in the `dunamismax` root directory and add your MySQL credentials:

```
DB_HOST=127.0.0.1
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_DATABASE=dunamismax
```

### 5. Running the Development Server

To start the development server with live reload:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## Building and Running for Production

### Build the Application
```bash
npm run build
```

### Start the Production Server
```bash
npm run start
```

## Testing

### Running Tests

To run the test suite with Jest:
```bash
npm run test
```