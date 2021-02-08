#!/usr/bin/env node

const _ = require('lodash');

const pokeApi = require('../lib/pokeApi');
const Pokemon = require('../model/pokemon');

(async () => {
    try {
        const pikachu = await pokeApi.getPokemon('pikachu');
        // const curated = _.pick(pikachu, ['name', 'weight', 'height']);
        await Pokemon.updateOne({ name: 'pikachu' }, pikachu, { upsert: true });
        console.log('Pikachu data saved to database');
        process.exit(0);
    } catch (err) {
        console.error('An error occured', err);
        process.exit(1);
    }
})();
