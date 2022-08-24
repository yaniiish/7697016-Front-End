// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();
// Création des éléments et remplissage du texte ou de la source de l'image
const ampoule = pieces[0];

// Création des fiches produits
for (let i = 0; i < pieces.length; i++) {
	// Récupération de l'élément du DOM qui accueillera les fiches
	const sectionFiches = document.querySelector(".fiches");

	// Création d’une balise dédiée à une pièce automobile
	const pieceElement = document.createElement("article");

	// On crée l’élément img.
	const imageElement = document.createElement("img");
	// On accède à l’indice i de la liste pieces pour configurer la source de l’image.
	imageElement.src = pieces[i].image;
	// On rattache l’image à pieceElement (la balise article)
	pieceElement.appendChild(imageElement);

	// Idem pour le nom, le prix et la catégorie ...

	const nomElement = document.createElement("h2");
	nomElement.innerText = pieces[i].nom;
	pieceElement.appendChild(nomElement);

	const prixElement = document.createElement("p");
	prixElement.innerText = "Prix : " + pieces[i].prix + " €"
		+ " ("
		+ (pieces[i].prix < 35 ? "€" : "€€€")
		+ ")";
	pieceElement.appendChild(prixElement);

	const categorieElement = document.createElement("p");
	categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
	pieceElement.appendChild(categorieElement);

	const descriptionElement = document.createElement("p");
	descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";
	pieceElement.appendChild(descriptionElement);

	const disponibiliteElement = document.createElement("p");
	disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
	pieceElement.appendChild(disponibiliteElement);

	// On rattache la balise article à la section fiches
	sectionFiches.appendChild(pieceElement);
}

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
const piecesReordonnees = Array.from(pieces);
piecesReordonnees.sort(function(a, b) {
    return a.prix - b.prix
})
console.log(piecesReordonnees);
});


const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= 35;
    });
    console.log(piecesFiltrees);
});

const boutonDescription = document.querySelector(".btn-description")
boutonDescription.addEventListener("click", function(){
    const pieceDescription = pieces.filter(function(piece){
        return piece.description
    })
    console.log(pieceDescription);
})

const boutonTrierDecroissant = document.querySelector(".btn-trierDecroissant")
boutonTrierDecroissant.addEventListener("click", function () {
    const piecesReordonneesDecroissant = Array.from(pieces);
    piecesReordonneesDecroissant.sort(function(a, b){
        return b.prix - a.prix
    })
    console.log(piecesReordonneesDecroissant);
})

const noms = pieces.map(piece => piece.nom);
for (let i= pieces.length - 1; i >= 0; i--){
    if (pieces[i].prix > 35){
        noms.splice(i, 1)
    }
}
console.log(noms);

// Création de l'élément ul
const abordablesElement = document.createElement("ul");

// Création et rattachement des éléments li
for (let i = 0; i < noms.length; i++) {
     const nomElement = document.createElement("li");
     nomElement.innerText = noms[i];
     abordablesElement.appendChild(nomElement);
}

// Rattachement de toute la liste à la page
document.querySelector(".abordables").appendChild(abordablesElement);


//affichage des pièces disponible
const disponibleElement = document.createElement("ul")
document.querySelector(".disponible").appendChild(disponibleElement)

const nomDisponible = pieces.map(piece => piece.nom)
const prixDisponible = pieces.map(piece => piece.prix)

for (let i = pieces.length - 1; i >= 0; i--){
	if (pieces[i].disponibilite === false){
		nomDisponible.splice(i, 1);
		prixDisponible.splice(i, 1);
	}
}

for (let i = 0; i < nomDisponible.length; i++){
	const nomElementDispo = document.createElement("li")
	nomElementDispo.innerText = nomDisponible[i] + prixDisponible[i] + " €"
	disponibleElement.appendChild(nomElementDispo)
}

