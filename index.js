document.getElementById('hamoud').addEventListener("click", function() {
	document.querySelector('.code').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.code').style.display = "none";
});