# Development Setup

## Prerequisites
- Node.js 18+ (for frontend)
- Python 3.9+ (for backend)
- Azure CLI installed
- GitHub account with read/write access

## Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Environment Variables
Copy `.env.example` to `.env` and configure:

```env
# Azure AD
CLIENT_ID=your-entra-id-client-id
CLIENT_SECRET=your-entra-id-client-secret
TENANT_ID=your-tenant-id

# Database
DB_CONNECTION_STRING=your-database-connection-string
DB_NAME=your-database-name

# API Keys (if needed)
AZURE_SUBSCRIPTION_ID=your-subscription-id
RESOURCE_GROUP=your-resource-group
```

## Testing
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```