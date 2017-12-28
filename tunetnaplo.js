
var brElement = document.createElement("br");
function addkaja() {
	var ujdiv = addDiv();
	ujdiv.classList.add("kaja");
}

function addtunet() {
	var ujdiv = addDiv();
	ujdiv.classList.add("tunet");
	//ujdiv.innerHTML = "szenvedés";
}

function addDiv(){
	var now = new Date();
	var ujDiv = document.createElement('div');
	var nownr =  + now;
	ujDiv.id = '' + nownr;
	ujDiv.setAttribute("name", "ujdiv");
	ujDiv.innerHTML = now.toString().slice(0, 25);
	var naplo = document.getElementById('naplo');
	naplo.insertBefore(ujDiv, naplo.firstChild);


	var textarea = createTextArea();
	ujDiv.appendChild(textarea);
	textarea.addEventListener("keyup", enterListener);
	textarea.focus();
	return ujDiv;
}

function createTextArea() {
	var input = document.createElement("textarea");
	input.name = "post";
	input.maxLength = "5000";
	input.cols = "45";
	input.rows = "5";
	return input;
}

function saveStuff() {
	var kajadivs = document.getElementsByName("ujdiv");
	
	for (var i = 0; i < kajadivs.length; i++) {

		var objectToSave = {
			"datum": kajadivs[i].innerHTML.slice(0, 25),
			"value": kajadivs[i].lastChild.value,
			"tipus": kajadivs[i].classList[0]
		}
		console.log(JSON.stringify(objectToSave));
		localStorage.setItem(kajadivs[i].id, JSON.stringify(objectToSave));
		console.log("mentve");
	}
}

function loadStuff() {

	var keys = Object.keys(localStorage),
	i,
	len = keys.length;
	keys.sort();

	for (i = 0; i < len; i++) {
		key = keys[i];
		try {
			var jsonstring = localStorage.getItem(key);
			var obj = JSON.parse(jsonstring);
			var ujDiv = document.createElement('div');
			ujDiv.id = key;
			ujDiv.name = "ujdiv";
			ujDiv.innerHTML = obj.datum;
			ujDiv.classList.add(obj.tipus);
			var div = document.getElementById('naplo');

			var textarea = createTextArea();
			textarea.value = obj.value;
			ujDiv.appendChild(textarea);
			ujDiv.appendChild(brElement);

			if (div.firstChild.id > key) {
				div.appendChild(ujDiv);
			} else {
				div.insertBefore(ujDiv, div.firstChild);
			}
		} catch (e) {}
	}

}
/*
function disableToltes(){
var toltesBtn = document.getElementById("toltes");
toltesBtn.parentNode.removeChild(toltesBtn);

}
 */


function deleteStuff() {
	var biztos = confirm("Ez ki fogja törölni az egész naplót, biztos ezt akarod?");
	if (biztos) {
		localStorage.clear();
	}
}

function enterListener(event) {
	event.preventDefault();
	if (event.keyCode == 13) {
		saveStuff();
	}
}

document.onkeydown = ctrlSListener;

function ctrlSListener(event) {
    if (((event.keyCode == 115 ||event.keyCode == 83) && event.ctrlKey) || (event.keyCode == 19)) {
	saveStuff();
    event.preventDefault();
	}
}
