// Quake View handler
export default class quakesView { 
   renderQuakeList(quakeList, listElement) {
     //build a list of the quakes...include the title and time of each quake then append the list to listElement. You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
     listElement.innerHTML = quakeList.features.map(quake => {
       return `<li id="${quake.id}">${quake.properties.title}, ${new Date(quake.properties.time)}</li>`; })
     .join('');
   }

   renderQuake(quake, element) {
      const quakeProperties = quake.properties
      // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
      if(element.childNodes.length > 1) {
         element.innerHTML = `${quakeProperties.title}, ${new Date(quakeProperties.time)}`
      } else{
      element.innerHTML = `${quakeProperties.title}, ${new Date(quakeProperties.time)}
      <ul>
      <li>Approximite Distance to Epicenter from Nearest Station in KM: ${quakeProperties.dmin * 111.2}</li>
      <li>Number of Seismic Stations that recorded this event: ${quakeProperties.nst}</li>
      <li>Estimated Significance of Event: ${quakeProperties.sig}</li>
      </ul>`
      }
   }
 }