const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalStat = document.getElementById('modalStats')

const maxRecords = 151
const limit = 10
let offset = 0;

modalStat.hidden = true

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="mostrarStats('${pokemon.name}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function esconderModal(){
    modalStat.hidden = !modalStat.hidden
}
function criarLayoutModal(pokemon){
    return `
    <div class="pokemon ${pokemon.type}">
        <span style="font-family: monospace; color: #fff; opacity: .3; font-size: large;" onclick="esconderModal()">X</span>
        <div class="tituloPoke">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number.toLocaleString('pt-BR',{ minimumIntegerDigits: 4 }).replace(".", "")}</span>
        </div>
        <span class="specie">Specie: ${pokemon.specie}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                alt="${pokemon.name}">

            <div class="atributos">
                <span>HP: ${pokemon.stats[0]}</span>
                <span>Attack: ${pokemon.stats[1]}</span>
                <span>Sp. Attack: ${pokemon.stats[3]}</span>
            </div>
            <div class="atributos">
                <span>Defense: ${pokemon.stats[2]}</span>
                <span>Sp. Defense: ${pokemon.stats[4]}</span>
                <span>Speed: ${pokemon.stats[5]}</span>
            </div>
        </div>
    </div>
    `
}
function mostrarStats(nomePoke){

    pokeApi.getStatsPokemon(nomePoke)
        .then((pokemon) => {
            modalStat.innerHTML = ""
            modalStat.hidden = false

            const newHtml = criarLayoutModal(pokemon)
            modalStat.innerHTML += newHtml
        })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})