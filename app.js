// state
function getDefaultCity() {
    return {
        name: 'Pleasantville',
        biome: 'temperate',
        arch: 'gothic',
        slogans: [],
    };
}

let city = getDefaultCity();
const cities = [];

// City Designer Component
const builderSection = document.querySelector('#builder-section');
const builderNameInput = builderSection.querySelector('input');
const [builderBiomeSelect, builderArchSelect] = builderSection.querySelectorAll('select');
const builderSloganTextArea = builderSection.querySelector('textarea');
const [builderPushSloganButton, builderPopSloganButton, builderSaveButton] = builderSection.querySelectorAll('button');

function displayInput() {
    builderNameInput.value = city.name;
    builderBiomeSelect.value = city.biome;
    builderArchSelect.value = city.arch;
}

function handleInput(obj, key, inputElement) {
    obj[key] = inputElement.value;
    displayCity();
}

function handleAddSlogan() {
    const slogan = builderSloganTextArea.value.trim();
    if (slogan) {
        city.slogans.push(slogan);
        displayCity();
    }
    builderSloganTextArea.value = '';
    builderSloganTextArea.focus();
}

function handlePopSlogan() {
    city.slogans.pop();
    displayCity();
}

function handleSaveCity() {
    // Need to deep copy the slogan array.
    cities.push(JSON.parse(JSON.stringify(city)));
    city = getDefaultCity();
    displayAll();
}

function loadCity(index) {
    if (!cities[index])
        return;

    [city] = cities.splice(index, 1);
    displayAll();
}

function deleteCity(index) {
    cities.splice(index, 1);
    displayAll();
}

builderNameInput.addEventListener('input', () => {
    handleInput(city, 'name', builderNameInput);
});

builderBiomeSelect.addEventListener('change', () => {
    handleInput(city, 'biome', builderBiomeSelect);
});

builderArchSelect.addEventListener('change', () => {
    handleInput(city, 'arch', builderArchSelect);
});

builderPushSloganButton.addEventListener('click', handleAddSlogan);

builderPopSloganButton.addEventListener('click', handlePopSlogan);

builderSaveButton.addEventListener('click', handleSaveCity);

// City Display Component
const displaySection = document.querySelector('#display-section');
const displayNameElement = displaySection.querySelector('p');
const [displayBiomeImg, displayArchImg] = displaySection.querySelectorAll('img');
const displaySloganList = displaySection.querySelector('ul');

function displayCity() {
    const { name, biome, arch, slogans } = city;

    displayNameElement.textContent = name;
    displayBiomeImg.src = biome ? 'assets/city-parts/biome-' + biome + '.png' : '';
    displayArchImg.src = arch ? 'assets/city-parts/architecture-' + arch + '.png' : '';

    displaySection.classList = '';
    displaySection.classList.add(biome);
    displaySection.classList.add(arch);

    displaySloganList.innerHTML = '';
    for (const slogan of slogans) {
        const li = document.createElement('li');
        li.textContent = slogan;
        displaySloganList.appendChild(li);
    }
}

// City List Component
const cityListSection = document.querySelector('#list-section');
const tableBody = cityListSection.querySelector('tbody');

function displayList() {
    function createTd(text) {
        const td = document.createElement('td');
        td.textContent = text;
        return td;
    }

    function createTdButton(text, callback) {
        const td = document.createElement('td');
        const button = document.createElement('button');
        td.appendChild(button);
        button.innerText = text;
        if (callback) {
            button.addEventListener('click', callback);
        } else {
            button.disabled = true;
        }
        return td;
    }

    function generateRow({ name, biome, arch, length, index }) {
        let editCallback = null;
        let deleteCallback = null;

        if (index >= 0) {
            editCallback = () => { loadCity(index); };
            deleteCallback = () => { deleteCity(index); };
        }

        const tr = document.createElement('tr');
        tr.appendChild(createTd(name));
        tr.appendChild(createTd(biome));
        tr.appendChild(createTd(arch));
        tr.appendChild(createTd(length));
        tr.appendChild(createTdButton('Edit', editCallback));
        tr.appendChild(createTdButton('Delete', deleteCallback));
        tableBody.appendChild(tr);
    }

    tableBody.innerHTML = '';

    // Fake row for aesthetics
    if (!cities.length) {
        generateRow({ name: '', biome: '', arch: '', length: '', index: -1 });
    }

    let index = 0;
    for (const { name, biome, arch, slogans } of cities) {
        const row = { name, biome, arch, length: slogans.length, index };
        generateRow(row);
        index++;
    }
}

function displayAll() {
    displayInput();
    displayCity();
    displayList();
}

// page load actions
displayAll();
