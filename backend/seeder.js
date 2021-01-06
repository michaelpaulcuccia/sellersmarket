import mongoose from 'mongoose';
import colors from 'colors';
import users from '../backend/data/users.js';
import products from '../backend/data/products.js';
import User from '../backend/models/User.js';
import Product from '../backend/models/Product.js';
import Order from '../backend/models/Order.js';

//Database Connection with Mongoose
(async () => {
    try {
        const conn = await mongoose.connect("MONGO_URI",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });

        console.log(`Seeder Connected: ${conn.connection.host}`.green);
        console.log('----//----//----');

    } catch (err) {
        console.error(`Error: ${err.message}`.red.bold);
        //exit process with failure
        process.exit(1);
    }
})();

const importData = async () => {
    try {
        //clear DB
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        //import users
        const createdUsers = await User.insertMany(users);
        //get Admin User from createdUsers array, first item in data/users.js
        const adminUser = createdUsers[0]._id

        //add adminUser to each product
        const sampleProducts = products.map(prod => {
            return { ...prod, user: adminUser }
        });
        console.log('SAMPLE PRODUCTS'.green.bold)
        console.log(sampleProducts);

        //import sampleProducts
        await Product.insertMany(sampleProducts);

        process.exit();

    } catch (err) {
        console.error(`Import Error: ${err.message}`.red.bold);
        process.exit(1)
    }
};

const destroyData = async () => {
    try {
        //clear DB
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('DATA DESTROYED'.green.bold)

        process.exit();

    } catch (err) {
        console.error(`Destroy Error: ${err.message}`.red.bold);
        process.exit(1)
    }
};

//call with: $ node backend/seeder OR $ node backend/seeder -d
//OR npm run data:import ... npm run data:destroy
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

