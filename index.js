const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());
const { createClient, createLinkToken } = require("@event-inc/link-backend");
require("dotenv").config();

app.post("/create-link-token", async (request, response) => {
  const client = createClient(process.env.BUILDABLE_SECRET_KEY, {
    baseUrl: process.env.EVENT_INC_API_BASE_URL,
  });

  const { label, group, type, connectionType } = request.body;
  try {
    const linkToken = await createLinkToken(client, {
      label,
      group,
      type,
      connectionType,
      ttl: 24 * 60 * 60 * 1000,
    });

    response.send(linkToken);
  } catch (error) {
    console.log(error, "error");
  }
});

app.listen(1000, () => {
  console.log("Listen on the port 1000...");
});
