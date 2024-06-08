# VShop: React Vite Redux Toolkit Project

This project is a boilerplate for a React application using Vite as the build tool, Redux Toolkit for state management, and API key stored in a .env file for secure configuration.

## Let's Try

Open the vshop website, before buying goods apply the following promo code:

- `HAKIM` to get 50%
- `NEWUSER` to get 25%
- `VSHOP` to get 10%

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- npm: Node.js package manager (comes with Node.js installation)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/anwarhakim31/vshop-React.git
   ```

2. Navigate to the project directory:

   ```bash
   cd vshop-spa
   ```

3. Install dependencies

   ```bash
   npm install
   ```

## Setup Environment

1. Create a .env file in the root of your project.

   ```env
   VITE_NODE_ENV=development
   VITE_ENCRYPTION_KEY=your_secret_key
   VITE_API_KEY=https://fakestoreapi.com/products
   ```

## Development

1. To start the development server, run:

   ```bash
   npm run dev
   ```

## Deployment

Deploy the `dist` directory to your hosting platform of choice.
