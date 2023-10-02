const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);    
    next();
});

app.use('/api/workouts', workoutRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Conectado ao banco de dados e escutando na porta ${PORT}`);
        });   
    })
    .catch((err) => {
        console.log(err);
    });

