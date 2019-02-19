const div_test = document.createElement("div");
div_test.setAttribute("id","test-event");
const txt = document.createTextNode("Click Me!!! ");
div_test.appendChild(txt);
document.body.appendChild(div_test);

const div = document.getElementById("test-event");
div.onclick = function() {
    console.log("click!");
}

/*
    Ajout d'une méthode dans le prototype d'object
*/
Object.prototype.addText = function(txt) {
    const t = document.createTextNode(txt);
    this.appendChild(t);
}


/**
 * créer plusieurs éléments du dom et les ajouter au dom
 */
const button = document.createElement("button");
button.addText("Voir ou cacher les éléments de la liste");
document.body.appendChild(button);

const ul = document.createElement("ul");
ul.setAttribute("id","ul-toggle");
let li;
let text;
document.body.appendChild(ul);
for(let i = 0; i < 5; i++) {
  li = document.createElement("li");
  text = document.createTextNode("item " + i);
  li.appendChild(text);
  ul.appendChild(li);
}

/**
 * Gestion des événements
 */
button.onclick = function() {
    console.log("click sur ul avant de cacher les li fils");
    const lis = ul.getElementsByTagName("li");
    for(let i = 0; i < lis.length; i++) {
        if(lis[i].style.display != "none") {
            lis[i].style.display = "none";  
        } else {
            lis[i].style.display = "block";
        }
         
    }
    
}


