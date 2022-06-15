const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY, API_URL } = process.env

require('dotenv').config();

const getInfoApi = async () => {
    const apiDog = await axios.get(`${API_URL}?api_key=${API_KEY}`)
    const apiInfo = await apiDog.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            weight: dog.weight.metric,
            height: dog.height.metric,
            life_span: dog.life_span,
            temperament: dog.temperament,
            origin: dog.origin,
            image: dog.image.url,
        };
    });
    return apiInfo
};

const getInfoDb = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAll = async () => {
    const infoApi = await getInfoApi();
    const infoDb = await getInfoDb();
    const allInfo = infoApi.concat(infoDb);
    return allInfo
}

module.exports = { getInfoApi, getInfoDb, getAll }