# TEDx Jabal Tareq - Booking & Tickets Management System

A React + TypeScript + Vite application for managing TEDx event bookings and tickets using Material-UI (MUI).

## Features

- **Booking Form**: Public booking form for event registration
- **Tickets Management**: Admin dashboard for managing registrations and tickets
- **Authentication**: Secure login system for tickets administrators
- **Excel Export**: Export registration data to Excel files

## Tech Stack

- React 19
- TypeScript
- Vite
- Material-UI (MUI)
- React Router
- React Hook Form
- xlsx (for Excel export)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:3000
```

3. Start the development server:

```bash
npm run dev
```

## Routes

- `/` or `/booking` - Public booking form
- `/tickets-login` - Login page for tickets administrators
- `/tickets` - Tickets management dashboard (protected route)

## API Endpoints

The application connects to the backend API at the URL specified in `VITE_API_URL`. Make sure your backend server is running and accessible.

### Registration Endpoints

- `POST /api/registration/register` - Register a new booking
- `GET /api/registration/tickets/available` - Get available tickets count
- `GET /api/registration/registrations` - Get registrations (paginated)
- `PATCH /api/registration/registrations/:id` - Update registration status
- `GET /api/registration/registrations/export` - Export registrations to Excel

### Admin Endpoints

- `POST /api/admin/tickets-login` - Login for tickets admin
- `GET /api/admin/tickets-verify` - Verify tickets admin token

## Project Structure

```
src/
├── components/
│   └── BookingForm.tsx      # Booking form component
├── pages/
│   ├── Booking.tsx          # Booking page
│   ├── TicketsLogin.tsx     # Login page
│   └── TicketsManagement.tsx # Tickets management dashboard
├── contexts/
│   └── AuthContext.tsx      # Authentication context
├── config/
│   └── api.ts               # API configuration
├── services/
│   └── api.ts               # API service utilities
└── App.tsx                  # Main app component with routing
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.
