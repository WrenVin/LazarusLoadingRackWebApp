const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require('cors');
const email = process.env.EMAIL;
const spreadsheetId = process.env.SHEET_ID;
const apiKey = require('./key.json');
const app = express();
const port = 3000;
const app_password = process.env.APP_PASSWORD;
const personal_email = process.env.PERSONAL_EMAIL;
app.use(cors());
app.use(express.static('.'));
app.use(express.json());

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
const { google } = require('googleapis');


const client = new google.auth.JWT(
  email,
  null,
  apiKey.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);
const sheets = google.sheets({ version: 'v4', auth: client });

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: personal_email, // Your email
      pass: app_password,

    }
});

app.get('/api/readsheet', async (req, res) => {
  try {
    const range = 'Lifting Data!A:N'
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    const rows = response.data.values;
    if (rows.length) {
      console.log(rows.length);
      const headers = rows[0];
      const data = rows.slice(1).map(row => {
        let rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      });
      res.send(data);
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});