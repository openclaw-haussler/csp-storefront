# CSP Storefront - Design Document

## Overview

CSP Storefront is an Azure-hosted web application designed for customers of an Azure Direct CSP to manage their license allocations through a simple, user-friendly storefront interface. The solution leverages existing Entra ID authentication (AOBO) and integrates with customer billing data to provide license management without requiring separate credentials or complex processes.

## Problem Statement

Azure CSP customers currently need specialized knowledge or access to manage their license allocations. Existing tools may be fragmented or require administrative privileges beyond typical customer access. CSP Storefront simplifies this by providing:

- A unified, intuitive storefront interface
- Seamless authentication using customer's existing Entra ID credentials
- Direct integration with billing and usage data
- Simplified license management workflow

## Solution Overview

### Core Capabilities

1. **Entra ID Authentication**
   - Uses customer's existing AOBO-verified Entra ID credentials
   - Single sign-on experience with no additional registration required
   - Token-based secure authentication

2. **License Management**
   - View current license allocations across all subscription types
   - Adjust license quantities (add/remove)
   - Real-time updates from billing database

3. **Data Integration**
   - Pulls current license quantities from existing billing/usage database
   - Extensible architecture for additional data sources
   - Verified customer relationship validation

### Technical Architecture

#### Frontend Stack
- **Framework**: React (chosen for: extensive ecosystem, strong community support, excellent developer experience)
- **Styling**: Ant Design (enterprise-grade UI components, consistent design system)
- **Authentication**: MSAL.js (@azure/msal-browser) for Entra ID integration
- **HTTP Client**: Axios for API calls
- **Routing**: React Router for navigation
- **Hosting**: Azure Static Web Apps (free tier, automatic HTTPS, global CDN)

#### Backend Stack
- **Runtime**: Azure Functions (serverless, cost-effective)
- **Language**: Python (Flask for development, Azure Functions compatible)
- **API Design**: RESTful endpoints with JSON responses
- **Authentication**: Token-based with Azure AD verification
- **CORS**: Configured for Azure-hosted origins only

#### Database Integration
- Direct connection to existing billing/usage database
- ODBC/ADO.NET drivers for PostgreSQL/SQL Server
- Caching layer with Azure Cache for Redis (performance optimization)
- Audit logging for all license changes

### Security Model

1. **Authentication Security**
   - Every login verifies AOBO relationship
   - Token rotation and refresh
   - Secure session management
   - Role-based access (customer admin only)

2. **API Security**
   - Bearer token authentication on all protected endpoints
   - Rate limiting on license adjustment endpoints
   - CORS restrictions to Azure-hosted origins only
   - Audit logging of all license modifications

3. **Data Security**
   - SSL/TLS for all communications
   - Least privilege database access
   - Encrypted connection strings in environment
   - Role-based database permissions

## Development Phases

### Phase 1: MVP (Minimum Viable Product)

**Goals**: Core functionality with basic authentication and license display

- Entra ID authentication with MSAL.js
- License quantity display from database
- Simple add/remove license form
- Basic error handling and user feedback
- Azure Static Web Apps deployment
- GitHub Actions CI/CD pipeline

**Success Metrics**:
- User authentication success rate > 95%
- License display accuracy 100%
- Page load time < 2 seconds
- Zero authentication errors in production

### Phase 2: Enhanced User Experience

**Goals**: Improve usability and provide additional value

- License type selection (different SKU categories)
- Usage trend visualization (simple charts)
- Purchase history display
- Better error handling and user feedback
- Responsive mobile design optimization
- Dark mode support

**Success Metrics**:
- User engagement > 60% daily active users
- 80% of users complete at least one license adjustment
- Mobile responsiveness score > 90/100
- Reduced help desk tickets related to license queries

### Phase 3: Advanced Features

**Goals**: Provide enterprise-grade capabilities

- Bulk license changes (multiple SKU types at once)
- Scheduled license adjustments
- Email notifications on changes
- Admin approval workflow for major changes
- Usage analytics dashboard
- Multi-currency support
- API for programmatic access

**Success Metrics**:
- 40% of adjustments use advanced features
- Email notification delivery rate > 95%
- Admin approval processing time < 4 hours
- Zero data integrity issues

## Technical Implementation Details

### Frontend Components

**Authentication Component**
- MSAL configuration with token handling
- Login/logout flow
- Token refresh mechanism
- User info display

**License Display Component**
- Aggregate license count display
- Individual SKU breakdown
- Real-time updates
- Loading states

**License Adjustment Component**
- Form with quantity inputs
- SKU type selection
- Validation rules
- Confirmation dialogs
- Success/error feedback

**Layout Components**
- Responsive header with navigation
- Main content area
- Footer with links
- Mobile navigation

### Backend Endpoints

**Authentication**
- `GET /api/auth/callback` - Entra ID callback handler
- Token validation and user info

**License Query**
- `GET /api/licenses` - Retrieve current license allocation
  - Authorization header required
  - Returns JSON with total count and SKU breakdown

**License Adjustment**
- `POST /api/licenses/adjust` - Submit license changes
  - Authorization header required
  - JSON body with SKU types and quantities
  - Validation and database update
  - Returns confirmation and estimated cost

**Audit Log**
- Optional endpoint for change history
- User, timestamp, changes made, previous values

### Database Schema (Conceptual)

**Licenses Table**
```sql
- customer_id (PK)
- tenant_id (Azure AD)
- subscription_id
- sku_type
- quantity
- last_updated
- modified_by
```

**Audit Table**
```sql
- log_id (PK)
- customer_id
- action (add/remove/view)
- sku_type
- old_quantity
- new_quantity
- timestamp
- user_id
```

