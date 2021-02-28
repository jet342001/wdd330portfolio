const url = 'https://pokeapi.co/api/v2/pokemon';
let count = 0;
window.onload = makePage(url);

//build page using url code for pagination
async function makePage(url) {
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
   .then( (pokemons) => {
      count = pokemons.count;
      console.log(count);
      document.getElementById("navTop").innerHTML = '';
      document.getElementById("navBot").innerHTML = '';
      document.getElementById("pokemonHolder").innerHTML = '';
      //if front no previous button
      if(pokemons.previous != null) {
         addNavButton(pokemons.previous, "previous");
      }
      //if end no next button
      if(pokemons.next != null) {
         addNavButton(pokemons.next, "next");
      }
      //step thorugh every pokemon in order
      for (pokemon of pokemons.results) {
         try{
            getPokemonData(pokemon);
         }catch(err){
            console.log(err);
         }
      }
   })
   .catch( error => console.log('There was an error!') )
}

function getPokemonData(pokemon) {
   try{
      //append item to hold place to ensure correct order
      let append = document.createElement("div");
      append.className = "pokemonCard";
      append.id = `${pokemon.name}`;
      append.innerHTML = `Retriving Data for ${[pokemon.name]}`;
      document.getElementById("pokemonHolder").appendChild(append);
      //get data for the pokemon
      fetch(pokemon.url)
      //check fetch went well
      .then((response) => {
         if(response.ok) {
            return response;
         }
            throw Error(response.statusText);
         })
      //consume promise into JSON
      .then((response) => response.json())
      //as data is recived change data within pre built object
      .then((pokemonData) => {
         let typeInfo = '';
         pokemonData.types.forEach(typeData => {
            typeInfo += `${typeData.type.name} `;
         });
         document.getElementById(pokemonData.name).innerHTML = `
         <h2 class="pokemonName">${pokemonData.name}</h2>
         <div class="pokemonInfo">
         <img src="${pokemonData.sprites.front_default}">
         <div class="basicInfo">
            <p>Weight: ${pokemonData.weight}</p>
            <p>Height: ${pokemonData.height}</p>
            <p>Type(s): ${typeInfo}</p>
         </div>
         </div>
         <div class="extraInfo">
            <div class="extraInfoLeft">
            <p>${pokemonData.stats[0].stat.name}: ${pokemonData.stats[0].base_stat}</p>
            <p>${pokemonData.stats[1].stat.name}: ${pokemonData.stats[1].base_stat}</p>
            <p>${pokemonData.stats[2].stat.name}: ${pokemonData.stats[2].base_stat}</p>
            </div>
            <div class="extraInfoRight">
            <p>${pokemonData.stats[3].stat.name}: ${pokemonData.stats[3].base_stat}</p>
            <p>${pokemonData.stats[4].stat.name}: ${pokemonData.stats[4].base_stat}</p>
            <p>${pokemonData.stats[5].stat.name}: ${pokemonData.stats[5].base_stat}</p>
            </div>
         </div>`;
         document.getElementById(pokemonData.name).addEventListener("click", () => showMoreInfo(pokemonData.name))
      })
   }catch(err){
      console.log(err);
   }
}

//add top nav button
function addNavButton(url, name) {
   let button = document.createElement("button");
   button.addEventListener("click", () => makePage(url));
   button.addEventListener("click", () => topFunction());
   button.innerHTML = `${name}`;
   document.getElementById("navTop").appendChild(button);
   addBotNav(url, name);
}

//add bot bot nav buttons
function addBotNav(url, name) {
   console.log(url);
   let button = document.createElement("button");
   button.addEventListener("click", () => makePage(url));
   button.addEventListener("click", () => topFunction());
   button.innerHTML = `${name}`;
   document.getElementById("navBot").appendChild(button);
}

//nav buttons scroll to top of page
function topFunction() {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0; 
}

function showMoreInfo(id) {
   document.getElementById(id).lastChild.style.display = "flex";
   document.getElementById(id).removeEventListener("click", () => showMoreInfo(id));
   document.getElementById(id).addEventListener("click", () => showLessInfo(id));
}

function showLessInfo(id) {
   document.getElementById(id).lastChild.style.display = "none";
   document.getElementById(id).removeEventListener("click", () => showLessInfo(id));
   document.getElementById(id).addEventListener("click", () => showMoreInfo(id));
}