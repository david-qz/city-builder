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
const [builderSloganButton, builderSaveButton] = builderSection.querySelectorAll('button');

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

function handleSaveCity() {
    // Need to deep copy the slogan array.
    cities.push(JSON.parse(JSON.stringify(city)));
    city = getDefaultCity();
    displayInput();
    displayCity();
    displayList();
}

function loadCity(index) {
    if (!cities[index])
        return;

    [city] = cities.splice(index, 1);
    displayInput();
    displayCity();
    displayList();
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

builderSloganButton.addEventListener('click', handleAddSlogan);

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
        button.addEventListener('click', callback);
        return td;
    }

    function generateRow({ name, biome, arch, length, index }) {
        const tr = document.createElement('tr');
        tr.appendChild(createTd(name));
        tr.appendChild(createTd(biome));
        tr.appendChild(createTd(arch));
        tr.appendChild(createTd(length));
        tr.appendChild(createTdButton('Load', () => {
            loadCity(index);
        }));
        tableBody.appendChild(tr);
    }

    tableBody.innerHTML = '';
    let index = 0;
    for (const { name, biome, arch, slogans } of cities) {
        const row = { name, biome, arch, length: slogans.length, index };
        generateRow(row);
    }
}

// page load actions
displayInput();
displayCity();
displayList();
