// state
const city = {
    name: 'Pleasantville',
    biome: 'temperate',
    arch: 'victorian',
    slogans: [],
};
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

builderNameInput.addEventListener('input', () => {
    city.name = builderNameInput.value;
    displayCity();
});

builderBiomeSelect.addEventListener('change', () => {
    city.biome = builderBiomeSelect.value;
    displayCity();
});

builderArchSelect.addEventListener('change', () => {
    city.arch = builderArchSelect.value;
    displayCity();
});

builderSloganButton.addEventListener('click', () => {
    const slogan = builderSloganTextArea.value.trim();
    if (slogan) {
        city.slogans.push(slogan);
    }
    builderSloganTextArea.value = '';
    builderSloganTextArea.focus();
    displayCity();
});

builderSaveButton.addEventListener('click', () => {
    // Need to deep copy the slogan array.
    cities.push(JSON.parse(JSON.stringify(city)));
});

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

    displaySloganList.innerHTML = '';
    for (const slogan of slogans) {
        const li = document.createElement('li');
        li.textContent = slogan;
        displaySloganList.appendChild(li);
    }
}

// page load actions
displayInput();
displayCity();
