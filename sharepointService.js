// services/sharepointService.js
const fetch = require("isomorphic-fetch");
const dotenv = require("dotenv");
dotenv.config();

const getAccessToken = async () => {
  const response = await fetch(
    `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        scope: "https://graph.microsoft.com/.default",
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    }
  );

  const data = await response.json();
  console.log("Token Response:", data);
  return data.access_token;
};

const pushDataToSharePoint = async (accessToken, reportData) => {
  console.log("Report Data:", reportData);

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/sites/${process.env.SITE_ID}/lists/${process.env.LIST_ID}/items`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Title: "GA4 Analytics Data",
          "Page URL": reportData[0].webUrl,
          NextCheck: "2024-06-30T00:00:00Z",
          VisitsLast30Days: reportData[0].Sessions,
          OrganicVisitsLast30Days: reportData[0]["Active Users"],
          OrganicLeadsLast30Days: reportData[0]["Screen Page Views"],
          BoldPredictions: reportData[0].BoldPredictions,
          TaxRules: reportData[0].TaxRules,
          SpecificDatesDeadlines: reportData[0].SpecificDatesDeadlines,
          FutureInternalLinks: reportData[0].FutureInternalLinks,
          PageType: reportData[0].PageType,
          id: reportData[0].id,
        },
      }),
    }
  );

  const data = await response.json();
  console.log("SharePoint Response:", data);
  return data;
};

module.exports = { getAccessToken, pushDataToSharePoint };
