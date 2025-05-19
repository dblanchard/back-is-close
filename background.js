// Firefox Extension - Background Script

// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'check-back-and-close') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.tabs.get(tab.id, (tabInfo) => {
        if (tabInfo.url === "about:blank" || tabInfo.url === "about:newtab" || tabInfo.url === "about:home") {
          chrome.tabs.remove(tab.id);
        } else {
          chrome.tabs.goBack(() => {});
        }
      });
    });
  }
});