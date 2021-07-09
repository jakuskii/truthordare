const truthQues = [
    "Bist du noch Jungfrau?",
    "Bist du eher titten oder as?",
    "Hast du schon jemanden beim rummmachen gesehen/beobachtet?",
    "Mit welcher Berumtheit würdest du am liebsten eine nacht verbringen?",
    "Hast du dich schon selbstbefridigt?",
    "Nenne die Hübscheste person aus deiner Klasse.",
    "Hast du schon nudes gemacht? ",
    "Schaust du Pornos?",
    "Würdest du mit deiner Freudin/Freund ein Porno drehen und hochladen?",
    "Bewerte alle Leute aus deiner Klasse von 1-10?",
    "Hast du schon eine Person der anderen Sexualität geküsst?",
    "Wer ist die erste Person auf die du standest?",
    "Hast du dein/e Freund/in betrogen?",
    "Was ist dein größter sexuller Traum?",
    "Wer ist dein Crush in disem Moment?",
    "Wenn du ein 3 er machen müssen müsstest meit wem (In der Klasse/Gruppe)? ",
    "Mit wem würdest du auf ein Date genhen?",
    "Wer ist die Person die du am meisten hasst?",
    "Würdest du Sex mit einer Person aus dieser Klasse oder Gruppe haben wollen?",
    "Wer hat den hottesten Körper (aus der Gruppe)?",
    "Was ist deine liblings Sexstellung?",
    "Von forne oder von hinten?",
    "Schwanzgröße oder Talliengröße",
    "Wer ist dein liblings Pornostaar?",
    "Mit wem würdest du am liebsten auf einer einsamen Insel sein (Gruppe)?",
    "Hast du schon ein Schwanzbild verschickt?",
    "Könntest du mit einer Person aus der Gruppe für viel Geld Sex haben?",
    "Was ist deine liblings Pornoseite?",
    "Hast du schon einmal eine Person des gleichen Geschlechts geküsst?",
    "Welchen Star findest du hot?",
    "Was ist das Letzte, wonach du gegoogelt hast?",


];

const dareQues = [
    "Zeig deine 5 letzten Chatverlaufe.",
    "Küsse jemandem auf die Wange der anderen Sexualität.",
    "Ruf eine Person an die die anderen aussuchen dürfen und du musst in einer sexy Stimme reden.",
    "Schreibe eine Schlingel Nachricht an die letzte Person an die dueine eine Nachricht geschriben hast",
    "Ziehe ein Kleidungs stück aus (bis zum ende des Spiels).",
    "Setz dich auf den Schoß einer Person der anderen Sexualität (bis du wieder drann bist).",
    "Gebe dein Handy an eine Person aus der gruppe und sie darf schreiben was sie will.",
    "Sag zu jemandem Ich glaube ich stehe auf dich und die anderen dürfen endscheiden wem.",
    "Jemand darf dir eine Frage stellen die du beandworten musst (erlich).",
    "Such nach einem Porno und schau es in der Gruppe.",
    "Mach ein Selfi mit einer Person die in dieser Gruppe ist und schicke es an 5 random Leute.",
    "andworte an ein fuck, marry, kill die anderen dürfen die Leute bestimmen.",
    "Schreibe 2 Leuten I glaube ich stehe auf dich (Gruppe darf aussuchen).",
    "Rufe eine random Person an und sag was die anderen bestimmen.",
    "Male einen Schwanz auf den Arm von einem Mitschüler.",
    "Geh zu einer Person und frag sie ob sie Lust hätte Lego zu spielen (nicht Leute aus der Gruppe).",
    "Film dich wie du ein tik tok tanz machst und lad ihn hoch.",
    "Schrei das erste Wort, das dir in den Kopf kommt laut heraus!",
    "Zeige allen anderen ein peinliches Bild von dir, für das du dich schämst!",
    "Erzähle der Person die dir die Aufgabe stellt, was toll an ihm/ihr ist!",
    "Tanze an einer imagineren stippstange",
    "Poste ein Bild deiner Füße in deiner Insta-Story.",
    "Rufe beim Pizzadienst an und überzeuge sie, dich adoptieren zu müssen.",
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
	popup.appendChild(createEl("h2", "Spieler hinzufügen min. 2"));

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

	popup.appendChild(createEl("h2", `Du bist drann: ${person} `));
	popup.appendChild(createEl("p", "Wähle::"));

	let TruthBtn = document.createElement("button", HTMLButtonElement);
	TruthBtn.innerText = "Warheit!";
	TruthBtn.className = "btn btn-truth";
	TruthBtn.onclick = showQues("Truth");
	popup.appendChild(TruthBtn);

	let DareBtn = document.createElement("button", HTMLButtonElement);
	DareBtn.innerText = "Pflicht!";
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

function getRndInteger(min, max) {
   
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  function getRndInteger2(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function spin() {
	// so that user cant press any button while wheel is spinning
	spinBtn.disabled = true;
	addBtn.disabled = true;

	// spin speed is in degrees
	spinSpeed = Math.random() * 10 + 10;
	elapsedSpinTime = 0;
    
	// total spin time comes b/w 3sec to 5sec
	totalSpinTime = Math.random() * 2069+5*1000;
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
