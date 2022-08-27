const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let targetPokemon = 1;

const fetchPokemon = async (pokemon) => {

    pokemon = pokemon.toString().toLowerCase();
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // console.log(APIResponse);
    if(APIResponse.status == 200) {
        const data = await APIResponse.json();
        return(data);
    }
}


const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '...';

    const data = await fetchPokemon(pokemon);

    if (typeof(data) != 'undefined') {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        /*
        Utilizando o "." para navegar pelo JSON apresenta um erro nesse caso porque os objetos com "-" não são compreendidos e retornam um erro.
        pokemonImage.src = data.sprites.versions.generation-v.black-white.animated.front_default;
        */
        input.value = '';
        targetPokemon = data.id;
    }
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = 'x';
    }


}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
});

// criar maneira de pressionar prev no bulbasauro e ir pro último pokemon lançado
// identificar maior número e fazer if == 0, vira esse maior número?
// lista com todos os pokemons lançados? e ficar iterando nessa lista?

buttonPrev.addEventListener('click', () => {
    if(targetPokemon > 1){
        targetPokemon -= 1;
        renderPokemon(targetPokemon);
    }
    // renderPokemon(parseInt(pokemonNumber.innerHTML) - 1)

});

buttonNext.addEventListener('click', () => {
    targetPokemon += 1;
    renderPokemon(targetPokemon);
    // renderPokemon(parseInt(pokemonNumber.innerHTML) + 1)
});

renderPokemon(targetPokemon);