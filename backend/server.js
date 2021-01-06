import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';

//initialize dotenv
dotenv.config()

//initialize express
const app = express();

//Database Connection with Mongoose
(async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.blue);
        console.log('----//----//----');

    } catch (err) {
        console.error(`Error: ${err.message}`.red.bold);
        //exit process with failure
        process.exit(1);
    }
})();

//Routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('----//----//----');
    console.log(`App listening in ${process.env.NODE_ENV} mode on port ${PORT}`.blue);
    console.log('----//----//----');
});