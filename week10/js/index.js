import { getJSON, getLocation } from './utilities.js';
import quakesController from './quakesController.js';
const baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

const myQuakeController = new quakesController(`#quakeList`);

window.addEventListener('load', () => {
   myQuakeController.init();
 });

//make function availible to window
window.displayRadius = displayRadius;
function displayRadius() {
   const radius = Number(document.getElementById("radius").value);

   myQuakeController.getQuakesByRadius(radius);
}
