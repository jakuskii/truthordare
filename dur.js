const truthQues = [
	"T'es vierge ?",
	"Tu es plutôt fesses ou seins ?",
	"Tu as déjà vu des gens en train de faire des trucs ?",
	"Avec quelle célébrité aimerais-tu passer une nuit endiablée ?",
	"Tu t'es déjà masturbé ?",
	"Y'a des trucs bizarres qui t'excitent ?",
	"Nomme la fille ou le garçon le / la plus mignon/ne de ta classe",
	"As-tu déjà fait des photos nu(e) ? ",
	"Quel est le plus gros mensonge que tu aies jamais dit à ton/ta partenaire ?" ,
	"Est-ce que tu regardes des pornos ?",
	"Note chaque participant du jeux de 1 a 10 ou de ta classe",
	"As-tu déjà embrassé une personne du sexe oposer ? ",
	"Quel est le prénom de ton premier coup de cœur ?",
	"Est-ce que tu as déjà été infidèle ?",
	"Quel est ton plus grand fantasme sexuel?",
	"Quelle est ton crush en ce moment?",
	"Sodomie ou félation?",
	"Si tu devais faire un plan a 3 quelle  personne tu choisirais pour le faire? ",
	"Si tu devais sortir avec quelqu’un ici ca serait qui ?",
	"Quelle est la personne que tu deteste le plus?",
	"La levrette ou le missionnaire ?",
	"Arrêter de faire l'amour pendant un an ou arrêter de te masturber pendant un an ?",
	"Branler un pote et personne ne le sait ou ne pas le faire et que tout le monde pense que tu l'as fait ?",
	"Voudrais-tu avoir des relations sexuelles avec une personne de ta classe ou se groupe ?",
	"Qui, parmi les personnes de ce groupe, a le plus beau corps ?",
	"Quelle est ta position sexuelle préférée ?",
	"Par devant ou par derriere avec une inconnue",
	"La taille de ta bite ou la taille qui te satisfait",
	"Actrisse /acteur p.... preferee",
	
		
	
];

const dareQues = [
	"Montre tes 5 dernieres discussion (si ta pas ton tel tu montre apres)",
	"Appele  la personne de ton choix  en parlant avec une voix sexy.",
	"Envoie un message coquin à la dernière personne à qui tu as parlé par message !",
	"Choisis un vêtement et enlève-le !",
	"Donne ton telephone a une personne du jeux et laisse la ecrire un message",
	"Filme toi quand tu danse et met la video sur TikTok ou skip  ",
	"Embrasse sur la joue quelqu’un de ce groupe",
	"case un je taime et un nom dun fille ou mec de ta classe  en classe",
	"Quelqun peut te  poser une question et tu dois repondre",
	"Mets une vidéo porno et regarder la.",
	"dessine une bite ou qqch dautre sur le cahier d'une meuf/mec de ta classe",
	"Fait une photo avec louise",
	"repond a un fuck mary kill que les autres joueur vont te poser",
	"Envoie un message disant ‘Je t’aime” à 3 personnes les autre participant choisise a qui.",
	"Laisse une personne du jeux poster un statut story..sur un reseaux",
	"Reste assis(e) sur les genoux d’un des joueurs de ton choix jusqua ton prochain tour!",
	
	


];
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
	popup.appendChild(startBtn);

	inp.addEventListener("keyup", (e) => {
		if (e.key == "Enter") {
			players.push(e.target.value);
			plrList.innerHTML += listElement(e.target.value);
			e.target.value = "";
			if (players.length > 1) {
				startBtn.disabled = false;
				startBtn.style.pointerEvents = "auto";
			}
		}
	});

	// *****************Functions******************

	function closeAndDraw() {
		closePopup();
		drawWheel();
	}

	function listElement(name) {
		return `<li>${name}<button class="btn removePlr" onclick="removePlayer()">X</button>
        </li>`;
	}
}

function tdPopup(person) {
	spinBtn.disabled = false;
	addBtn.disabled = false;

	// openPopup returns a destructor function
	let closePopup = openPopup();
	let popup = document.querySelector(".popup");

	popup.appendChild(createEl("h2", `Le tour de ${person} `));
	popup.appendChild(createEl("p", "Choisit une:"));

	let TruthBtn = document.createElement("button", HTMLButtonElement);
	TruthBtn.innerText = "Vérité!";
	TruthBtn.className = "btn btn-truth";
	TruthBtn.onclick = showQues("Truth");
	popup.appendChild(TruthBtn);

	let DareBtn = document.createElement("button", HTMLButtonElement);
	DareBtn.innerText = "Action!";
	DareBtn.className = "btn btn-dare";
	DareBtn.onclick = showQues("Dare");
	popup.appendChild(DareBtn);

	// *****************Functions*****************

	function showQues(type) {
		return function ret() {
			closePopup();
			let closeIt = openPopup();
			let popup = document.querySelector(".popup");

			popup.appendChild(createEl("h2", `${type}`));

				// openPopup returns a destructor function
		// checks which ques to put in the current popup
			popup.appendChild(
				createEl(
					"p",
					`${
						type == "Dare"
							? shuffle(dareQues)[
									Math.floor(Math.random() * dareQues.length)
							  ]
							: shuffle(truthQues)[
									Math.floor(Math.random() * truthQues.length)
							  ]
					}`
				)
			);

			let doneBtn = document.createElement("button", HTMLButtonElement);
			doneBtn.innerText = "Done";
			doneBtn.className = "btn btn-done";
			doneBtn.onclick = closeIt;
			popup.appendChild(doneBtn);
		};
	}
}

