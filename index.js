import {MongoClient} from 'mongodb'

const stringConexao = "mongodb://jpfaccat:0SFC2Ff8wpB5ZsvJjiKlJhq9toaRtSwBAviKw06sIgFXPdAYXXjkRwWWGvCxqdd8Yub4s8fBVnglGukXw0sdDg%3D%3D@jpfaccat.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@jpfaccat@"

const servidor = new MongoClient(stringConexao)
const dbName = 'testeaula';

async function inserirRegistros(collection){
    const insertResult = await collection.insertMany([
        { nome : "Leonardo",
        sobrenome: "Meyrer",
        anoNascimento: "1990" },
        { nome : "William",
        sobrenome: "Pez",
        anoNascimento: "1998" },
        ]);
    console.log('Inserted documents =>', insertResult);
}

async function lerRegistros(collection){
    const query = {}
    const retornoQuery = await collection.find(query);
    await retornoQuery.forEach(console.dir);
}

async function alterarRegistros(collection){
    const filter = { nome: "Leonardo" };
    // update the value of the 'z' field to 42
    const updateDocument = {
    $set: {
        nome: "Luiz",
        sobrenome: "Jardim"
    },
    };
    const result = await collection.updateOne(filter, updateDocument);
    console.log(result)
}

async function deletarRegistros(collection){
    const doc = {
        nome: "William"
    }
    const deleteResult = await collection.deleteOne(doc);
    console.log(deleteResult)
}

async function main(){
    await servidor.connect();
    console.log('Connected successfully to server');
    const db = servidor.db(dbName);
    const collection = db.collection('Pessoa');
    //await inserirRegistros(collection)
    //await lerRegistros(collection)
    //await alterarRegistros(collection)
    //await deletarRegistros(collection)
    return 'done.'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => servidor.close());