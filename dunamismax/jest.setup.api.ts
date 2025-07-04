// jest.setup.api.ts

// Set environment variables for the test database
// Make sure these credentials are correct for your local test setup.
process.env.DB_HOST = '127.0.0.1';
process.env.DB_PORT = '3306';
process.env.DB_USER = 'root'; // IMPORTANT: Use a dedicated test user in a real CI/CD environment
process.env.DB_PASSWORD = '';   // Add your MySQL root/test user password here if required
process.env.DB_DATABASE = 'dunamismax_test';
process.env.JWT_SECRET = 'a-secure-secret-for-testing-only-and-is-very-long';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
