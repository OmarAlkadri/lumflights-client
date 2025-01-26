# Lumflights Client

Welcome to the **Lumflights Client** project! This repository contains the source code for the front-end application of Lumflights, designed to handle user authentication, reservations, staff management, and more. The application is built using **Next.js**, **TypeScript**, and **TailwindCSS**, providing a modern, responsive, and performant user experience.

You can view the deployed project live here: [Lumflights Client](https://lumflights-client-tau.vercel.app/).

---

## Project Structure

The project follows a clean architecture pattern, with a modular and organized folder structure:

```
src/
├── app
│   ├── api                # API routes for authentication, reservations, and user roles
│   ├── auth               # Pages for user authentication (login/register)
│   ├── dashboard          # Admin and staff dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── metadata.ts        # Metadata configuration
│   └── provider.tsx       # Context and provider setup
├── application
│   ├── interfaces         # Application-level interfaces
│   └── usecases           # Business logic use cases
├── assets                 # Static assets like logos
├── contexts               # React context for authentication
├── domain
│   ├── entities           # Core business entities
│   ├── services           # Domain-specific services
│   └── value-objects      # Value objects for domain modeling
├── infrastructure
│   ├── ai                 # AI-related infrastructure
│   ├── firestore          # Firestore utilities
│   └── repositories       # Repositories for data handling
├── presentation
│   ├── components         # Reusable UI components
│   ├── layouts            # Layout components for different pages
│   └── modals             # Modals for user interaction
├── public                 # Publicly accessible files like images
├── styles                 # Global and TailwindCSS stylesheets
├── types                  # TypeScript types
└── utils                  # Utility functions
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm (preferred package manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lumflights-client.git
   cd lumflights-client
   ```

2. Install dependencies using **pnpm**:
   ```bash
   pnpm install
   ```

### Development
To start the development server, run:
```bash
pnpm dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

### Build
To build the application for production, use:
```bash
pnpm build
```
The output will be located in the `.next` directory.

### Start
After building the application, you can start it with:
```bash
pnpm start
```
The application will run on the specified production port (default: 3000).

### Linting
To lint the codebase, use:
```bash
pnpm lint
```

---

## Key Features
- **Authentication:** Login and registration flows.
- **Dashboard:** Admin and staff dashboards with role-based access.
- **Reservations:** List, view, and manage reservations.
- **Responsive UI:** Built with TailwindCSS for modern and adaptable designs.

---

## Technologies Used
- **React (19.0.0)**
- **Next.js (15.1.6)**
- **TypeScript**
- **TailwindCSS**
- **Firebase**
- **React Hook Form**
- **Day.js**

---

## Deployment
The project is deployed using **Vercel**. You can access it at:
[https://lumflights-client-tau.vercel.app/](https://lumflights-client-tau.vercel.app/)

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes and push them.
4. Open a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments
- Thanks to the developers and contributors who made this project possible.
- Special thanks to the creators of Next.js, React, and TailwindCSS for their incredible tools.

Feel free to explore, contribute, and give feedback!

