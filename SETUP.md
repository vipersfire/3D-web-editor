# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 2. Setup PostgreSQL Database

Make sure PostgreSQL is installed and running, then create the database:

```bash
# Using createdb command
createdb 3d_editor_db

# OR using psql
psql -U postgres
CREATE DATABASE 3d_editor_db;
\q
```

### 3. Configure Environment Variables

#### Frontend (.env in root directory)

```bash
cp .env.example .env
```

Content should be:
```
VITE_API_URL=http://localhost:3001/api
```

#### Backend (server/.env)

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your settings:

**For AWS S3:**
```env
PORT=3001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=3d_editor_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

STORAGE_PROVIDER=aws
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your-bucket-name

CORS_ORIGIN=http://localhost:5173
```

**For Google Cloud Storage:**
```env
PORT=3001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=3d_editor_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

STORAGE_PROVIDER=gcp
GCP_PROJECT_ID=your-project-id
GCP_STORAGE_BUCKET=your-bucket-name
GCP_KEY_FILE=./gcp-key.json

CORS_ORIGIN=http://localhost:5173
```

### 4. Run Database Migrations

```bash
cd server
npm run migrate
```

### 5. Start Development Servers

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6. Open in Browser

Navigate to http://localhost:5173

## Cloud Storage Setup

### AWS S3 Setup

1. Go to AWS Console → S3
2. Create a new bucket (e.g., `my-3d-editor-storage`)
3. Go to IAM → Users → Create User
4. Attach policy: `AmazonS3FullAccess`
5. Create access key
6. Copy Access Key ID and Secret Access Key to `.env`

### GCP Storage Setup

1. Go to Google Cloud Console
2. Create a new project or select existing
3. Enable Cloud Storage API
4. Create a storage bucket
5. Go to IAM & Admin → Service Accounts
6. Create service account with "Storage Admin" role
7. Create and download JSON key
8. Save as `server/gcp-key.json`
9. Update `server/.env` with project ID and bucket name

## Troubleshooting

### "Database connection failed"
- Check if PostgreSQL is running: `pg_isready`
- Verify credentials in `server/.env`
- Ensure database exists: `psql -l`

### "Port 3001 already in use"
- Change PORT in `server/.env`
- Update VITE_API_URL in root `.env`

### "Cannot upload files"
- Verify cloud storage credentials
- Check bucket permissions
- Ensure bucket name is correct

### "CORS error"
- Verify CORS_ORIGIN in `server/.env` matches frontend URL
- Check if backend is running

## Useful Commands

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd server
npm run dev          # Start development server
npm run build        # Compile TypeScript
npm start            # Run production build
npm run migrate      # Run migrations
npm run migrate:undo # Rollback last migration
```

## Testing the Setup

1. Open http://localhost:5173
2. Click on "Cube" to add a 3D cube
3. Click on the cube to select it
4. Use the right sidebar to change its color
5. Click "Save" to save the project
6. Check the database: `psql 3d_editor_db -c "SELECT * FROM projects;"`

## Next Steps

- Customize the UI colors in `tailwind.config.js`
- Add more 3D object types in `Scene3D.tsx`
- Implement user authentication
- Add collaboration features
- Deploy to production

Enjoy building with the 3D Web Editor!