### CI/CD Pipeline

**GitHub Actions Workflow**
1. Run linting on frontend and backend
2. Run unit tests
3. Build frontend (npm run build)
4. Deploy preview environment on PR
5. Deploy to production on main branch push

**Stages**:
- `frontend`: Node.js 18+, npm ci, lint, build
- `backend`: Python 3.9+, pip install, pytest
- `deploy-preview`: Only on pull requests

## Deployment Architecture

### Infrastructure Overview

1. **Azure Static Web Apps**
   - Frontend hosting
   - Automatic HTTPS
   - Global CDN
   - Custom domain support

2. **Azure Functions**
   - Backend API
   - Serverless execution
   - App Service Plan
   - Managed identity for Azure resources

3. **Azure Cache for Redis**
   - API response caching
   - Session management
   - Rate limiting

4. **Database**
   - Existing billing/usage database
   - Connection via VNET integration
   - Managed by customer's existing infrastructure

### Deployment Process

1. Create Azure resources (if not existing)
2. Configure environment variables
3. Register Entra ID application
4. Set up Azure Functions deployment
5. Configure Azure Static Web Apps
6. Deploy and test
7. Enable monitoring and alerts

### Security Deployment Checklist

- [ ] SSL/TLS certificate configured
- [ ] Azure AD application registered with correct scopes
- [ ] CORS configured for Azure-hosted origins
- [ ] Environment variables secured (not committed)
- [ ] Database firewall rules configured
- [ ] Rate limiting enabled on API endpoints
- [ ] Audit logging enabled
- [ ] Monitoring and alerting configured

## Monitoring and Observability

### Key Metrics

1. **User Engagement**
   - Daily active users
   - Session duration
   - Login success/failure rates

2. **System Performance**
   - API response times
   - Frontend load times
   - Error rates

3. **Business Metrics**
   - License adjustment frequency
   - Popular SKU types
   - Cost estimation accuracy

### Alerting

- API error rate > 5%
- Response time > 5 seconds
- Authentication failures > 10/min
- Deployment failures

## Success Criteria

### Technical Metrics

- Authentication success rate > 98%
- API response time < 2 seconds (95th percentile)
- 99.9% uptime
- Zero security incidents
- Mobile responsiveness score > 90/100

### User Experience Metrics

- User satisfaction score > 4.5/5
- Task completion rate > 85%
- Help documentation usage < 10%
- Reduced support tickets related to license management

### Business Metrics

- Adoption rate > 60% of target customers
- Cost savings from streamlined management
- Reduction in manual license operations

## Open Questions and Decisions

### Framework Selection

**Chosen**: React with Ant Design

**Rationale**:
- Large, active community
- Comprehensive component library (Ant Design)
- Strong enterprise adoption
- Excellent TypeScript support (future consideration)
- Good Azure integration documentation

### Hosting Strategy

**Chosen**: Azure Static Web Apps + Azure Functions

**Rationale**:
- Static Web Apps provides free tier with Entra ID
- Functions for backend with automatic scaling
- GitHub Actions integration for CI/CD
- Managed identity simplifies Azure resource access

### Data Source Strategy

**Chosen**: Direct database integration with caching

**Rationale**:
- Real-time data freshness
- Consistent with existing billing system
- Caching for performance
- Extensible for additional data sources

### Approval Workflow

**Initial**: Auto-approve for low-risk changes

**Future**: Admin approval for changes > 10 licenses or certain SKU types

**Rationale**:
- Simplifies initial deployment
- Allows flexibility as usage patterns emerge
- Can be implemented based on real usage data

### Notifications

**Initial**: Email notifications on successful changes

**Future**: Portal dashboard, in-app notifications, webhook integrations

**Rationale**:
- Basic notification for user confirmation
- Can expand based on user feedback
- Aligns with enterprise communication patterns

## Future Enhancements

### Short-term (3-6 months)
- Mobile app (React Native)
- API for third-party integrations
- Advanced filtering and search
- Multi-language support
- Dark mode toggle

### Medium-term (6-12 months)
- Analytics dashboard with trend analysis
- Budget planning tools
- Automated recommendations
- Custom reporting
- Integration with Azure Cost Management

### Long-term (12+ months)
- Bulk import/export capabilities
- Partner portal for MSPs
- Custom SKU support
- AI-powered usage optimization
- Advanced consent management

## Conclusion

CSP Storefront addresses a real pain point in Azure CSP management by providing a simple, secure, and efficient license management interface. The solution leverages existing infrastructure and authentication mechanisms to minimize overhead and maximize user adoption. The phased approach allows for incremental value delivery while maintaining focus on core functionality.

The chosen technology stack provides a solid foundation with flexibility for future enhancements. The security model ensures compliance with industry best practices while maintaining user experience.

## Appendix

### Related Resources

- [Azure CSP Overview](https://learn.microsoft.com/azure/csp/)
- [Azure Entra ID Authentication](https://learn.microsoft.com/entra/identity-platform/)
- [Azure Static Web Apps Documentation](https://learn.microsoft.com/azure/static-web-apps/)
- [Azure Functions Documentation](https://learn.microsoft.com/azure/functions/)

### Glossary

- **CSP**: Cloud Service Provider
- **AOBO**: Assigned by Owner, Owner by Organization (Entra ID feature)
- **Entra ID**: Microsoft's rebranded Azure Active Directory
- **SKU**: Stock Keeping Unit (license type identifier)
- **MSAL**: Microsoft Authentication Library
- **CI/CD**: Continuous Integration/Continuous Deployment

### Contact and Support

- Repository: https://github.com/openclaw-haussler/csp-storefront
- Issues: https://github.com/openclaw-haussler/csp-storefront/issues