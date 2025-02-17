let button = document.getElementById('find-tables');

// Add button functionality
button.onclick = function(element) {
  
  chrome.runtime.sendMessage({ action: 'fetchTitle' }, (response) => {
    document.getElementById('pageTitle').textContent = response.title;
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: 'scraper.js',
    });
  });
};
