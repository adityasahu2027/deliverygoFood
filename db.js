const mongoose = require('mongoose');
const dbURL = "mongodb+srv://adityasahu62599:gofood12345@cluster0.ful3q.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0"

const mongoDb = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("MongoDB connected successfully");
        const fetch_data = mongoose.connection.db.collection('food_items');
        const data = await fetch_data.find({}).toArray();
        console.log("Data fetched successfully from MongoDB");
        // console.log(data);
        const foodCategory = mongoose.connection.db.collection('foodcategory');
        const foodCategoryData = await foodCategory.find({}).toArray();
        global.foodCategory = foodCategoryData; // Store the fetched category data in a global variable
        global.food_items = data; // Store the fetched data in a global variable
        
    } catch (err) {
        console.log("Mongo connection or fetch error:", err);
    }
}
module.exports = mongoDb;