function openPopup() {
	let blurScr = document.createElement("div");
	blurScr.classList.add("blur-bg");
	document.body.appendChild(blurScr);

	let popup = document.createElement("div");
	popup.classList.add("popup");
	document.body.appendChild(popup);

	return function closePopup() {
		blurScr.remove();
		popup.remove();
	};
}

function createEl(tagName, text) {
	let el = document.createElement(tagName);
	el.innerText = text;
	return el;
}

function removePlayer() {
	let item = event.target.parentElement;
	let s = String(item.textContent).trim().slice(0, -1);
	players.splice(players.indexOf(s), 1);
	item.remove();
	if (players.length < 2) {
		let btn = document.querySelector(".btn-start");
		btn.disabled = true;
		btn.style.pointerEvents = "none";
	}
}

function drawWheel() {
	ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, 650, 650);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 3;

	let l = players.length;
	let wheelColors = ["#ad1533", "#15ad8f	", "#e8a30e"];
	anglePerSector = (2 * pi) / l;
	let textRadius = 170;

	// a loop to draw equal sectors for each player on the wheel
	for (let i = 0; i < l; i++) {
		var playerName = players[i];
		angle = startAngle + i * anglePerSector;

		// so that no two same color come together
		if (i == l - 1 && (l % 3) - 1 == 0) {
			i++;
		}
		ctx.fillStyle = wheelColors[i % 3];

		ctx.beginPath();
		ctx.arc(260, 260, wheelRadius, angle, angle + anglePerSector, false);
		ctx.lineTo(260, 260);
		ctx.fill();

		// to write the name of the player on that sector
		ctx.save();
		ctx.fillStyle = wheelColors[(i + 1) % 3];
		ctx.translate(
			260 + Math.cos(angle + anglePerSector / 2) * textRadius,
			260 + Math.sin(angle + anglePerSector / 2) * textRadius
		);
		ctx.rotate(angle + anglePerSector / 2);
		ctx.font = "bold 20px Arial";
		ctx.fillText(playerName, -ctx.measureText(playerName).width / 2, 0);
		ctx.restore();
	}

	// to draw circle outlining the wheel
	ctx.beginPath();
	ctx.arc(260, 260, wheelRadius, 0, 2 * pi);
	ctx.lineWidth = 3;
	ctx.stroke();

	// to draw triangle on right side of wheel
	ctx.fillStyle = "rgba(255, 251, 0, 0.4)";
	ctx.beginPath();
	ctx.moveTo(260 + wheelRadius - 40, 260);
	ctx.lineTo(260 + wheelRadius + 40, 260 - 20);
	ctx.lineTo(260 + wheelRadius + 40, 260 + 20);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}

function spin() {
	// so that user cant press any button while wheel is spinning
	spinBtn.disabled = true;
	addBtn.disabled = true;

	// spin speed is in degrees
	spinSpeed = Math.random() * 10 + 10;
	elapsedSpinTime = 0;

	// total spin time comes b/w 3sec to 5sec
	totalSpinTime = Math.random() * 2000 + 5* 1000;
	rotateWheel();}

// this function will run in loop till elapsedSpinTime exceeds total spin time
function rotateWheel() {
	elapsedSpinTime += 10;
	if (elapsedSpinTime >= totalSpinTime) {
		stopWheelAndGetPlayer();
		return;
	}
	// to slow down the wheel near end by reducing the angle of rotation per loop
	var spinAngle =
		spinSpeed - easeOut(elapsedSpinTime, 0, spinSpeed, totalSpinTime);

	//startAngle is in rad and spinAngle is in deg
	startAngle += (spinAngle * pi) / 180;
	drawWheel();
	spinTimeout = setTimeout("rotateWheel()", 10);
}

function stopWheelAndGetPlayer() {
	clearTimeout(spinTimeout);
	// startAngle repersents total radians wheel rotated
	startAngle %= 2 * pi;

	// sartAngle is subtracted from 2pi coz we are drawing the wheel in anticlockwise dir
	// and start angle is also in anticlockwise dir
	var index = Math.floor((2 * pi - startAngle) / anglePerSector);
	tdPopup(players[index]);
}

function easeOut(t, b, c, d) {
	var ts = (t /= d) * t;
	var tc = ts * t;
	return b + c * (tc + -3 * ts + 3 * t);
}

function shuffle(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
