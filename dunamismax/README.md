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

These steps will guide you through creating a dedicated MySQL user and database for this project.

1.  **Log in to MySQL as a root user:**
    Open your terminal and connect to the MySQL server. You may be prompted for your root password.
    ```bash
    mysql -u root -p
    ```

2.  **Create a new user and set a password.**
    From the `mysql>` prompt, run the following command. Replace `your_username` with a username of your choice and `your_secure_password` with a strong password.
    ```sql
    CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_secure_password';
    ```

3.  **Create the database.**
    ```sql
    CREATE DATABASE dunamismax;
    ```

4.  **Grant your new user privileges on the database.**
    This allows the application to perform all necessary operations on the `dunamismax` database.
    ```sql
    GRANT ALL PRIVILEGES ON dunamismax.* TO 'your_username'@'localhost';
    ```

5.  **Apply the changes and exit.**
    ```sql
    FLUSH PRIVILEGES;
    EXIT;
    ```

6.  **Import the database schema.**
    From your regular terminal prompt (not the `mysql>` prompt), navigate to the `dunamismax` project directory and run this command. It will prompt for the password you created for `your_username`.
    ```bash
    mysql -u your_username -p dunamismax < schema.sql
    ```

### 4. Set Up Environment Variables

Create a `.env.local` file in the `dunamismax` root directory. This file will store your database credentials securely.

Add the following content to the file, replacing the placeholder values with the credentials you just created:

```
DB_HOST=127.0.0.1
DB_USER=your_username
DB_PASSWORD=your_secure_password
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
