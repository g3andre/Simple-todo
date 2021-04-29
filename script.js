let listActive = new Array();
let listConcluded = new Array();
const input = document.querySelector("#tarefa");
const btn = document.querySelector("button");
const tableListActive = document.querySelector("#ativos");
const tableListConcluded = document.querySelector("#concluidos");

(function init() {
	btn.addEventListener("click", onAddEventHandler);
	input.addEventListener("keypress", (e) => onKeyPressHandler(e));
	loadSavedTodo();
	updateActive();
	updateConcluded();
})();

function onAddEventHandler() {
	if (input.value) {
		listActive.push(input.value);
		updateActive();
	}
    input.value = '';
    input.focus();
}

function onKeyPressHandler(e) {
	if (e.keyCode == 13) {
        onAddEventHandler()
	}
}

function updateActive() {
	tableListActive.innerHTML = "";
	let elList = listActive.map((item, index) => {
		let tr = document.createElement("tr");
		tr.innerHTML = `<tr>
            <td>${item}</td>
            <td>
                <a href="#" onClick="todoConcluded(${index})"><img src="./check-square.svg"></a>
            </td>
        </tr>`;
		return tr;
	});

	elList.forEach((el) => tableListActive.appendChild(el));
	sincronize();
}

function updateConcluded() {
	tableListConcluded.innerHTML = "";
	let elList = listConcluded.map((item) => {
		let tr = document.createElement("tr");
		tr.innerHTML = `<tr>
            <td><del>${item}</del></td>
        </tr>`;
		return tr;
	});

	elList.forEach((el) => tableListConcluded.appendChild(el));
	sincronize();
}

function todoConcluded(id) {
	let item = listActive.splice(id, 1).pop();
	listConcluded.push(item);
	updateActive();
	updateConcluded();
}

function sincronize() {
	let stringListActive = JSON.stringify(listActive);
	let stringListConcluded = JSON.stringify(listConcluded);

	localStorage.setItem("active", stringListActive);
	localStorage.setItem("concluded", stringListConcluded);
}

function loadSavedTodo() {
    let arrListActive = localStorage.getItem('active');
    let arrListConcluded = localStorage.getItem('concluded');

    if(!arrListActive && !arrListConcluded) return;

    listActive = JSON.parse(arrListActive);
    listConcluded = JSON.parse(arrListConcluded);

    

}
