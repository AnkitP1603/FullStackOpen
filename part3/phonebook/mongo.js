import mongoose from 'mongoose'

if(process.argv.length<3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://admin:${password}@cluster0.rrzklfb.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(uri,{ family:4 })

export const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){
  Person.find({}).then(res => {
    console.log('Phonebook:')
    res.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}else if(process.argv.length===5){
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}else{
  console.log('Please provide the correct arguments: \nTo display all entries: node mongo.js <password>\nTo add an entry: node mongo.js <password> <name> <number>')
  process.exit(1)
}