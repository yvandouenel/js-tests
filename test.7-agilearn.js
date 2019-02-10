/*
    Le concept de base est de créer un tableau dans lequel
    on va créer des colonnes dans lesquelles on va créer des cartes
    A partir du précédent script, on va pouvoir
    - utiliser les class à la place des fonctions constructeur
    - ajouter le mécanisme pour supprimer une carte : utilisation de splice et de removeChild
    - ajouter le mécanisme pour modifier les cartes (question et réponse)
    - ajouter le mécanisme pour déplacer une carte d'une colonne à l'autre
*/
"use strict";
const tableau = (function() {
  class Tableau {
    // constructeur du tableau
    constructor(nom) {
      this.nom = nom;
      this.colonnes = [];
    }
    // Méthodes
    setTableauNom(newnom) {
      this.nom = newnom;
    }

    createColonne(nom) {
      let col = new Colonne(nom, this);
      this.colonnes.push(col);
    }

    drawTableau() {
      for (let i = 0; i < this.colonnes.length; i++) {
        this.colonnes[i].drawColonne();
      }
    }
  }

  class Colonne {
    //constructeur de la colonne
    constructor(nom, tableau) {
      this.nom = nom;
      this.tableau = tableau;
      this.cartes = [];
      this.elementCol = document.createElement("div");
      this.buttonPlus = document.createElement("div");

      // gestion des événements
      this.buttonPlus.onclick = function(e) {
        const newCarte = this.createCarte("question", "réponse");
        newCarte.drawCarte();
      }.bind(this);
    }

    // Méthodes
    setNom(newnom) {
      this.nom = newnom;
    }
    createCarte(question, reponse) {
      let carte = new Carte(question, reponse, this, this.tableau);
      this.cartes.push(carte);
      return carte;
    }
    drawColonne() {
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
    }
  }

  
  class Carte {
    // constructeur de la carte
    constructor(question, reponse, colonne, tableau) {
      this.question = question;
      this.reponse = reponse;
      this.colonne = colonne;
      this.tableau = tableau;
      this.elementCarte = document.createElement("div");
      this.elementQuestion = document.createElement("div");
      this.elementReponse = document.createElement("div");
      this.elementDelete = document.createElement("div");
      this.elementModify = document.createElement("div");
      this.elementInputQuestion = document.createElement("input");
      this.elementInputReponse = document.createElement("input");
      this.elementMoveRight = document.createElement("div");

      // gestion des événements : le bind permet d'associer l'objet carte à ses éléments enfants
      this.elementQuestion.onclick = function(e) {
        if (this.elementReponse.style.display == "none") {
          this.elementReponse.style.display = "block";
        } else {
          this.elementReponse.style.display = "none";
        }
        this.elementReponse.style.border = "thick solid #FFFF00";
      }.bind(this);

      this.elementDelete.onclick = function(e) {
        const result = confirm("Sûr.e de vouloir supprimer cette carte ?");
        if (result) {
          this.deleteCarte();
        }
      }.bind(this);

      this.elementModify.onclick = function(e) {
        this.showFormElements();
      }.bind(this);

      this.elementInputQuestion.onblur = function(e) {
        this.setQuestion(this.elementInputQuestion.value);
        this.elementQuestion.textContent = this.elementInputQuestion.value;
        
        // Affiche à nouveau les éléments de la carte
        const all_elements = this.elementCarte.childNodes; 
        for(let i = 0; i < all_elements.length; i++) {
          all_elements[i].style.display = "block";
        }
        // Cache les éléments de formulaire
        this.elementInputQuestion.style.display = "none";
        this.elementInputReponse.style.display = "none";
      }.bind(this);

      this.elementInputReponse.onblur = function(e) {
        this.setReponse(this.elementInputQuestion.value);
        this.elementReponse.textContent = this.elementInputReponse.value;
        
        // Affiche à nouveau les éléments de la carte
        const all_elements = this.elementCarte.childNodes; 
        for(let i = 0; i < all_elements.length; i++) {
          all_elements[i].style.display = "block";
        }
        // Cache les éléments de formulaire
        this.elementInputQuestion.style.display = "none";
        this.elementInputReponse.style.display = "none";
      }.bind(this);

      this.elementMoveRight.onclick = function(e) {
        this.moveRight();
      }.bind(this);
      
    }
    
    // Méthodes
    setQuestion(newquestion) {
      this.question = newquestion;
    };
    setReponse(newreponse) {
      this.reponse = newreponse;
    };
    showFormElements() {
      // cache tous les éléments de la carte
      const all_elements = this.elementCarte.childNodes; 
      for(let i = 0; i < all_elements.length; i++) {
        all_elements[i].style.display = "none";
      }

      this.elementInputQuestion.style.display = "block";
      this.elementInputReponse.style.display = "block";
    }
    drawCarte() {
      // Carte
      this.elementCarte.setAttribute("id", "col1");
      this.elementCarte.style.height = "200px";
      this.elementCarte.style.width = "290px";
      this.elementCarte.style.border = "thick solid #000000";
    
      // bouton modify
      let text = document.createTextNode("Modifier");
      this.elementModify.appendChild(text);
      this.elementCarte.appendChild(this.elementModify);
  
      // Question
      text = document.createTextNode(this.question);
      this.elementQuestion.appendChild(text);
      this.elementCarte.appendChild(this.elementQuestion);
      this.colonne.elementCol.appendChild(this.elementCarte); // ajout de la carte à la colonne
  
      // réponse
      text = document.createTextNode(this.reponse);
      this.elementReponse.appendChild(text);
      this.elementCarte.appendChild(this.elementReponse);
      this.elementReponse.style.display = "none";

      // bouton delete
      text = document.createTextNode("Supprimer");
      this.elementDelete.appendChild(text);
      this.elementCarte.appendChild(this.elementDelete);

      // Crée et cache les éléments du formulaire
      this.elementInputQuestion.type = "text";
      this.elementInputQuestion.className = "input-question"; 
      this.elementInputQuestion.defaultValue = this.question; 
      this.elementCarte.appendChild(this.elementInputQuestion);
      this.elementInputQuestion.style.display = "none";

      this.elementInputReponse.type = "text";
      this.elementInputReponse.className = "input-reponse"; 
      this.elementInputReponse.defaultValue = this.reponse; 
      this.elementCarte.appendChild(this.elementInputReponse);
      this.elementInputReponse.style.display = "none";

      // flèche droite
      text = document.createTextNode("->");
      this.elementMoveRight.appendChild(text);
      this.elementCarte.appendChild(this.elementMoveRight);
      this.elementMoveRight.style.float = "right";
    }
    deleteCarte() {
      // 1 supprimer la carte du tableau de cartes de la colonne
       this.colonne.cartes.splice( this.colonne.cartes.indexOf(this, 1 ) );

       // 2 supprimer l'element du dom qui correspond à cette carte
       this.elementCarte.parentNode.removeChild(this.elementCarte);
    }
    moveRight() {
      // 1 supprimer la carte du tableau de cartes de la colonne
      this.colonne.cartes.splice( this.colonne.cartes.indexOf(this, 1 ) );
      /* 2 Ajouter l'element du dom qui correspond à cette carte à la colonne suivante
       1.1 - Vérifie s'il y a bien une colonne de plus... 
      */
      let num_col = this.tableau.colonnes.indexOf(this.colonne, 1);
      if (num_col == -1) num_col = 0;
      console.log("Numéro de colonne ce cette carte : " + num_col);
      console.log("Nombre de colonnes : " + this.tableau.colonnes.length);
      if(this.tableau.colonnes.length - num_col > 1) {
        this.tableau.colonnes[num_col+1].cartes.push(this);
        this.colonne = this.tableau.colonnes[num_col+1];
        this.tableau.colonnes[num_col+1].elementCol.appendChild(this.elementCarte);
      }

      //this.elementCarte.parentNode.removeChild(this.elementCarte);

    }
  }
  
  // retourne l'objet tableau qui est public puisque créé dans le SCOPE global
  return new Tableau("anonyme");
})();

//tableau.createColonne("En cours d'acquisition");
tableau.setTableauNom("js");
// colonnes
tableau.createColonne("En cours d'acquisition", tableau);
tableau.colonnes[0].drawColonne();

tableau.createColonne("Je sais un peu");
tableau.colonnes[1].drawColonne();

tableau.createColonne("Je sais bien");
tableau.colonnes[2].drawColonne();

tableau.createColonne("Je sais très bien");
tableau.colonnes[3].drawColonne();

// carte
tableau.colonnes[0].createCarte(
  "Le js s'est-il d'abord appelé livescript ?",
  "oui"
);
tableau.colonnes[0].cartes[0].drawCarte();

console.log(tableau);
