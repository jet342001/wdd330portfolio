

const getJSON = (url) => {
    fetch(url)
   //make sure fetch went well
   .then((response) => {
      if(response.ok) {
         return response;
      }
      throw Error(response.statusText);
   })
   //consume promise into JSON
   .then( (response) => response.json())
   //build items through the data
   .then( (quakes) => {
      console.log(quakes);
   })
   .catch( error => console.log('There was an error!') )
};
getJSON('earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02');
