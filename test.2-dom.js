/**
 * créer un élément du dom, l'ajouter au dom, voir ses propriété, modifier ses propriétés
 */
const div = document.createElement("div");
let text = document.createTextNode("Texte");
div.appendChild(text);
document.body.appendChild(div);
console.log(div);
for (propriete in text) {
  //console.log(propriete + " : " + div[propriete]);
}
//div.style.
console.log(div.style);
div.style.color = "red";
div.textContent = "un autre texte";

/**
 * créer plusieurs éléments du dom et les ajouter au dom
 * 
 */
const ul = document.createElement("ul");
ul.setAttribute("id","ul-toggle");
let li;
document.body.appendChild(ul);
for(let i = 0; i < 5; i++) {
  li = document.createElement("li");
  text = document.createTextNode("item " + i);
  li.appendChild(text);
  ul.appendChild(li);
}