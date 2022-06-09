// state
const city = {
    name: 'Pleasantville',
    biome: 'temperate',
    architecture: 'victorian',
    slogans: [],
};
const cities = [];

// City Designer Component
const cityDesignerSection = document.querySelector('#designer-section');
const cityDesignerNameInput = cityDesignerSection.querySelector('input');
const [cityDesignerBiomeSelect, cityDesignerArchSelect] = cityDesignerSection.querySelectorAll('select');
const cityDesignerSloganTextArea = cityDesignerSection.querySelector('textarea');
const [cityDesignerSloganButton, cityDesignerSaveButton] = cityDesignerSection.querySelectorAll('button');

function displayInput() {
    cityDesignerNameInput.value = city.name;
    cityDesignerBiomeSelect.value = city.biome;
    cityDesignerArchSelect.value = city.architecture;
}

cityDesignerNameInput.addEventListener('input', () => {
    city.name = cityDesignerNameInput.value;
    displayCity();
});

cityDesignerBiomeSelect.addEventListener('change', () => {
    city.biome = cityDesignerBiomeSelect.value;
    displayCity();
});

cityDesignerArchSelect.addEventListener('change', () => {
    city.architecture = cityDesignerArchSelect.value;
    displayCity();
});

cityDesignerSloganButton.addEventListener('click', () => {
    const slogan = cityDesignerSloganTextArea.value.trim();
    if (slogan) {
        city.slogans.push(slogan);
    }
    cityDesignerSloganTextArea.value = '';
    cityDesignerSloganTextArea.focus();
    displayCity();
});

cityDesignerSaveButton.addEventListener('click', () => {
    // Need to deep copy the slogan array.
    cities.push(JSON.parse(JSON.stringify(city)));
});

// City Display Component
const cityDisplaySection = document.querySelector('#city-display-section');
const cityDisplayNameElement = cityDisplaySection.querySelector('p');
const [cityDisplayBiomeImg, cityDisplayArchitectureImg] = cityDisplaySection.querySelectorAll('img');
const cityDisplaySloganList = cityDisplaySection.querySelector('ul');

function displayCity() {
    const { name, biome, architecture, slogans } = city;

    cityDisplayNameElement.textContent = name;
    cityDisplayBiomeImg.src = biome ? 'assets/city-parts/biome-' + biome + '.png' : '';
    cityDisplayArchitectureImg.src = architecture ? 'assets/city-parts/architecture-' + architecture + '.png' : '';

    cityDisplaySloganList.innerHTML = '';
    for (const slogan of slogans) {
        const li = document.createElement('li');
        li.textContent = slogan;
        cityDisplaySloganList.appendChild(li);
    }
}

// page load actions
displayInput();
displayCity();
