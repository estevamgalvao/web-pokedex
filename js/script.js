const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    const data = await APIResponse.json();

    /*console.log(data);*/
    return(data);

}


const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);
    
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    /*
    Utilizando o "." para navegar pelo JSON apresenta um erro nesse caso porque os objetos com "-" não são compreendidos e retornam um erro.
    pokemonImage.src = data.sprites.versions.generation-v.black-white.animated.front_default;
    */
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
    input.value = '';

}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value);

});
