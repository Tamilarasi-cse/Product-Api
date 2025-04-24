const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

const ProductSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, 'Please enter the product name']
        },

        quantity:{
            type:Number,
            required: true,
            default: 0
        },

        price:{
            type: Number,
            required: true,
            default:0
        }
    },
    {
        timestamps : true
    }
)

const Product = mongoose.model('Product',ProductSchema);


// to use it need to export

module.exports = Product;