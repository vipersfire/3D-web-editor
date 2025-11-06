# 3D Web Editor

A full-stack 3D web editor built with React, Three.js, TypeScript, Express, PostgreSQL, and cloud storage integration.

## Features

- **3D Scene Editor**: Create and manipulate 3D objects (cubes, spheres, cones, cylinders) in real-time
- **Transform Controls**: Adjust position, rotation, and scale of objects with intuitive sliders
- **Material Editor**: Change object colors and materials
- **Project Management**: Save, load, and manage multiple 3D projects
- **Cloud Storage**: Upload thumbnails to AWS S3 or Google Cloud Storage
- **Undo/Redo**: Full history support for all scene changes
- **Import/Export**: Export scenes as JSON files and import them back

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Three.js** with React Three Fiber for 3D rendering
- **React Three Drei** for helpful 3D components
- **Tailwind CSS** for styling
- **Shadcn UI** for UI components
- **Axios** for API communication

### Backend
- **Node.js** with **Express**
- **TypeScript** for type safety
- **PostgreSQL** for database
- **Sequelize** ORM
- **AWS S3** or **Google Cloud Storage** for file storage
- **Multer** for file uploads

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+
- AWS account with S3 bucket OR Google Cloud account with Storage bucket
- Git

## Quick Start

See [SETUP.md](./SETUP.md) for detailed setup instructions.

```bash
# 1. Install dependencies
npm install
cd server && npm install && cd ..

# 2. Setup environment variables
cp .env.example .env
cp server/.env.example server/.env
# Edit both .env files with your configuration

# 3. Create database and run migrations
createdb 3d_editor_db
cd server && npm run migrate && cd ..

# 4. Start development servers (in separate terminals)
# Terminal 1:
cd server && npm run dev

# Terminal 2:
npm run dev
```

Visit http://localhost:5173

## Project Structure

```
3D-web-editor/
├── src/                          # Frontend source
│   ├── components/               # React components
│   │   ├── ui/                  # UI components (Button, Card, etc.)
│   │   ├── Scene3D.tsx          # 3D canvas and objects
│   │   ├── Toolbar.tsx          # Top toolbar
│   │   ├── LeftSidebar.tsx      # Object creation sidebar
│   │   └── RightSidebar.tsx     # Properties panel
│   ├── lib/                     # Utilities and API
│   │   ├── api.ts               # API client
│   │   └── utils.ts             # Helper functions
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # App entry point
│   └── index.css                # Global styles
├── server/                       # Backend source
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   ├── controllers/         # Route controllers
│   │   ├── middleware/          # Express middleware
│   │   ├── models/              # Database models
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   │   └── storage/         # Storage services (S3/GCP)
│   │   ├── migrations/          # Database migrations
│   │   └── index.ts             # Server entry point
│   └── package.json
└── README.md

```

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/thumbnail` - Upload thumbnail

### Health Check

- `GET /api/health` - Server health check

## Usage

1. **Adding Objects**: Click on the object buttons in the left sidebar (Cube, Sphere, Cone, Cylinder)
2. **Selecting Objects**: Click on objects in the 3D scene or select them from the objects list
3. **Editing Properties**: Use the right sidebar to adjust position, rotation, scale, and color
4. **Camera Controls**:
   - Left mouse drag: Rotate camera
   - Right mouse drag: Pan camera
   - Scroll: Zoom in/out
5. **Saving Projects**: Click "Save" in the toolbar to save to the database
6. **Loading Projects**: Click "Load" to load existing projects
7. **Export/Import**: Use Export/Import buttons for local JSON files

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.