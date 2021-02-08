const _ = require('lodash');
const Joi = require('@hapi/joi');
const jstat = require('jstat');

const Pokemon = require('../../model/pokemon');

module.exports = {
    method: 'GET', 
    path: '/pokemon/weight',
    options: {
        validate: {
            query: Joi.object({
                names: Joi.string().regex(/[0-9a-z]+(,[0-9a-z]+)*/).required(),
                aggregate: Joi.boolean().default(false).optional()
            })
        }
    },
    handler: async function (request, h) {

        const { names: pokemonNames, aggregate } = request.query;
        
        const namesArray = pokemonNames.split(',');

        const pokemon = await Pokemon.find({
            'name': { $in: namesArray }
        }, { weight: true, name: true, _id: false });

        if (pokemon.length !== namesArray.length) {
            return h.response({ error: 'Some pokemon not found'}).code(400);
        }

        if (aggregate) {
            const weights = _.map(pokemon, 'weight');
            return {
                mean: jstat.mean(weights),
                median: jstat.median(weights),
                mode: jstat.mode(weights)
            }
        }

        return pokemon;
    }
}

