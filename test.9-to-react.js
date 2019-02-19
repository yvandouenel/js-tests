// MAP
const fruits = ["Banane", "Pomme", "Kiwi"];
//const liste_fruits = fruits.map(fruit => "<li>" + fruit + "</li>");
const liste_fruits = fruits.map(fruit => `<li class="fruit"> ${fruit}</li>`);
console.log(liste_fruits);

// -- fin de MAP

// spread -- début
// Permet d'étendre un itérable (par exemple une expression de tableau ou une chaîne de caractères) en lieu et place de plusieurs arguments (pour les appels de fonctions) ou de plusieurs éléments (pour les littéraux de tableaux) ou de paires clés-valeurs (pour les littéraux d'objets).
/* Ex 1 : */
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];

console.log("somme = " + sum(...numbers));
// expected output: 6

/* Ex 2 : */
const first = [1, 2, 3];
const second = [4, 5, 6];
const combined = [...first, "a", ...second]; // remplace first.concat(second);
console.log("Tableau combiné : " + combined);

/* Ex 3 :  */
const b = {
  name: "Bob"
};
const r = {
  lastname: "Dylan"
};

const rb = { ...b, ...r };
console.log("Objet avec une combinaison des propriétés : " + rb);
console.log(rb);

// -- fin de spread

// Object Destructuring
const address = {
  street: "rue de la loge",
  city: "Mtp",
  country: "France"
}
/* Méthode classique
const street = address.street;
const city = address.city;
const country = address.country;*/

const { street, city, country } = address; // permet de factoriser address et crée les const street, city et country
// alias :
const { street: st} = address;//crée la constante st qui prend la valeur de address.street;
console.log("Street : " + street);
// -- fin object Destructuring