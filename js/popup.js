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
  event.stopPropagation();
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
  var tabs = browser.extension.getBackgroundPage().linkInfo;
  var maxlen =  tabs.length;
  var i=0;
  while(i<maxlen)
    {
      var newTile = document.createElement("div");
      newTile.className = "loadedLink";
      newTile.innerHTML = tabs[i].title;
      var promptTile = genCorspndPrompt(tabs[i].id);
      newTile.id = tabs[i].id;
      newTile.appendChild(promptTile);
      newTile.onclick = function() { togglePrompt(newTile.id); };
      container.appendChild(newTile);
      i++;
    }
}

loadList();