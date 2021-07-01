var players = [];

// declaring variables
var wheelRadius = 250;
var pi = Math.PI;
var startAngle = 0;
var angle = 0;
var spinSpeed = 0;
var totalSpinTime = 0;
var elapsedSpinTime = 0;
var spinTimeout;
var anglePerSector = 0;
var ctx;
const canvas = document.querySelector(".wheel");

addPlayers();
drawWheel();

const addBtn = document.querySelector(".btn-add");
addBtn.addEventListener("click", addPlayers);

const spinBtn = document.querySelector(".btn-spin");
spinBtn.addEventListener("click", spin);

// **************************Functions***************************************
// **************************************************************************

function addPlayers() {
	// openPopup returns a destructor function
	let closePopup = openPopup();
	let popup = document.querySelector(".popup");
	popup.appendChild(createEl("h2", "Ajoute des joueurs (Au moins 2)"));

	let plrList = document.createElement("ul", HTMLUListElement);
	plrList.className = "playerList";
	popup.appendChild(plrList);
	players.forEach((player) => {
		plrList.innerHTML += listElement(player);
	});

	popup.appendChild(createEl("label", "Pseudo: "));

	let inp = document.createElement("input", HTMLInputElement);
	inp.type = "text";
	inp.className = "inp-name";
	popup.appendChild(inp);

	let startBtn = document.createElement("button", HTMLButtonElement);
	startBtn.innerText = "Commencer!";
	startBtn.className = "btn btn-start";
	startBtn.onclick = closeAndDraw;
	if (players.length < 2) {
		startBtn.disabled = true;
		startBtn.style.pointerEvents = "none";
	}
