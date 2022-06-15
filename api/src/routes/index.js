const { Router } = require('express');
const { API_KEY, API_URL } = process.env;
const { Dog, Temperament } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getInfoApi, getInfoDb, getAll } = require('../controllers/controllers')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    const totalDogs = await getAll();
    if(name) {
        const dogName = await totalDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        dogName ? 
        res.status(200).send(dogName) : 
        res.status(404).send("Sorry, dog not found")
    }
    else {
        res.status(200).send(totalDogs)
    }
})

router.get('/temperaments', async (req, res) => { 
    const apiDogs = await getInfoApi();
    const temperament = apiDogs.map(el => el.temperament).join().split(',')
    const dbTemps = temperament.map(el => el.trim())

    dbTemps.forEach( el => {
        if(el !== '')
        Temperament.findOrCreate({
            where: { name: el }
        })       
    });
    const allTemps = await Temperament.findAll();
    res.status(200).send(allTemps)
})

router.get("/dogs/:id", async (req, res) =>{
    const id =req.params.id;
    const dogs = await getAll();
    if(id) {
        let dogId = await dogs.filter(dog => dog.id == id)
        dogId.length 
        ? res.status(200).send(dogId) 
        : res.status(404).send({ info: "Dog not found"})
    }
})

router.post('/dog', async (req, res) =>{
    let { name, 
        height, 
        weight, 
        life_span,
        image, 
        createdInDb,
        temperament } = req.body

    const newDog = await Dog.create({
    name, 
    height, 
    weight, 
    life_span, 
    image,
    createdInDb
});
    let tempDb = await Temperament.findAll({
        where : { name : temperament }
    })
    newDog.addTemperament(tempDb)
    res.send('Perro creado con éxito 🐶')
});

module.exports = router;