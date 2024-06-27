// services/ga4Service.js
const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();

const getGA4Data = async () => {
  const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
  const clientEmail = process.env.CLIENT_EMAIL;
  const propertyId = process.env.PROPERTY_ID;

  const jwtClient = new google.auth.JWT(clientEmail, null, privateKey, [
    "https://www.googleapis.com/auth/analytics.readonly",
  ]);

  const analyticsData = google.analyticsdata({
    version: "v1beta",
    auth: jwtClient,
  });

  const response = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [
        {
          startDate: "30daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [
        { name: "date" },
        { name: "newVsReturning" },
        { name: "sessionMedium" },
        { name: "sessionSource" },
        { name: "deviceCategory" },
      ],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
    },
  });

  return response.data;
};

module.exports = { getGA4Data };
