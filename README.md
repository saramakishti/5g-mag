# 5G-MAG: A User Interface for Metrics and Consumption Reports

This is a [Next.js](https://nextjs.org/) project created for Advanced Web Technologies course.

## Project Topic

**5G-MAG:** A user interface for metrics and consumption reports.

This project provides a dashboard to visualize Quality of Experience (QoE) metrics and consumption reports using mocked data for demonstration purposes. Additionally, it includes real-time data interactions with a mock Express server to fetch M8 Information and Service Access Information.

## Getting Started

First, clone the project and navigate to the project directory:

```bash
git clone https://github.com/saramakishti/5g-mag
cd 5g-mag
```

## Install Dependencies

Install the necessary dependencies using npm:

```
npm install

# or

npm i
```

## Run the Development Server

The project is set up to run both the Next.js frontend and the mock Express server concurrently. Use the following command to start both servers:

```
npm run dev
```

This command utilizes `concurrently` to run both the frontend and backend servers simultaneously.

- The Next.js frontend server will be running at http://localhost:3000
- The mock Express server will be running at http://localhost:3003

## Available Scripts

- `dev`: Runs both the Next.js frontend and the mock Express server concurrently.

- `dev:next`: Runs only the Next.js frontend server.

- `dev:server`: Runs only the mock Express server.

- `build`: Builds the Next.js project for production.

- `start`: Starts the Next.js server in production mode.

- `lint`: Runs the linter to check for code issues.

## Project Structure

The project is structured as follows:

- **app/**: Contains the Next.js pages.

  - **page.jsx**: The home page of the dashboard.
  - **layout.jsx**: The root layout with the navbar for the project.
  - **qoe-reports.jsx**: Page to display QoE metrics.
  - **consumption-reports.jsx**: Page to display consumption reports.
  - **m8-reports.jsx**: Page to display M8 information.
  - **service-access-reports.jsx**: Page to display service access information.
  - **mock/**: Contains the JSON mocked data that are used to display QoE and Consumption Reports charts.

* **components/**: Contains React components used across the project.

* **utils/**: Contains helper JavaScript functions used across the project.

* **mock-server/**: Contains the mock Express server setup

  - **app.js**: The main server file.
  - **routes/**: Contains route handlers for different endpoints.
