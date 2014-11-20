function getPokemonInfo(index_number, callback){
    var pokemon = {},
        fetches = [];

    function pokeAPI(index_number, resource, callback){
        return $.ajax({
            url: 'http://pokeapi.co/api/v1/' + resource + '/' + index_number + '/',
            type: 'GET',
            dataType: 'jsonp',
            success: callback
        });            
    }

    fetches.push(pokeAPI(index_number, 'pokemon', function(data){

        pokemon.name = data.name;
        pokemon.types = data.types.map(function(type) {
            return type.name;
        })
        pokemon.abilities = data.abilities.map(function(type) {
            return type.name;
        })
        pokemon.attack = data.attack;
        pokemon.defense = data.defense;
        pokemon.evolutions = data.evolutions;
        pokemon.height = data.height;
        pokemon.weight = data.weight;
        pokemon.moves = data.moves.map(function(type) {
            return type.name;
        })
        pokemon.id = data.national_id;
        // pokemon.species = data.species;

        // console.log(pokemon);
    }));

    fetches.push(pokeAPI(index_number + 1, 'sprite', function(data){

        pokemon.image = 'http://pokeapi.co' + data.image;
    }));

    fetches.push(pokeAPI(index_number + 1, 'description', function(data){

        pokemon.description = data.description;
    }));

    $.when.apply(null, fetches)
    .done(function () {
      callback(pokemon);
    })
    .fail(function () {
      callback(null);
    });
}

function drawPokemon(index_number){

    getPokemonInfo(index_number, function(data){
        
        if(!data){
            alert("There was a network error!");
            return;
        }

        var properties = [];
        properties.push("Name: " + data.name);
        properties.push("Types: " + data.types.join('\n'));
        properties.push("Abilities: " + data.abilities.join('\n'));

        console.log(properties);

        $('#poke-name').empty().text("It's " + data.name + "!")
        $('#poke-desc').empty().text(data.description);
        $('#poke-img').empty().attr('src', data.image);
        $('#poke-type').empty().text(data.types.join(' '));
    });
}

var main = function() {
    generatePokemon = $('#poke-btn');
    generatePokemon.click(function(){
        var index_number = $('#poke-num').val() - 0;
        console.log(index_number);
        drawPokemon(index_number);
    });

    drawPokemon(1);
}

$(document).ready(main);