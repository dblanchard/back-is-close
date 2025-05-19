// Firefox Extension - Background Script

// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'check-back-and-close') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      chrome.webNavigation.getAllFrames({ tabId: tab.id }, (frames) => {
        if (frames.length === 1) { // Only the main frame, no history
          chrome.tabs.remove(tab.id);
        } else {
          chrome.tabs.goBack(() => {});
        }
      });

    });
  }
});