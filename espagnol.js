const truthQues = [
        " Cuantas veces te duchas por semana ?",
        " Ya has hecho pipi en na piscina ?",
        "Llevas ropa interior tan vieja que tiene agujeros dentro ?",
        "Tienes celos de uno o una de tus amigos o amigas ?",
        "Porque razon lloraste la ultima vez ?",
        "Como te vengarias de una persona que te hizo daño ?",
        "Cual es la mas gorda mentira que nunca hiciste ?",
        " Ay una persona que pretendes quererla pero en realida odias?",
        "En una escala de 1 a 10 cual seria tu nota sobre tu apariencia ?",
        "Cual amigo o amiga no te gustaria de verla desnuda ?",
        "Cual es tu mayor miedo ?",
        "Ya has intentado aruinar a una relation enamorosa de uno o una de tus amigos o amigas ?",
        "Segun ti cual es tu mayor defecto ?",
        "Cual es tu mayor verguenza que has pasado en toda tu vida ?",
        " Si serias invisible por un dia, quien espiarias ?",
        "Ya has intentando seducir a uno o una de tus profesores para tener una mejor nota?",
        "Cual amigo o amigua tiene el peor gusto para la moda segun ti ?",
        "Ya has rezado para la muerte de alguien ?",
        "Piensas que tienes tu vida fallada ?",
        "Cual es tu punto debile ?",
        "Tu habito mas asqueroso ?",
        "Ya has mentido jugando a este juego ?",
        "Cual es tu mejor amigo ?",
        "La celebridad que encuentras la mas guapa ?",
        "La celebridad que encuentras el mas guapo ?",
        "Tu plato favorito ?",
        "Meas mientras te duchas ?",
        "Cual es la parte que prefieres del cuerpo de tu novio o novia ?",
        "Cual es tu pelicula favorita ?",
        "Cuando hiciste tu primer beso ?",
        "Que piensas del presidente de España ?",
        "T'as déjà volé quelque chose, si oui, c'était quoi ?",
        "Nomme la fille ou le garçon le / la plus mignon/ne de ta classe",
        "Qui est-ce que tu aimes plus ? Maman ou Papa ?",
        "As-tu déjà vu tes parents faire l’amour par accident ?",
        "As-tu déjà eu l’envie de tuer quelqu’un ?",
        "Quel est ton poids ?",
        "Décris la farce la plus drôle qu’on t’ait jamais faite.",
        "Quel était ton surnom pendant ton enfance ?",
        
];
const dareQues = [
	"Fais 20 pompes.",
	"Imite ta mère.",
	"Imite un ami/amie et laisse les autres deviner de qui il s’agit !",
	"Lèche ton coude.",
	"Talk in an accent for the next 3 rounds.",
	"Parle avec un accent pendant 1 cours a l'ecole",
	"Laisse le joueur de ton choix te dessiner quelque chose sur le visage !",
	"Write or draw something embarrassing somewhere on your body with a permanent marker.",
	"Let the person to your left draw on your face with a pen.",
	"Seduce a member of the same gender in the group.",
	"Fais un compliment à chacun des joueurs !   ",
	"Laisse le joueur de ton choix te dessiner quelque chose sur le visage !",
	"Mélange du sucre et du poivre noir et mange ce mélange.",
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
			// openPopup returns a destructor function
			let closeIt = openPopup();
			let popup = document.querySelector(".popup");

			popup.appendChild(createEl("h2", `${type}`));

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
