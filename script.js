let offset = 0;
let limit = 30;
let allPokemon = [];
let currentPokemon;


async function init() {
    showLoadingScreen();
    await loadAllPokemon(limit);
    removeLoadingScreen();
}


async function loadAllPokemon() {
    document.getElementById('container-allPokemon').innerHTML = '';
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`;
    let response = await fetch(url);
    let allPokemonAsJSON = await response.json();
    let allPokemon = allPokemonAsJSON['results'];
    for (let currentPokemon of allPokemon) {
        await renderAllPokemon(currentPokemon);
    }
    limit += 30;
}


async function search(pokemon) {
    if (!pokemon) {
        limit = 30;
        loadAllPokemon();
        return;
    }
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        let json = await response.json();
        document.getElementById('container-allPokemon').innerHTML = '';
        let pokemonName = json['name'].toUpperCase();
        let pokemonID = json['id'];
        let pokemonIMG = json['sprites']['other']['home']['front_default'];
        let pokemonType = json['types'][0]['type']['name'];
        document.getElementById('container-allPokemon').innerHTML +=
            renderAllPokemonHTML(pokemonName, pokemonID, pokemonIMG, pokemonType);
    } catch (error) {

    }
}


async function renderAllPokemon(currentPokemon) {
    let url = currentPokemon['url'];
    let response = await fetch(url);
    currentPokemonAsJSON = await response.json();
    let pokemonName = currentPokemonAsJSON['name'].toUpperCase();
    let pokemonID = currentPokemonAsJSON['id'];
    let pokemonIMG = currentPokemonAsJSON['sprites']['other']['home']['front_default'];
    let pokemonType = currentPokemonAsJSON['types'][0]['type']['name'];
    document.getElementById('container-allPokemon').innerHTML +=
        renderAllPokemonHTML(pokemonName, pokemonID, pokemonIMG, pokemonType);
}


function showLoadingScreen() {
    document.getElementById('loadingScreen').classList.remove('d-none');
}


function removeLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('d-none');
}


function showSingleCard(pokemonID) {
    document.getElementById('sectionSinglePokemon').classList.remove('d-none');
    document.getElementById('sectionAllPokemon').classList.add('d-none');
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('header').classList.add('d-none');
    loadPokemonData(pokemonID);
}


function showAllPokemon() {
    document.getElementById('sectionSinglePokemon').classList.add('d-none');
    document.getElementById('sectionAllPokemon').classList.remove('d-none');
    document.getElementById('footer').classList.remove('d-none');
    document.getElementById('header').classList.remove('d-none');
}


// --------------------------- SINGLE CARD --------------------------- //


async function loadPokemonData(pokemonID) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`
    // let urlName = 'https://pokeapi.co/api/v2/language/6'
    let response = await fetch(url);
    currentPokemon = await response.json();
    let parts = url.split('/');
    let lastPart = parts[parts.length - 1];
    pokemonID = parseInt(lastPart);
    renderPokemonInfos(currentPokemon, pokemonID);
}


function renderPokemonInfos(currentPokemon, pokemonID) {
    document.getElementById('sectionSinglePokemon').innerHTML =
        renderPokemonInfosHTML(currentPokemon, pokemonID);
    loadStats();
    loadTypes();
    loadEvolutions(pokemonID);
}


function nextPokemon(pokemonID) {
    pokemonID = pokemonID + 1;
    loadPokemonData(pokemonID);
}


function previousPokemon(pokemonID) {
    if (pokemonID == 1) {
        showAllPokemon();
    } else {
        pokemonID = pokemonID - 1;
        loadPokemonData(pokemonID);
    }
}


// --------------------------- TYPES --------------------------- //


function loadTypes() {
    if (currentPokemon['types'].length === 1) {
        loadOneType();
    } else {
        loadTwoTypes();
    }
}


function loadOneType() {
    let currentPokemonTypeOne = currentPokemon['types'][0]['type']['name'];
    document.getElementById('pokemonTypes').innerHTML = `<div class="types">${currentPokemonTypeOne.toUpperCase()}</div>`;
    setBackgroundColor(currentPokemonTypeOne);
}


