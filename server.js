// server.js
const express = require("express");
const cors = require("cors");
const { getGA4Data } = require("./ga4Service");
const {
  getAccessToken,
  pushDataToSharePoint,
} = require("./services/sharepointService");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 5001;

app.use(cors());

app.get("/ga4data", async (req, res) => {
  try {
    console.log("Fetching GA4 Data...");
    const ga4Data = await getGA4Data();
    console.log("GA4 Data:", ga4Data);

    const reportData = ga4Data.rows.map((row) => ({
      Date: row.dimensionValues[0].value,
      "New vs Returning": row.dimensionValues[1].value,
      "Session Medium": row.dimensionValues[2].value,
      "Session Source": row.dimensionValues[3].value,
      "Device Category": row.dimensionValues[4].value,
      Sessions: row.metricValues[0].value,
      "Active Users": row.metricValues[1].value,
      "Screen Page Views": row.metricValues[2].value,
      "Bounce Rate": row.metricValues[3].value,
      "Average Session Duration": row.metricValues[4].value,
    }));

    console.log("Report Data:", reportData);
    const accessToken = await getAccessToken();
    const sharePointResponse = await pushDataToSharePoint(
      accessToken,
      reportData
    );

    res.json(sharePointResponse);
  } catch (error) {
    console.error("Error fetching GA4 data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
