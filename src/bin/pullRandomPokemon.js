#!/usr/bin/env node

const _ = require('lodash');
const pokemon = require('pokemon');
const Promise = require('bluebird');

const pokeApi = require('../lib/pokeApi');
const Pokemon = require('../model/pokemon');

function randomPokemonNames(n) {
    const pokemonNames = new Set();
    while (pokemonNames.size < n) {
        const pokemonName = pokemon.random();
        pokemonNames.add(_.lowerCase(pokemonName));
    }

    return [...pokemonNames];
}

(async () => {
    const numberOfPokemon = parseInt(process.argv[2]);
    const pokemonNames = randomPokemonNames(numberOfPokemon);
    try {
        const pokemon = await Promise.map(pokemonNames, (pokemonName) => pokeApi.getPokemon(pokemonName));
        await Promise.map(pokemon, (p) => Pokemon.updateOne({ name: p.name }, p, { upsert: true }));

        console.log(`Pokemon: ${pokemonNames} data saved to database`);
        process.exit(0);
        
    } catch (err) {
        console.error('An error occured', err);
        process.exit(1);
    }
    finally {

    }
})();
