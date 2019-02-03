/*
    Le concept de base est de créer un tableau dans lequel
    on va créer des colonnes dans lesquelles on va créer des cartes
*/
"use strict";
const tableau = (function() {
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
  function Colonne(nom) {
    this.nom = nom;
    this.cartes = [];
    this.elementCol = document.createElement("div");
    this.setNom = function(newnom) {
      this.nom = newnom;
    };
    this.createCarte = function(question, reponse) {
      let carte = new Carte(question, reponse, this.elementCol);
      this.cartes.push(carte);
    };
    this.drawColonne = function() {
      let text = document.createTextNode("Colonne 1");
      this.elementCol.appendChild(text);
      document.body.appendChild(this.elementCol);
      this.elementCol.addEventListener("click", this, false);
      this.elementCol.setAttribute("id", "col1");
      this.elementCol.style.height = "900px";
      this.elementCol.style.width = "300px";
      this.elementCol.style.border = "thick solid #0000FF";
      /* for (let i = 0; i < this.colonnes.length;i ++) {
                this.colonnes[i].drawColonne();
            } */
    };
  }
  function Carte(question, reponse, colonne) {
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
  }
  /*
    Ajout des méthodes dans le constructeur de Carte
  */
    Carte.prototype.drawCarte = function() {
        // Carte
        this.elementCarte.setAttribute("id", "col1");
        this.elementCarte.style.height = "200px";
        this.elementCarte.style.width = "280px";
        this.elementCarte.style.border = "thick solid #00FF00";
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

  /*
    Gestion des événements pour les colonnes
    */
  Colonne.prototype.click = function(e) {
    // do something with this.element...
    /* 

    console.log(this.nom); */
    this.elementCol.style.border = "thick solid #FF0000";
    //console.log(this);
    
  };
  Colonne.prototype.handleEvent = function(e) {
    switch (e.type) {
      case "click":
        this.click(e);
      // add other event types if needed
    }
  };
  /*
    Gestion des événements pour les cartes
    */
    Carte.prototype.click = function(e) {
    
        if(this.elementReponse.style.display == "none") {
            this.elementReponse.style.display = "block"
        } else {
            this.elementReponse.style.display = "none"
        }
        this.elementReponse.style.border = "thick solid #FFFF00";
        //console.log(this); 
    };
    Carte.prototype.handleEvent = function(e) {
        switch (e.type) {
        case "click":
            this.click(e);
        // add other event types if needed
        }
    };

  // retourne l'objet tableau
  return new Tableau("anonyme");
})();
//tableau.createColonne("En cours d'acquisition");
tableau.setNom("js");
// colonne
tableau.createColonne("En cours d'acquisition");
tableau.colonnes[0].drawColonne();

// carte
tableau.colonnes[0].createCarte(
    "Le js s'est-il d'abord appelé livescript ?",
    "oui"
  );
tableau.colonnes[0].cartes[0].drawCarte();

console.log(tableau);
