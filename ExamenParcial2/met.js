const request = require('request')

const searchObject = function(qObject, callback){
  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q='+qObject;

  request({ url, json: true }, function(error, response) {
    if (error) {
      console.log("ERROR");
      console.log(error);
      callback('Service unavailable', undefined);
    } else {
      const data = response.body

      if(data.total == 0){
        callback('No se encontró el objeto',undefined);
      } else{
        console.log("SUCCESS");
        const info = {
          objectID: data.objectIDs[1]
        }
        console.log(info);
        callback(undefined, info);
      }
    }
  })

}

module.exports = {
  searchObject: searchObject
}