function loadTwoTypes() {
    let currentPokemonTypeOne = currentPokemon['types'][0]['type']['name'];
    let currentPokemonTypeTwo = currentPokemon['types'][1]['type']['name'];
    document.getElementById('pokemonTypes').innerHTML =
        `<div class="types">${currentPokemonTypeOne.toUpperCase()}</div> <div class="types">${currentPokemonTypeTwo.toUpperCase()}</div>`
    setBackgroundColor(currentPokemonTypeOne);
}


function setBackgroundColor(currentPokemonTypeOne) {
    document.getElementById('containerTop').style.backgroundColor = `${colors[currentPokemonTypeOne]}`;
}


// --------------------------- EVOLUTIONS --------------------------- //


async function loadEvolutions(pokemonID) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`;
    let response = await fetch(url);
    let pokemonData = await response.json();
    let evolutionChain = pokemonData['evolution_chain']['url'];
    let evolutionResponse = await fetch(evolutionChain);
    let evolutionData = await evolutionResponse.json();

    if (evolutionData['chain']['evolves_to'].length == 0) {
    } else if (evolutionData['chain']['evolves_to'][0]['evolves_to'].length == 0) {
        evolutionOne(evolutionData);
        evolutionTwo(evolutionData);
    } else {
        evolutionOne(evolutionData);
        evolutionTwo(evolutionData);
        evolutionThree(evolutionData);
    }
}


function evolutionOne(evolutionData) {
    let evolutionOne = evolutionData['chain']['species'];
    let evolutionOneURL = evolutionOne['url'].split('/');
    let evolutionOneid = evolutionOneURL[evolutionOneURL.length - 2];
    let evolutionOneImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${evolutionOneid}.png`;
    document.getElementById('evolutionOne').innerHTML += `<div onclick="loadPokemonData(evolutionOneid)">${evolutionOne['name'].toUpperCase()}</div>`;
    document.getElementById('evolutionOneIMG').src = evolutionOneImg;
    document.getElementById('evolutionOneIMG').onclick = function () {
        loadPokemonData(evolutionOneid);
    };
}


function evolutionTwo(evolutionData) {
    let evolutionTwo = evolutionData['chain']['evolves_to'][0]['species'];
    let evolutionTwoURL = evolutionTwo['url'].split('/');
    let evolutionTwoid = evolutionTwoURL[evolutionTwoURL.length - 2];
    let evolutionTwoImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${evolutionTwoid}.png`;
    document.getElementById('evolutionTwo').innerHTML += `<div>${evolutionTwo['name'].toUpperCase()}</div>`;
    document.getElementById('evolutionTwoIMG').src = evolutionTwoImg;;
    document.getElementById('evolutionTwoIMG').onclick = function () {
        loadPokemonData(evolutionTwoid);
    };
}


function evolutionThree(evolutionData) {
    let evolutionThree = evolutionData['chain']['evolves_to'][0]['evolves_to'][0]['species'];
    let evolutionThreeURL = evolutionThree['url'].split('/');
    let evolutionThreeid = evolutionThreeURL[evolutionThreeURL.length - 2];
    let evolutionThreeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${evolutionThreeid}.png`;
    document.getElementById('evolutionThree').innerHTML = `<div>${evolutionThree['name'].toUpperCase()}</div>`;
    document.getElementById('evolutionThreeIMG').src = evolutionThreeImg;
    document.getElementById('evolutionThreeIMG').onclick = function () {
        loadPokemonData(evolutionThreeid);
    };
}


// --------------------------- PROGRESSBAR --------------------------- //


function loadStats() {
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        const stats = currentPokemon['stats'][i];
        document.getElementById('progressbar').innerHTML +=
            loadStatsHTML(stats);
    }
    animateBars();
}


function animateBars() {
    var bars = document.querySelectorAll(".bar");
    bars.forEach(function (bar) {
        var innerBar = bar.querySelector(".bar-inner");
        var width = parseInt(bar.getAttribute("data-width"));
        animateBarInner(innerBar, width);
    });
}


function animateBarInner(element, width) {
    var currentWidth = parseInt(window.getComputedStyle(element).width);
    var step = (width - currentWidth) / 120;
    var count = 0;
    var timer = setInterval(function () {
        count++;
        if (count >= 120) {
            clearInterval(timer);
        }
        currentWidth += step;
        element.style.width = currentWidth + "%";
    }, 10);
}

