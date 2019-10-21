
const express = require('express');
const app = express()

//Puerto dinamico
const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Up and Running!')
})

//Ruta de tipo get
app.get('/students/:id', function(req, res) {
  id = req.params.id;

  if(id == "A00818345"){
    res.send({
      "id": "A00818345",
      "fullname": "Lucia Oseguera Gonzalez",
      "nickname": "Lu",
      "age": 24
    })
  }
  else{
    res.send({
      error: "No se encontró la matricula."
    })
  }
});

//Ruta met recibe parametro de busqueda serch
const request = require('request')
const MET = require('./met.js')

app.get('/met',function(req,res){
  if( !req.query.search ) {
    return res.send({
      error: 'Tienes que dar un objeto a buscar'
    })
  }

MET.searchObject(req.query.search,function(error, response){
    if(error) {
      return res.send({
        error: error
      })
    }
    else {
      //Si no hay error busca los datos de ese objeto
      getObjectByID(response, function(error, response){
        if(error){
          return res.send({
            error: error
          });
        }

        let data ={
          searchTerm: req.query.search,
          artist : response.artist,
          title: response.title,
          year: response.year,
          technique: response.technique,
          metUrl: response.metUrl
        }

        //Regresa el json final
        return res.send(data);
      })
    }
  })

})

function getObjectByID(objectID,callback){
  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'+objectID.objectID;

  request({ url, json: true }, function(error, response) {
    if(error){
      callback(error,undefined);
    }

    let body = response.body;

    //Formato de retorno de objeto
    const data = {
      artist : body.constituents[0].name,
      title: body.title,
      year: body.objectEndDate,
      technique: body.medium,
      metUrl: body.objectURL
    };
    callback(undefined,data)

  })
}
