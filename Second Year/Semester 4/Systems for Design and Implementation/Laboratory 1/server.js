const express = require('express');
const app = express();
app.use(express.json());

app.listen(8000, () => {
    console.log('Server is up');
});

var cats = [
    {
        id: 1,
        name: 'Mittens',
        age: 3,
        color: 'white',
        breeds: 'Persian',
        weight: 10
    },

    {
        id: 2,
        name: 'Fluffy',
        age: 2,
        color: 'black',
        breeds: 'Siamese',
        weight: 8
    },

    {
        id: 3,
        name: 'Patches',
        age: 1,
        color: 'brown',
        breeds: 'Tabby',
        weight: 6
    },

    {
        id: 4,
        name: 'Zoe',
        age: 4,
        color: 'pink',
        breeds: 'Zoitza',
        weight: 3
    }

]

app.get('/cats', (req, res) => {
    res.send({
        success: true,
        message: 'Cats fatched successfully',
        data: cats
    });
});

app.post('/add', (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var color = req.body.color;
    var breeds = req.body.breeds;
    var weight = req.body.weight;
    
    cats.push({
        id: cats.length + 1,
        name: name,
        age: age,
        color: color,
        breeds: breeds,
        weight: weight
    });

    res.send({
        success: true,
        message: 'Cat added successfully'
    });
});

app.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    var newCats = cats.filter(el => el.id != id);
    cats = newCats;

    res.send({
        success: true,
        message: 'Cat deleted successfully'
    });
});

app.put('/update/:id', (req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var age = req.body.age;
    var color = req.body.color;
    var breeds = req.body.breeds;
    var weight = req.body.weight;

    var index = cats.findIndex(el => el.id == id);
    
    cats[index] = {
        ...cats[index],
        name: name,
        age: age,
        color: color,
        breeds: breeds,
        weight: weight
    }

    res.send({
        success: true,
        message: 'Cat updated successfully'
    });
});