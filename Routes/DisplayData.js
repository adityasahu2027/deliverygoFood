const express = require('express');
const router = express.Router();

router.post("/foodData", (req, res) => {
       
try {
    res.send([global.food_items, global.foodCategory]);
} catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
}})
module.exports = router;