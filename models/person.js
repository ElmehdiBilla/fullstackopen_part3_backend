const mongoose = require('mongoose');

const URL=process.env.MONGO_URI

console.log('connecting to', URL)

mongoose.connect(URL)
    .then(res => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3
    },
    number:{
        type:String,
        minlength:8,
        validate: {
        validator: v => /^\d{2,3}-\d{7,8}$/.test(v),
        message: props => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
    transform : (doc, retunedObj) => {
        retunedObj.id = retunedObj._id.toString();
        delete  retunedObj._id;
        delete  retunedObj._v;
    }
})

module.exports = mongoose.model('Person',personSchema)