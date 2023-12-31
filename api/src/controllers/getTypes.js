const axios = require('axios');
const { Types } = require('../db');

const URL_BASE = 'https://pokeapi.co/api/v2/type';

module.exports = async function getTypes(req, res) {
    try {
        const { data } = await axios(URL_BASE);

        // Extraigo de data un arreglo con la información de cada tipo
        const typesCreated = await Promise.all(data.results.map(type => Types.findOrCreate({where: { name: type.name }})));

        // De typesCreated creo un arreglo con las propiedades id y name de cada tipo
        const allTypes = typesCreated.map(elem => elem[0])

        res.status(200).json(allTypes);
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}