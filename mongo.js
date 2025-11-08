const mongoose = require('mongoose');


if(process.argv.length < 3){
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://billamehdi:${password}@cluster0.qk7pggr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name:String,
    number:String
})

const Person = mongoose.model('Person',personSchema)

if((!name || !number)){
    Person.find({}).then(res => {
        console.log('phonebook:')
        res.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
}else{
    const newPerson =  new Person({
        name:name,
        number:number
    })
    newPerson.save().then(res => {
        console.log(`adde ${res.name} number ${res.number} to phonebook`);
        mongoose.connection.close()
    })
}