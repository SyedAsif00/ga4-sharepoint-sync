# GA4-SharePoint Sync

This project synchronizes Google Analytics 4 (GA4) data with SharePoint. It uses Express server that retreives the GA4 data and pushes it to SharePoint.


Ensure you have the following installed on your machine:
- Node.js and NPM

### Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```plaintext
PRIVATE_KEY=your_private_key
CLIENT_EMAIL=your_client_email
PROPERTY_ID=your_property_id
TENANT_ID=your_tenant_id
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
SITE_ID=your_site_id
LIST_ID=your_list_id
