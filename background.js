// Store the shared data and notify all tabs about the change
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateData') {
    // Store the data in chrome.storage
    chrome.storage.local.set({ sharedData: message.data }, () => {
      console.log('Data updated:', message.data);
    });
  }
});

// Listen for changes in storage and notify all tabs
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.sharedData) {
    // Notify all tabs about the data change
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: updateDOM,
          args: [changes.sharedData.newValue]
        });
      });
    });
  }
});

// Injected function to update DOM in all tabs
function updateDOM(data) {
  const targetElement = document.querySelector('#targetElement');
  if (targetElement) {
    targetElement.value = `${data}`;
  }
}
