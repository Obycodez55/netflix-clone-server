# **Netflix Clone - Backend**

## **Project Description**
This repository contains the backend code for the Netflix clone project. The backend is developed using Node.js and Express.js, with MongoDB as the database. The Prisma ORM is used for database interaction, and the entire backend is written in TypeScript for type safety and enhanced development experience. This backend handles user authentication, data fetching, and incorporates an advanced search algorithm for efficient content discovery.

## **Features**
- **User Authentication**: Secure user authentication with JWT (JSON Web Tokens).
- **Data Fetching**: Efficiently fetch data related to movies, TV shows, and user profiles.
- **Advanced Search Algorithm**: Implemented to provide fast and relevant search results for users.
- **RESTful API**: Well-structured endpoints for frontend interaction.

## **Tech Stack**
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing user data, movies, and TV shows.
- **Prisma ORM**: Used for interacting with the database in a type-safe manner.
- **TypeScript**: Ensures type safety across the codebase.

## **Installation**

To set up the backend project locally:

```bash
# Clone the backend repository
git clone https://github.com/Obycodez55 /netflix-clone-server.git

# Navigate to the project directory
cd netflix-clone-server

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the root directory and add the necessary variables
# Example:
# DATABASE_URL=your-mongodb-connection-string
# JWT_SECRET=your-jwt-secret-key

# Apply Prisma migrations to set up the database schema
npx prisma migrate deploy

# Start the backend server
npm run start:dev
```
After starting the backend server, it will be running at http://localhost:5000. The frontend can then interact with the API to handle user authentication, data fetching, and search functionalities.

## **Contributing**
If you'd like to contribute, feel free to fork the repository and submit a pull request with your changes.

## **Contact**
For any questions or feedback, you can reach me on [LinkedIn](https://www.linkedin.com/in/adebayo-obikoya-557b0626a/) or [Twitter](https://x.com/obikoya_adebayo).
