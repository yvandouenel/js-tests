/**
 * Ajouter une méthode au prototype d'Object
 */
Object.prototype.addText = function(text) {
  t = document.createTextNode(text);
  this.appendChild(t);
};

/**
 * Vérifier qu'une méthode d'un objet est dupliquée pour chaque objet
 */
function Person(prenom) {
  (this.name = prenom),
    (this.presentMyself = function() {
      console.log("Bonjour, je m'appelle " + this.name);
    });
}
const bob = new Person("Bob");
const billy = new Person("Billy");
if (bob.presentMyself === billy.presentMyself) console.log("même méthode");
else console.log("Pas la même méthode");

Person.prototype.sayHello = function() {
  console.log("Bonjour, je m'appelle " + this.name);
};
if (bob.sayHello === billy.sayHello) console.log("même méthode");
else console.log("Pas la même méthode");

// propriété __proto__

console.log(bob.__proto__ == Person.prototype);
console.log(bob.__proto__.__proto__ == Object.prototype);

// chaîne des prototype
const tab = [1, 2];
console.log(tab.__proto__);
console.log(tab.__proto__.__proto__);

// classe
class Personne {
  constructor(name) {
    this.name = name;
  }

  present() {
    console.log("hello, I'm " + this.name);
  }
}

const p = new Personne("Bob");
p.present();
console.log("personne : ");
console.log(p);

class Teacher extends Personne {
  teach() {
    console.log("Teach");
  }
}
const t = new Teacher("Bob");
console.log("Teacher : ");
console.log(t);
