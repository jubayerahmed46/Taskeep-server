# Taskeep (Backend)

**Taskeep** is a powerful **task management web application** that helps you plan your daily life more effectively. It provides a modern and interactive experience with real-time task updates, ensuring you stay consistent with your work.

</br>

## Dependencies

Below are the dependencies used in this project:

### Main Dependencies

```json
{
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "mongodb": "^6.13.0",
  "nodemon": "^3.1.9",
  "socket.io": "^4.8.1"
}
```

## Technologies

- **Express.js** - Manages server-side logic, handles API requests, and connects with the database.
- **Socket.io** - Enables real-time updates, allowing instant task synchronization between users.
- **MongoDB** - Stores and organizes task data efficiently, ensuring scalability and flexibility.

## How to install

Clone the project:

```bash
git clone https://github.com/jubayerahmed46/Taskeep-server
```

Change directory to **Taskeep-server**:

```bash
cd Taskeep-server
```

Install dependencies:

```bash
npm install
```

Make sure to set up the **.env** file and include important keys, e.g., mongoDB_uri or more.

Then, run this command:

```bash
npm run dev
```

## Checkout [Frontend](https://github.com/jubayerahmed46/Taskeep-client)
