let isVisible = false;
browser.browserAction.onClicked.addListener(function(tab) {
  browser.runtime.sendMessage({name: 'toggle', payload: {flag: isVisible}});
  isVisible = ~isVisible;
});

var linkInfo = [];
var linkCnt = 0;
browser.runtime.onMessage.addListener(function (request, sender) {
  if (request.name === 'bounce') {
    var curUrl = document.location.href;
    browser.tabs.sendMessage(sender.tab.id, {url: curUrl});
  }
  else if(request.name == 'urlInfo') {
    if(isPresent(request.payload.title)) return;
    linkInfo[linkCnt].title = request.payload.title;
    linkInfo[linkCnt].link = request.payload.url;
    appendToBg();
  }
});


var container = document.getElementById("linkList");
function appendToBg()
{
  var newTile = document.createElement("div");
  newTile.className = "loadedLink";
  newTile.innerHTML = request.payload.title;
  container.appendChild(newTile);
}

function isPresent(title)
{
    var i=0;
    while(i<linkCnt)
    {
      if(linkInfo[i].title == title) return true;
      i++;
    }
    return false;
}
