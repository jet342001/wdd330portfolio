import { getLocation } from './utilities.js';
import quake from './quake.js';
import quakesView from './quakesView.js';

// Quake controller
export default class quakesController {
  constructor(parent, position = null) {
    this.parent = parent;
    // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
    this.parentElement = null;
    // let's give ourselves the option of using a location other than the current location by passing it in.
    this.position = position || {
      lat: 0,
      lon: 0
    };
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.quakes = new quake();
    this.quakesView = new quakesView();
  }

  async init() {
    // use this as a place to grab the element identified by this.parent, do the initial call of this.initPos(), and display some quakes by calling this.getQuakesByRadius()
    this.parentElement = document.querySelector(this.parent);
    await this.initPos();
    this.getQuakesByRadius(100);
  }

  async initPos() {
    // if a position has not been set
    if (this.position.lat === 0) {
      try {
        // try to get the position using getLocation()
        const locationData = getLocation();
        let locationDetails = [];
        await locationData.then((response) => {
            locationDetails = response;
         })
        // if we get the location back then set the latitude and longitude into this.position
         this.position.lat = locationDetails.coords.latitude;
         this.position.lon = locationDetails.coords.longitude;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getQuakesByRadius(radius) {
    // this method provides the glue between the model and view. Notice it first goes out and requests the appropriate data from the model, then it passes it to the view to be rendered.
    //set loading message
    this.parentElement.innerHTML = 'Loading...';
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(
      this.position,
      radius
    );
    // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    // add a listener to the new list of quakes to allow drill down in to the details
    this.parentElement.childNodes.forEach(element => {
      element.addEventListener('click', e => {
         if(e.target.attributes.id.nodeValue != undefined){
         this.getQuakeDetails(e.target.attributes.id.nodeValue);
         }    
    });
   });
  }

  async getQuakeDetails(quakeId) {
   //could try detials call https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=uu60314892&format=geojson
   // get the details for the quakeId provided from the model, then send them to the view to be displayed
   const singleQuake = this.quakes.getQuakeById(quakeId);
   this.quakesView.renderQuake(singleQuake, document.getElementById(quakeId));
   }
}