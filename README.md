![image](https://github.com/Niklas-dev/scribbleseekerr/assets/84782843/6cdea475-bc79-4e4f-8e89-83dfe091ea2e)


# ScribbleSeekerr

**Description:** This project is a web application built using Next.js and Django. It combines the frontend capabilities of Next.js with the backend power of Django to create a robust and efficient web application.

## Features

- **Server-side rendering (SSR):** Next.js provides server-side rendering capabilities, allowing faster initial page loads and improved SEO.

- **Client-side rendering (CSR):** Next.js supports client-side rendering for dynamic updates and enhanced user experience.

- **Routing and Navigation:** Next.js offers a built-in routing system for easy navigation between pages.

- **API Integration:** Django serves as the backend framework, providing RESTful APIs to interact with the database and handle business logic.

- **Database Management:** Django's ORM (Object-Relational Mapping) simplifies database management by providing an abstraction layer for interacting with the database.

- **User Authentication and Authorization:** Django's authentication system allows for user registration, login, and secure access control.

- **Component-Based UI:** Next.js utilizes React for building reusable UI components, enabling a modular and maintainable frontend architecture.

- **Styling:** TailwindCSS is used to improve development and design process.

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.9 or higher)
- Django (v4 or higher)
- PostgreSQL

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Niklas-dev/scribbleseekerr.git
   ```

2. Install frontend dependencies:

   ```bash
   cd ../scribbleseekerr_frontend
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd ../scribbleseekerr_backend
   pip install -r requirements.txt
   ```

4. Set up the database:

   - Use the predefined docker compose to start a database with docker `scribbleseekerr_postgres/settings.py`.
     or
   - Create a PostgreSQL database and update the database configuration in `scribbleseekerr_backend/scribbleseekerr_backend/settings.py`.

5. Start the development servers:

   - For frontend development server:

     ```bash
     cd ../scribbleseekerr_frontend
     npm run dev
     ```

   - For backend development server:

     ```bash
     cd ../scribbleseekerr_backend
     python manage.py runserver
     ```

6. Access the application:

   Open your browser and visit `http://localhost:3000` to see the application in action.

## Folder Structure

```
├── scribbleseekerr_backend/            # Django backend project
│   ├── posts/                          # Django app posts
│   ├── users/                          # Django app users
│   ├── scribbleseekerr_backend/        # Django project core
│   └── manage.py                       # Django management script
└── scribbleseekerr_frontend/           # Next.js frontend project
    ├── src/                            # Next.js project logic
    ├── src/app                         # Next.js pages and layouts
    ├── src/components                  # React components
    ├── src/providers                   # React state providers
    ├── src/shared                      # Shared logic between components
    ├── src/styles                      # CSS or styling related files
    ├── /public                         # Static files (images, etc.)
    └── ...
```

## Configuration

- Frontend configuration: Update the frontend settings, if required, in the `frontend/next.config.js` file.

- Backend configuration: Update the backend settings, such as database configuration, CORS settings, etc., in the `scribbleseekerr_backend/settings.py` file.

## Deployment

- Frontend: Deploy the Next.js application using platforms like Vercel, Netlify, or any other preferred hosting service.

- Backend: Deploy the Django application using platforms like Heroku, AWS, or any other preferred hosting service.

Remember to update the relevant configurations (e.g., API endpoints) in the frontend project after deploying the backend.

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please create an issue or submit a pull request.

Please follow the existing coding style and guidelines when contributing to this project.
