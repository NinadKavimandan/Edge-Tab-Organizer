let isVisible = false;
browser.browserAction.onClicked.addListener(function(tab) {
  browser.runtime.sendMessage({name: 'toggle', payload: {flag: isVisible}});
  isVisible = ~isVisible;
});

browser.runtime.onMessage.addListener(function (request, sender) {
  if (request.name === 'bounce') {
    var curUrl = document.location.href;
    browser.tabs.sendMessage(sender.tab.id, {url: curUrl});
  }
});
