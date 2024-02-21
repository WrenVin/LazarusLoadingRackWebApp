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

app.get('/api/readsheet', async (req, res) => {
  try {
    const range = 'Lifting Data!A:N'
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    const rows = response.data.values;
    if (rows.length) {
      //console.log(rows.length);
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
async function findNextAvailableRow(spreadsheetId, sheetTitle) {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: sheetTitle + '!A:A', 
        });

        const rows = res.data.values;
        if (rows && rows.length) {
            return rows.length + 1; // +1 because array is 0-indexed but Sheets rows are 1-indexed
        } else {
            return 1; // If the sheet is empty, start on the first row
        }
    } catch (error) {
        console.error('The API returned an error while trying to find the next available row: ' + error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

app.post('/api/writesheet', async (req, res) => {
    try {
        const body = req.body;
        
        const nextRow = await findNextAvailableRow(spreadsheetId, 'Lifting Entry');
        const values = [
            [
                '', // A is empty
                body.scheduledDate, // B
                body.product, // C
                body.customer, // D
                body.loads, // E
                body.dateLifted, // F
                body.timeLifted, // G
                body.issues, // H
            body.notes, // I
            body.operator, // J
            ],
        ];
        const resource = {
            values,
        };
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: `Lifting Entry!A${nextRow}`, 
            valueInputOption: 'USER_ENTERED',
            resource,
        });
        res.send({status: 'Success', message: 'Data added to Google Sheets'});
    } catch (error) {
        console.error('The API returned an error: ' + error);
        res.status(500).send({status: 'Error', message: 'Failed to write to Google Sheets'});
    }
});
app.get('/api/readOperators', async (req, res) => {
  try {
    const range = 'Operators!A:B'; 
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range,
    });

    const rows = response.data.values;
    if (rows.length) {
      // Skip header row if it exists and directly send data
      res.send(rows.slice(1)); // Adjust based on your spreadsheet structure
    } else {
      res.send([]);
    }
  } catch (error) {
    console.error('Error fetching operator names:', error);
    res.status(500).send(error.toString());
  }
});


