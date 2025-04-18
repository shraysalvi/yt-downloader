# Eazy-dl Frontend

This is the frontend client for Eazy-dl – a YouTube downloader tool built using React and Vite.

## Features

- Fast development with Vite and Hot Module Replacement (HMR)
- React-based UI with TailwindCSS styling
- Real-time updates via Socket.IO client
- ESLint configured for code quality
- Secure HTTPS/WSS connections in production
- Environment-based configuration

## Prerequisites

- Node.js (v16 or above)
- npm or yarn

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

2. Create a `.env` file in the `frontend` folder with the following:

   ```properties
   # Development environment (default)
   VITE_API_URL=http://localhost:5000
   VITE_SOCKET_URL=ws://localhost:5000
   VITE_USE_SSL=false
   ```

3. For production, create a `.env.production` file:

   ```properties
   # Production environment
   VITE_API_URL=https://api.yourdomain.com
   VITE_SOCKET_URL=wss://api.yourdomain.com
   VITE_USE_SSL=true
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```

   The app will run at [http://localhost:5173](http://localhost:5173).

## Build for Production

To build the production bundle, run:

```sh
npm run build
```
or
```sh
yarn build
```

Preview the production build using:

```sh
npm run preview
```
or
```sh
yarn preview
```

## Environment Configuration

The application supports different environments through environment variables:

- **Development** (default):
  - Uses HTTP/WS connections
  - Connects to localhost:5000
  - No SSL verification

- **Production**:
  - Uses HTTPS/WSS connections
  - Connects to your production domain
  - SSL verification enabled
  - Proper secure headers

## Linting

Run ESLint to check code quality:

```sh
npm run lint
```
or
```sh
yarn lint
```

## Folder Structure

- **src/** – Contains all React source code  
   - **Components/** – Reusable UI components (e.g., Home, Queue)  
   - **services/** – Utility functions (storage, downloads)  
   - **Socket/** – Socket.IO utilities and connection  
- **index.html** – Entry point served by Vite
- **eslint.config.js** – ESLint configuration file

## Further Information

For additional details or troubleshooting, refer to the full project documentation or contact your development team.

Happy downloading!

## Customizing Build Folder Name

By default, Vite outputs the production build files to the `dist` folder. To change the build folder name, update the `build.outDir` option in your `vite.config.js` file. For example:

```javascript
// filepath: /yt-downloader\frontend\vite.config.js
export default defineConfig({
  ...existing code...
  build: {
    outDir: 'custom-build-folder' // change 'custom-build-folder' to your desired folder name
  },
  ...existing code...
})
```

After updating, running the build command will generate the production bundle in your chosen folder.

## Docker Configuration for Frontend

To containerize your frontend, you can use a multi-stage build in your main Dockerfile. For example, add a stage to build the frontend assets and then copy the output into your FastAPI container's static folder:

```dockerfile
// filepath: 
 \yt-downloader\dockerfile
# ...existing base stages...

# Stage: Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install
# Copy the entire frontend source
COPY frontend/ .
# Build production bundle (output defaults to "dist")
RUN npm run build

# Updated FastAPI Stage: Copy built frontend assets into static folder
FROM python:3.10-alpine AS fastapi
...existing code...
# Copy build output from the frontend stage
COPY --from=frontend-build /app/frontend/dist /app/static
...existing code...
```

Update your docker-compose.yml to use the updated Dockerfile targets as needed. This setup builds the frontend assets and serves them from within the backend container.
