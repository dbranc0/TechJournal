let getArray = function(collection) {
  return Array.from(collection);
}

let chars = [];

getArray(document.getElementsByClassName("dropdown-menu scrollable")[0].children).filter(function (item) { 
  return item.outerHTML.includes('role="menuitem"')
}).forEach(function(char) {
  chars.push({htmlName: char.innerText.replaceAll("\n","").trim(), name: char.innerText.replaceAll("\n","").replaceAll(".","").replaceAll(" (","").replaceAll(")","").trim(), moves: {}})
})

chars.forEach(function (char) {
  let currentChar = window.location.href.split("/").pop();
  window.location.href = window.location.href.replace(currentChar, char.htmlName);
  getArray(document.getElementsByClassName("dropdown-menu")[1].children).filter(function (item) { 
    return item.outerHTML.includes('role="menuitem"')
  }).forEach(function (charState) {
    const stateName = charState.innerText.replace("\n","").replaceAll(" ","").trim();
    char.moves[stateName] = [];
    charState.children[0].click();

    let fieldNames = getArray(document.getElementsByTagName("thead")[0].children[0].children).map(function (col) {return col.innerText})
  
    let rows = getArray(document.getElementsByTagName("tbody")[0].children);
  
    rows.forEach(function (move) {
        let data = {};
        getArray(move.children).forEach(function(stat, i) {
          let fieldName = fieldNames[i].trim();
          if (fieldName.split(" ").length > 1) fieldName = fieldName.replace(" ","")
          let statText = stat.innerText;
          if (parseInt(statText) == statText) statText = parseInt(statText);
          data[fieldName] = statText;
      })
        char.moves[stateName].push(data);
    })

  });
  /* let char = {};
  
  char.name = document.getElementsByTagName("h1")[0].innerText;
  char.moves = []; */
  
  
  
  /* char.moves.sort(function (move, othermove) {
    return move.Startup - othermove.Startup;
  }) */

})



