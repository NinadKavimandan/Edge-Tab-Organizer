var container = document.getElementById("linkList");
//var wrapper = document.getElementById("wrapper");
/*browser.runtime.onMessage.addListener(function(request, sender) {
    if(request.name == "urlInfo")
    {
      if(!isNewEntry(request.payload.title)) return;
      var newTile = document.createElement("div");
      newTile.className = "loadedLink";
      newTile.innerHTML = request.payload.title;
      container.appendChild(newTile);
    }

    else if(request.name == "toggle")
    {
      if(request.payload.flag) wrapper.style.display = "none";
      else wrapper.style.display = "block";
    }
});
*/
var tabs = browser.extension.getBackgroundPage().linkInfo;

function genCorspndPrompt(e)
{
  var promptTile = document.createElement("div");
  var addB = document.createElement("button");
  var removeB = document.createElement("button");
  addB.class = 'addTile';
  removeB.class = 'removeTile';
  addB.innerHTML = 'Add to group';
  removeB.innerHTML = 'Remove from list';
  addB.onclick = function(event) { addTileToCat(e, event);};
  removeB.onclick = function(event) { removeLinkFromList(e, event); };
  promptTile.id = 'p'+e;
  promptTile.className = 'catPrompt';
  promptTile.appendChild(addB);
  promptTile.appendChild(removeB);
  return promptTile;
}

function addTileToCat(e, event)
{
  console.log("Yeah will do it soon");
  var valList;
  /*browser.storage.local.get('valList', function(items) {
    alert(String(items));
    valList = items;
  });*/
  valList = JSON.parse(localStorage.getItem('saved'));
  if(!valList) valList = [];
  if(isAddedAlready(tabs[e].title, valList))
  {
    alert("It\'s been added already");
    return;
  }
  valList.push({title: tabs[e].title, url: tabs[e].link});
  //browser.storage.local.set(valList);
  localStorage.setItem("saved", JSON.stringify(valList));
  alert("Added!");
  togglePrompt(e);
  event.stopPropagation();
}

function printSuccess(item)
{
  console.log("It worked!");
}

function erorHandler(err)
{
  console.log("Failed");
}

function isAddedAlready(e, list)
{
  var maxlen = list.length;
  var i=0;
  alert("Max length: "+maxlen);
  while(i<maxlen)
  {
    if(list[i].title == e) return true;
    i++;
  }
  return false;
}

function removeLinkFromList(e, event)
{
  console.log("Yeah will do it soon");
  event.stopPropagation();
}

function togglePrompt(e)
{
  var targetPrompt = document.getElementById('p'+e);
  if(targetPrompt.style.display == "none") targetPrompt.style.display = "block";
  else targetPrompt.style.display = "none";
}

function loadList()
{
  //var tabs = browser.extension.getBackgroundPage().linkInfo;
  var maxlen =  tabs.length;
  var i=0;
  while(i<maxlen)
    {
      var newTile = document.createElement("div");
      newTile.className = "loadedLink";
      newTile.innerHTML = tabs[i].title;
      var promptTile = genCorspndPrompt(i);
      newTile.id = i;
      newTile.appendChild(promptTile);
      newTile.onclick = function() { togglePrompt(newTile.id); };
      container.appendChild(newTile);
      i++;
    }
}

loadList();

function loadSavedTabs()
{
  //var valList = JSON.parse(localStorage.getItem('saved'));

  browser.runtime.sendMessage({name:'loadTabs'});
}

document.getElementById("saved").addEventListener("click", loadSavedTabs);
