

"use strict";
const ulcharacters = document.querySelector('.js-characters');
const inputBuscar = document.querySelector('.js-inputbuscar');
const btnBuscar = document.querySelector('.js-btnBuscar');
const favcharacters = document.querySelector('.js-favcharacters');
const btnLog = document.querySelector('.js-btLOG');
const url = 'https://dev.adalab.es/api/disney?pageSize=15';
let characterList = [];
let favcharacterList = [];

const disneyCharactersLS = JSON.parse(localStorage.getItem('disneyCharacters'));//localstorage.getItem recuparete the data without JSON.parse localStorage.getItem('disneyCharacters') weill show as string


///first function executed when loaded the website
initiate()
function initiate() {
  if (disneyCharactersLS) { // this line is asking if this disneyCharactersLS si truelsy, si esto es true we need to save whatever is in disneyCharactersLS in the array see next line. 
    characterList = disneyCharactersLS;
    renderList(characterList); //we need to render the characterList (con los datos nuevos del local storage) we use the mechanism already created below
  }
  else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.data);
        characterList = data.data
        //console.log(characterList);
        renderList(characterList);
        localStorage.setItem('disneyCharacters', JSON.stringify(characterList));
        // its crutial where we do the localstorage.setItem need to be AFTER we received the data from the api but Before that last "then" closes.
        //in the case tha we want to store the favs list we need to locate the localstorage inside the function to select the favs.
      });

  }

}



///rende de la lista de characters (la <li> se crea desde aqui en la const hml y con literals del api) que hice mal aqui?
function renderCharacterList(characterList) {
  let html = '';
  characterList.forEach((character) => {

    //for (const character of characterList) {
    ulcharacters.innerHTML = '';
    html += `
    <li id ="${character._id}" class="liCards js_liCards">
      <h3>${character.name}</h3>
      <div class="personajes">
        <img class="personajes" src="${character.imageUrl}" alt="imagen personajes"/>
        
      </div>
   
    </li>`;

  })

  return html;
}


// Update the character list and "nuevo personaje" section on the page
function renderCharacterListOnPage(listData) {
  const characterListHTML = renderCharacterList(listData);
  const nuevoPersonajeSectionHTML = renderNuevoPersonajeSection();
  ulcharacters.innerHTML = characterListHTML + nuevoPersonajeSectionHTML;
}
///Se inserta al html la li y se crea un array de li. Se hacen clickables las cards se usan un loop por que es un array.

function renderList(listData) {
  ulcharacters.innerHTML = renderCharacterList(listData);
  const liCard = document.querySelectorAll('.js_liCards');
  //console.log(liCard);
  for (const li of liCard) {
    li.addEventListener("click", licardClick);
  }
}

///                                            funcion del cick para favo creada para ser llamada
function eventListenerLi(event) {
  const liCard = document.querySelectorAll('.js_liCards');
  //console.log(liCard);
  for (const li of liCard) {
    li.addEventListener("click", licardClick);
  }
  

}


///                                                       funcion clicking and search


function handleClickSearch(event) {
  event.preventDefault();
  const inputBuscarValue = inputBuscar.value
  const filtercharacterList = characterList
    .filter((characterName) => characterName.name.toUpperCase().includes(inputBuscarValue.toUpperCase()));

  ulcharacters.innerHTML = renderCharacterList(filtercharacterList);
  eventListenerLi(event);
  console.log(filtercharacterList);
  
  
};

btnBuscar.addEventListener("click", handleClickSearch);

function handleClickLog(event){
  event.preventDefault();
console.log(favcharacterList.length);
}


btnLog.addEventListener("click", handleClickLog);C
  const id = parseInt(event.currentTarget.id);
  console.log(id);
  //find
  console.log(characterList);
  const selectedLiCard = characterList.find((item) => item._id === id);///dentro del array fetched look for one of the item/character/card "find((item ))" cuyo =>item.id que sea strictly equal "===" to the Clicked/selected item/character/card
  ///el item selected is the id osea lo q se guardo en esa const
  //console.log(selectedLiCard);

  const indexFav = favcharacterList.findIndex((item) => item._id === id); ///to see if the item/character/card is already on the favs list meaning clicked it on. Need to do another search, looking for those items clicked on so you know if belog to the fav and save it in the index
  //console.log(indexFav);

  if (indexFav === -1) {
    favcharacterList.push(selectedLiCard);//to do the push, get the array created to put in all the pushed item ".push" in 
    favcharacters.classList.toggle('favorite');
  }
  else {
    favcharacterList.splice(indexFav, 1);/// no me  muy queda claro el splice en este ejemplo pero es para sacar el item de la lista. indexfav es la posicion y 1 seria la cantidad de items? 
    favcharacters.classList.toggle('favorite');
  }
  //console.log(favcharacterList);
  //in the case if a list such as favs list we Cant call the local storage Before the event of selecting the items, Has to be After the event of selecting happend.
  
 
  renderfavcharacterList();
;
///                                          inserting whats in the favs array in the html/ se crea un elemento html "ul" to inject the list into the ul. 
///using the function/mechanism that we created to render all the data from the api  we use it again here to render the fav selected
function renderfavcharacterList() {

  let html = '';
  favcharacterList.forEach((character) => {
    html += `
    <li id ="${character._id}" class="liCards js_liCards">
      <h3>${character.name}</h3>
      <div class="personajes">
        <img class="personajes" src="${character.imageUrl}" alt="imagen personajes"/>
      </div>
    </li>`;

  })

  favcharacters.innerHTML = html
}
























