// Function to load the Google API
function gapiLoaded() {
    gapi.load('client', initializeGAPI);
  }
  
  // Function to initialize Google API client
  function initializeGAPI() {
    gapi.client.init({
      apiKey: '', // Replace with your actual API key
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(() => {
      console.log("GAPI Initialized");
      fetchSheetData();
    }).catch(error => {
      console.error("Error initializing GAPI:", error);
    });
  }
  
  // Function to fetch data from Google Sheets
  function fetchSheetData() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '', // Replace with your actual Spreadsheet ID
      range: 'Sheet1!A1:G2', // Adjust to your sheet name and range
    }).then(response => {
      console.log("Sheet Data:", response.result);
      displayData(response.result.values);
    }).catch(error => {
      console.error("Error fetching sheet data:", error);
    });
  }
  
  // Function to display data in the table
  function displayData(data) {
    const tableBody = document.querySelector("#sheetData tbody");
    tableBody.innerHTML = ""; // Clear any existing data
  
    // Loop through the data and create table rows
    data.forEach((row) => {
      const tr = document.createElement('tr');
      row.forEach((cell) => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }
  
  // Load the Google API when needed
  function loadGAPI() {
    let script = document.createElement('script');
    script.src = "https://apis.google.com/js/api.js";
    script.onload = gapiLoaded;
    document.body.appendChild(script);
  }
  
  // Load Google API
  loadGAPI();
  