var savedTabs = [];
var mtEle = document.createElement("br");
function addToGroup(group, event)
{
  var url = browser.tabs.getSelected();
  var func = browser.runtime.getBackgroundPage(function(page) { sendAdditionReq(url, group, page); });
}

function sendAdditionReq(url, group, page)
{
  page.sendGroupTabInfo(url, group);
}

function success(page)
{
  var container = document.getElementById("container");
  console.log("It worked");
  savedTabs = page.saved;
  var maxlen = savedTabs.length;
  console.log(maxlen);
  var i=0;
  while(i<maxlen)
  {
    var newTile = document.createElement("div");
    newTile.className = "savedTabs";
    newTile.id = savedTabs[i];
    var tmp = i;
    newTile.innerHTML = "&#10010 "+savedTabs[i]+"</br>";
    newTile.onclick = function(event) { addToGroup(saved[tmp], event) };
    container.appendChild(newTile);
    i++;
  }

  var addNewGroup = document.createElement("div");
  addNewGroup.className = "savedTabs";
  addNewGroup.id = "newGroup";
  addNewGroup.innerHTML = "&#10010";
  var ip = document.createElement("input");
  ip.type = "text";
  ip.name = "newGroup";
  ip.id = "new";
  ip.addEventListener("keydown", checkChar);
  addNewGroup.appendChild(ip);
  addNewGroup.appendChild(mtEle);
  container.appendChild(addNewGroup);
}

function checkChar(event)
{
  var grpName = document.getElementById("new").value;
  if(event.keyCode == 13) addToGroup(String(grpName), event);
}

function failed()
{
  console.log("It failed");
}

function loadExistingTabs()
{
  var bg = browser.runtime.getBackgroundPage(function(page) {success(page)});
}
//browser.runtime.getBackgroundPage(function(page) {page.fetchSavedGroupNames();} );
loadExistingTabs();
