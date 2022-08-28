// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

// Fonction qui génère toute la page web
function genererPieces(pieces) {

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
}

// Premier affichage de la page
genererPieces(pieces);

// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
	const piecesReordonnees = Array.from(pieces);
	piecesReordonnees.sort(function (a, b) {
		return a.prix - b.prix;
	});

	// Effacement de l'écran et regénération de la page
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesReordonnees);
});

// Ajout du listener pour filter les pièces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return piece.prix <= 35;
	});

	// Effacement de l'écran et regénération de la page avec les pieces filtrées uniquement
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesFiltrees);
});

// Ajout du listener pour trier les pièces par ordre de prix décroissant
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
	const piecesReordonnees = Array.from(pieces);
	piecesReordonnees.sort(function (a, b) {
		// B - A (et pas A - B)
		return b.prix - a.prix;
	});
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesReordonnees);
});

// Ajout du listener pour filter les pièces sans description
const boutonNodesc = document.querySelector(".btn-nodesc");
boutonNodesc.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return Boolean(piece.description);
	});
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesFiltrees);
});

// Récupération du nom des pièces
const noms = pieces.map(piece => piece.nom);

// Boucle for de la fin vers le début
for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].prix > 35) {
		noms.splice(i, 1);
	}
}

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

// Résumé des pièces disponibles
const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].disponibilite === false) {
		nomsDisponibles.splice(i, 1);
		prixDisponibles.splice(i, 1);
	}
}

const disponiblesElement = document.createElement("ul");

for (let i = 0; i < nomsDisponibles.length; i++) {
	const nomElement = document.createElement("li");
	nomElement.innerText = nomsDisponibles[i] + " - " + prixDisponibles[i] + " €";
	disponiblesElement.appendChild(nomElement);
}

document.querySelector(".disponibles").appendChild(disponiblesElement);

// Ajout du listener pour filter les pièces non abordables
const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return piece.prix <= inputPrixMax.value;
	});

	// Effacement de l'écran et regénération de la page avec les pieces filtrées uniquement
	document.querySelector(".fiches").innerHTML = "";
	genererPieces(piecesFiltrees);
});