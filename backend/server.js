import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

//initialize dotenv
dotenv.config();

//NOTE: not having semicolon on line 17 caused program to crash
//https://github.com/expressjs/express/issues/3515

//Database Connection with Mongoose
(async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (err) {
        console.error(`Error: ${err.message}`.red.bold);
        //exit process with failure
        process.exit(1);
    }
})();

//initialize express
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//accept JSON data in req.body
app.use(express.json());

//Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//PayPal Config
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

//deployment
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

//error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening in ${process.env.NODE_ENV} mode on port ${PORT}`);
});