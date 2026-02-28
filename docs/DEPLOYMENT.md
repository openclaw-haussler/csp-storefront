# Deployment Guide

## Azure Prerequisites
- Azure subscription
- Resource group created
- App Service plan configured
- Database accessible (network security)

## Frontend Deployment
1. Build React app:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to Azure Static Web Apps:
   ```bash
   az staticwebapp deploy \
     --name csp-storefront \
     --source ./frontend/build \
     --resource-group <your-resource-group>
   ```

## Backend Deployment
1. Publish Azure Functions:
   ```bash
   cd backend
   func azure functionapp publish <your-function-app-name>
   ```

## Database Configuration
- Ensure database is accessible from Azure App Service
- Configure network security groups as needed
- Verify connection strings are secure

## Environment Variables
Set in Azure Portal → Function App Configuration → Application Settings.

## Certificate Installation
- Install SSL certificate for Entra ID SSO
- Configure Azure AD application with redirect URIs

## Testing Deployment
1. Access deployed frontend URL
2. Test Entra ID login
3. Verify license display and modification
4. Check backend logs for errors

## Rollback Procedure
- Azure automatically maintains previous versions
- Can revert to previous deployment via Azure Portal
- Database changes are logged and reversible