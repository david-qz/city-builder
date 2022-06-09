// state
const city = {
    name: 'Pleasantville',
    biome: 'temperate',
    architecture: 'victorian',
    slogans: ['The Garden City'],
};
const cities = [];

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
displayCity();
