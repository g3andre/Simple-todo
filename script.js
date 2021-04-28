const list = new Array();
const concluded = new Array();
const input = document.querySelector('#tarefa');
const btn = document.querySelector('button');
const listActive = document.querySelector('#ativos');
const listConcluded = document.querySelector('#concluidos');

(function init() {
    btn.addEventListener('click', onAddEventHandler)
})()

function onAddEventHandler() {
    list.push(input.value);
    updateActive();
}

function updateActive() {
    listActive.innerHTML = "";
    let elList = list.map((item,index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = 
        `<tr>
            <td>${item}</td>
            <td>
                <a href="#" onClick="todoConcluded(${index})"><img src="./check-square.svg"></a>
            </td>
        </tr>`;
        return tr;
    });

    elList.forEach(el => listActive.appendChild(el));
}

function updateConcluded() {
    listConcluded.innerHTML = "";
    let elList = concluded.map(item => {
        let tr = document.createElement('tr');
        tr.innerHTML = 
        `<tr>
            <td><del>${item}</del></td>
        </tr>`;
        return tr;
    });

    elList.forEach(el => listConcluded.appendChild(el));
}

function todoConcluded(id) {
    let item = list.splice(id,1);
    concluded.push(item);
    updateActive();
    updateConcluded();
}