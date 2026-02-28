# CSP Storefront - Design Document

## Overview
CSP Storefront is an Azure-hosted web application that enables customers of an Azure Direct CSP to manage their license allocations. Customers log in using their existing Entra ID credentials and can adjust their license quantities through a simple storefront interface.

## Key Requirements
- Hosted in Azure
- Azure Direct CSP context (AOBO enabled for all customers)
- Entra ID authentication (customer's existing login)
- License quantity adjustment interface
- Integration with existing billing/usage database
- Initial license quantities pulled from database
- Extensible architecture for additional data sources

## Architecture

### Frontend
- SPA framework (React/Angular/Vue - TBD)
- Azure-hosted (Azure App Service / Azure Static Web Apps)
- Responsive design for storefront
- Authentication integration with Entra ID

### Backend
- Azure-hosted API (Azure Functions / App Service)
- RESTful endpoints for:
  - User authentication (Entra ID integration)
  - License query (current quantities)
  - License modification (add/remove licenses)
  - Usage/billing data integration
- Database connectivity (existing billing/usage database)

### Authentication
- Azure AD / Entra ID Single Sign-On
- Use customer's AOBO-verified Entra ID credentials
- Role-based access (customer admin only)
- Token-based session management

### Data Flow
1. Customer authenticates via Entra ID
2. App verifies customer's CSP customer relationship
3. App queries database for current license quantities
4. Customer views current allocation in storefront
5. Customer submits license adjustment request
6. Backend validates request and updates allocation
7. Integration with billing system for charges

## Technical Stack Options

### Frontend Options
- **React**: Popular, extensive ecosystem
- **Angular**: Enterprise-ready, TypeScript-first
- **Vue**: Lightweight, progressive framework

### Backend Options
- **Azure Functions**: Serverless, pay-per-use
- **App Service**: Full app hosting, easier debugging
- **Static Web Apps**: Free with Azure Auth, auto-deploy from GitHub

### Database Integration
- Existing PostgreSQL/SQL Server database
- ODBC/ADO.NET connection for billing data
- Caching layer (Azure Cache for Redis) for performance

## Security Considerations
- AOBO verification on every login
- CSP customer relationship validation
- Rate limiting on license adjustment endpoints
- Audit logging of all license changes
- RBAC for different customer roles
- CORS restrictions for Azure-hosted only

## Development Phases

### Phase 1: MVP
- Basic Entra ID authentication
- License quantity display
- Simple add/remove license form
- Database integration for current quantities

### Phase 2: Enhancements
- License type selection (different SKU types)
- Usage trend visualization
- Purchase history display
- Error handling and user feedback

### Phase 3: Advanced
- Bulk license changes
- Scheduled adjustments
- Notification system (email/portal)
- Analytics dashboard

## Integration Points
- Existing billing database (primary source)
- Azure CSP API (for verification)
- Entra ID authentication service
- Email service (notifications)
- Analytics service (usage tracking)

## Deployment Plan
1. GitHub repository setup
2. CI/CD pipeline (GitHub Actions)
3. Azure App Service / Static Web Apps deployment
4. Entra ID application registration
5. AOBO verification testing
6. Customer pilot deployment
7. Full rollout

## Success Metrics
- User authentication success rate
- License update accuracy
- Response time under 2 seconds
- Zero data integrity issues
- Customer satisfaction rating

## Open Questions
- Which frontend framework to use?
- Database connection details and access patterns
- License SKU types and variations
- Approval workflow requirements (auto-approve or manual?)
- Notification preferences and delivery
- Multi-tenant vs single-tenant architecture