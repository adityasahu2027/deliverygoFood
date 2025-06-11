const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')

router.post('/myorderdata',async(req ,res)=>{
   try {
    let mydata = await Order.findOne({'email':req.body.email})
    res.json({orderData:mydata})
   } catch (error) {
    res.send("Server Error",error.message)
   } 
})


module.exports = router