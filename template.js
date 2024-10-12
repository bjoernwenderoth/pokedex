function renderAllPokemonHTML(pokemonName, pokemonID, pokemonIMG, pokemonType) {
    return `
    <div class="card d_flex_c_c column" style="background-color: var(--${pokemonType}); outline: 3px solid var(--${pokemonType});" onclick="showSingleCard(${pokemonID})">
        <div class="pokemon-card">
            <h2>${pokemonName}</h2>
        </div>
        <img class="pokemon-img" src="${pokemonIMG}"></img>
        <h1 class="card-id">#${pokemonID}</h1>
         <div class="width-icon">
            <img class="full-icon" src="./img/open_in_full.svg">
        </div>
    </div>`
}


function renderPokemonInfosHTML(currentPokemon, pokemonID) {
    return `
    <div class="container-full" id="containerSingleCard">
    <div class="container-top" id="containerTop">
  
        <div class="d_flex_c_c column">
            <div class="back_and_id max-width">
                <img src="./img/arrow_back.svg" class="icon-back" onclick="showAllPokemon()">
                <h2 id="pokemonId">#${pokemonID}</h2>
            </div>
            <h1 id="pokemonName">${currentPokemon['name'].toUpperCase()}</h1>
            
        
        
        <div class="types_and_swipe max-width">
            <img class="swipe_arrow" src="./img/swipe_left.svg" onclick="previousPokemon(${pokemonID})">
            <img class="swipe_arrow" src="./img/swipe_right.svg" onclick="nextPokemon(${pokemonID})">
        </div>
        </div>
        </div>
 
    <div class="container-specs d_flex_c_c column" id="pokemonSpecs">
        <img class="pokemon-img-single-card" id="pokemonImg" src="${currentPokemon['sprites']['other']['home']['front_default']}">
        <div class="specs d_flex_c_c">
            <div class="d_flex_c_c" id="pokemonTypes"></div>
            <div id="pokemonWeight"><h3><b>Weight: ${currentPokemon['weight'] / 10} kg</b></h3></div>
            <div id="pokemonHeight"> <h3><b>Height: ${currentPokemon['height'] * 10} cm</b></h3></div>
        </div>
        <div id="progressbar" class="max-width"></div>
    </div>
    <div class="evolutions" id="evolutionsHTML">
        <h2>EVOLUTION</h2>
        <div class="evolution_list d_flex_c_c gap32px">
            <div class="d_flex_c_c column">
                <img class="evolutions-img" src="" id="evolutionOneIMG">
                <h4 id="evolutionOne"></h4>
            </div>
            <img src="./img/arrow_forward.svg" alt="">
            <div class="d_flex_c_c column">
                <img class="evolutions-img" src="" id="evolutionTwoIMG">
                <h4 id="evolutionTwo"></h4>
            </div>
            <img src="./img/arrow_forward.svg" alt="">
            <div class="d_flex_c_c column">
                <img class="evolutions-img" src="" id="evolutionThreeIMG">
                <h4 id="evolutionThree"></h4>
            </div>
        </div>
    </div>
</div>`
}


function loadStatsHTML(stats) {
    return `
    <div class="container">
    <h2 class="my-skills"></h2>
    <div class="bar-1">
        <div class="title">${stats['stat']['name'].toUpperCase()}</div>
        <div class="bar" data-width="${stats['base_stat']}%">
            <div class="bar-inner"></div>
            <div class="bar-percent">${stats['base_stat']}</div>
        </div>
    </div>
</div>`
}