# Dunamismax - Personal Blog & Portfolio

This is a Next.js application that serves as a personal blog and portfolio. It uses Payload CMS for content management and Tailwind CSS for styling.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

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

### 3. Set Up Environment Variables

Create a `.env` file in the `dunamismax` root directory and add the following variables. The `PAYLOAD_SECRET` can be any long, random string.

```
MONGODB_URI=mongodb://127.0.0.1:27017/dunamismax
PAYLOAD_SECRET=your-super-secret-and-secure-string
```

### 4. Running the Development Server

To start the development server with live reload:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`. The Payload CMS admin panel will be at `http://localhost:3000/admin`.

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

### Running Storybook

To visualize and test UI components in isolation:
```bash
npm run storybook
```
Storybook will be available at `http://localhost:6006`.