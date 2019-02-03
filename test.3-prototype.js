const div = document.getElementById("test-event");
div.onclick = function() {
    console.log("click!");
}
/**
 * Ajouter une méthode au prototype d'Object
 */
Object.prototype.addText = function (text) {
    t = document.createTextNode(text);
    this.appendChild(t);
}

/**
 * Vérifier qu'une méthode d'un objet est dupliquée pour chaque objet
 */
function Person(prenom) {
    this.name = prenom,
    this.presentMyself = function() {
        console.log("Bonjour, je m'appelle " + this.name);
    }
}
const bob = new Person("Bob");
const billy = new Person("Billy");
if (bob.presentMyself === billy.presentMyself) console.log("même méthode");
else console.log("Pas la même méthode");

Person.prototype.sayHello = function() {
    console.log("Bonjour, je m'appelle " + this.name);
}
if (bob.sayHello === billy.sayHello) console.log("même méthode");
else console.log("Pas la même méthode");

