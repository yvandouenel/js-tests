/*
    Le concept de base est de créer un tableau dans lequel
    on va créer des colonnes dans lesquelles on va créer des cartes
    A partir du précédent script, on va pouvoir
    - ajouter le mécanisme pour supprimer une carte
    - ajouter le mécanisme pour modifier les cartes (question et réponse)
    - ajouter le mécanisme pour déplacer une carte d'une colonne à l'autre
*/
"use strict";
const tableau = (function() {
  // constructeur du tableau
  function Tableau(nom) {
    this.nom = nom;
    this.colonnes = [];
    this.setNom = function(newnom) {
      this.nom = newnom;
    };
    this.setTableauNom = function(newnom) {
      this.nom = newnom;
    };
    this.createColonne = function(nom) {
      let col = new Colonne(nom);
      this.colonnes.push(col);
    };
    this.drawTableau = function() {
      for (let i = 0; i < this.colonnes.length; i++) {
        this.colonnes[i].drawColonne();
      }
    };
  }

  //constructeur de la colonne
  function Colonne(nom) {
    const self= this;

    this.nom = nom;
    this.cartes = [];
    this.elementCol = document.createElement("div");
    this.buttonPlus = document.createElement("div");
    this.setNom = function(newnom) {
      this.nom = newnom;
    };
    this.createCarte = function(question, reponse) {
      let carte = new Carte(question, reponse, this.elementCol);
      this.cartes.push(carte);
      return carte;
    };
    this.drawColonne = function() {
      let text = document.createTextNode(this.nom);
      this.elementCol.appendChild(text);
      document.body.appendChild(this.elementCol);
      this.elementCol.addEventListener("click", this, false);
      this.elementCol.setAttribute("id", "col1");
      this.elementCol.style.height = "900px";
      this.elementCol.style.width = "295px";
      this.elementCol.style.border = "thick solid #0000FF";
      this.elementCol.style.float = "left";
      this.elementCol.style.marginRight = "40px";
      
      //Ajout du bouton d'ajout
      text = document.createTextNode("Ajouter une carte");
      this.buttonPlus.appendChild(text);
      this.elementCol.appendChild(this.buttonPlus);
      this.buttonPlus.setAttribute("id", "button1");
      this.buttonPlus.style.height = "25px";
      this.buttonPlus.style.width = "285px";
      this.buttonPlus.style.border = "thick solid #00FF00";
    };

    // gestion des événements
    this.buttonPlus.onclick = function(e) {
      const newCarte = self.createCarte("question", "réponse");
      newCarte.drawCarte();
    }
  }

  // constructeur de la carte
  function Carte(question, reponse, colonne) {
    const self = this;

    this.question = question;
    this.reponse = reponse;
    this.elementColonne = colonne;
    this.elementCarte = document.createElement("div");
    
    this.elementReponse = document.createElement("div");
    this.setQuestion = function(newquestion) {
      this.question = newquestion;
    };
    this.setReponse = function(newreponse) {
      this.repo, (se = newreponse);
    };

    // gestion des événements
    this.elementCarte.onclick = function(e) {
      if(this.elementReponse.style.display == "none") {
        this.elementReponse.style.display = "block"
      } else {
        this.elementReponse.style.display = "none"
      }
      this.elementReponse.style.border = "thick solid #FFFF00";
      }.bind(this);
      
  }
  /*
    Ajout des méthodes dans le constructeur de Carte via le prototype
  */
    Carte.prototype.drawCarte = function() {
        // Carte
        this.elementCarte.setAttribute("id", "col1");
        this.elementCarte.style.height = "200px";
        this.elementCarte.style.width = "290px";
        this.elementCarte.style.border = "thick solid #000000";
        this.elementCarte.addEventListener("click", this, false);

        // Question
        let text = document.createTextNode(this.question);
        this.elementCarte.appendChild(text);
        this.elementColonne.appendChild(this.elementCarte);
        
        // réponse
        text = document.createTextNode(this.reponse);
        this.elementReponse.appendChild(text);
        this.elementCarte.appendChild(this.elementReponse);
        this.elementReponse.style.display = "none";
    };

  // retourne l'objet tableau qui est public puisque créé dans le SCOPE global
  return new Tableau("anonyme");
})();
//tableau.createColonne("En cours d'acquisition");
tableau.setNom("js");
// colonnes
tableau.createColonne("En cours d'acquisition");
tableau.colonnes[0].drawColonne();

tableau.createColonne("Je sais un peu");
tableau.colonnes[1].drawColonne();

// carte
tableau.colonnes[0].createCarte(
    "Le js s'est-il d'abord appelé livescript ?",
    "oui"
  );
tableau.colonnes[0].cartes[0].drawCarte();

console.log(tableau);