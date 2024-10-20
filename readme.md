
# Chat Application

This project is a scalable realtime chat application built using SockeIO, Redis, TypeScript, Express, Nextjs, and Prisma. 
It leverages `socket.io` for real-time communication and `prisma` for database interactions and Redis for

## Built With
- [Socket.IO](https://socket.io/): Socket.IO is a library that enables real-time, bidirectional, and event-based communication between the browser and the server.
- [Redis](https://redis.io/): Used Redis as adapter for socket.io to enable horizontal scaling.
- [Prisma](https://www.prisma.io/): Prisma is a modern database access toolkit that enables developers to easily access databases using type-safe queries.
- [TypeScript](https://www.typescriptlang.org/): TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [Express](https://expressjs.com/): Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [Next.js](https://nextjs.org/): Next.js is a React framework that enables functionality such as server-side rendering and generating static websites for React based web applications.
- [NeonDB](https://neon.tech/): NeonDB is a cloud-based database service that provides a fully managed, scalable, and secure database solution for modern applications.
- [Zod](https://zod.dev/): Zod is a TypeScript-first schema declaration and validation library.


## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Roadmap](#Roadmap)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ankkitsharma/chat-io.git
    cd chat-io
    ```

2. Install dependencies:
    ```sh
   cd server
    npm install
    ```
   ```sh
    cd client
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Use the env.example file to set up the environment variables.

4. Run the development server:
    
    For server:
    ```sh
   npm run build
    npm start
    ```
    For client:
    ```sh
    npm run dev
    ```

## API Endpoints
- `POST /auth/login`: Log in a user.
- `GET /chat-group`: Fetch all chat groups.
- `GET /chat-group/:id`: Fetch a specific chat group by ID.
- `POST /chat-group`: Create a new chat group.
- `PUT /chat-group/:id`: Update a chat group.
- `DELETE /chat-group/:id`: Delete a chat group.
- `GET /chat-group-users?group_id=:id`: Fetch users of a specific chat group.
- `POST /chat-group-users`: Add a user to a chat group.
- `/chats/:groupId`: Fetch chat messages for a specific group.


## Roadmap

- Add profile page for user
- Add images for users in chat
- Add support for emojis and file sharing
