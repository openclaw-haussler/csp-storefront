# CSP Storefront

Azure-hosted license management application for CSP customers to adjust license allocations via Entra ID authentication.

## Overview
This application enables customers of an Azure Direct CSP to view and modify their license quantities through a simple web storefront interface.

## Tech Stack
- **Frontend**: React (planned)
- **Backend**: Azure Functions (planned)
- **Authentication**: Entra ID (Azure AD)
- **Database**: Existing billing/usage database
- **Hosting**: Azure (App Service / Static Web Apps)

## Project Structure
```
csp-storefront/
├── frontend/           # React application
├── backend/            # Azure Functions
├── docs/               # Documentation
├── .github/
│   └── workflows/      # CI/CD pipelines
└── README.md
```

## Development Setup
See docs/SETUP.md for development environment setup.

## Deployment
See docs/DEPLOYMENT.md for Azure deployment instructions.

## License
Internal use only - proprietary.