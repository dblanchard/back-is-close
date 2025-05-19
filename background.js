// Firefox Extension - Background Script

// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'check-back-and-close') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: checkAndCloseTab
      });
    });
  }
});

function checkAndCloseTab() {
  if (window.history.length <= 1) {
    window.close();
  } else {
    history.back();
  }
}