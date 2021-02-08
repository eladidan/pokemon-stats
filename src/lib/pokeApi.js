const axios = require('axios');
const { pRateLimit } = require('p-ratelimit');
const retry = require('@lifeomic/attempt').retry;

const retryOptions = {
    maxAttempts: 3,
    factor: 1.5,
    jitter: true
}


const limit = pRateLimit({
    interval: 1000,             // 1000 ms == 1 second
    rate: 30,                   // 30 API calls per interval
    concurrency: 10,            // no more than 10 running at once
    maxDelay: 3000              // an API call delayed > 3 sec is rejected
});

pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 3000
});

pokeApi.getPokemon = async function (name) {
    const response = await retry(async() => limit(async() => this.get(`/pokemon/${name}`)), retryOptions);
    
    return response.data;
 }
 pokeApi.getPokemon.bind(pokeApi);

module.exports = pokeApi;
