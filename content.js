// Function to extract the value from the 3rd column of the first row of the table
function extractTableData() {
  const table = document.querySelector('tbody');
  if (table) {
    const firstRow = table.querySelector('tr');
    if (firstRow) {
      const thirdColumnValue = firstRow.cells[2]?.innerText; // Get 3rd column value (index 2)
      if (thirdColumnValue) {
        console.log("updateData----", thirdColumnValue);
        chrome.runtime.sendMessage({ action: 'updateData', data: thirdColumnValue });
      }
    }
  }
}

// Extract data every 2 seconds
setInterval(extractTableData, 500);


// Function to retrieve the value from chrome.storage and update the DOM
function updateTab2DOM() {
  chrome.storage.local.get(['sharedData'], (result) => {
    if (result.sharedData) {
      const targetElement = document.querySelector('#targetElement');
      if (targetElement) {
        targetElement.value = `${result.sharedData}`;
      }
    }
  });
}

// Retrieve and update every 2 seconds
setInterval(updateTab2DOM, 500);
