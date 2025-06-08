# CRM System

A modern Customer Relationship Management (CRM) system built with React, TypeScript, and Node.js. This project consists of a frontend and backend application that work together to provide a complete CRM solution.

## Project Structure

The project is divided into two main parts:

- `crm-frontend/`: React-based frontend application
- `crm-backend/`: Node.js/Express backend server

## Frontend (crm-frontend)

The frontend is built with:
- React 19
- TypeScript
- Vite
- TailwindCSS
- Radix UI components
- React Router DOM
- Axios for API calls
- Recharts for data visualization

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd crm-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Backend (crm-backend)

The backend is built with:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for password hashing

### Backend Setup

1. Navigate to the backend directory:
```bash
cd crm-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

## Features

- User authentication and authorization
- Customer management
- Modern and responsive UI
- Real-time data updates
- Secure API endpoints
- Data visualization
- Form validation
- Error handling

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB

### Running the Project

1. Start the backend server:
```bash
cd crm-backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd crm-frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
