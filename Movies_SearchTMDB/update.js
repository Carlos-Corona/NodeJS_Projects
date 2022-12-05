//TMDB 
const API_URL = 'http://localhost:3000'
const showID_URL = API_URL + '/api/show/last_id/';
const API_URL_Media = 'http://localhost:3000/api/media/';
const main = document.getElementById('main');
const form = document.getElementById('form');


getLastID(showID_URL);


function getLastID(urlPath) {
  const asyncPostCall = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: undefined,
        mode: 'cors'
      });
      const data = await response.json();
      const {id} = data;
      getMediaElementToForm(id);
    } catch (error) {
      console.log(error)
    }
  }


  return asyncPostCall(urlPath);
}

function getMediaElementToForm(id) {
  console.log(id)
  const asyncPostCall = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: undefined,
        mode: 'cors'
      });
      const data = await response.json();
      showForm(data);
    } catch (error) {
      console.log(error)
    }
  }

  asyncPostCall(API_URL_Media + id)
}

function showForm(data) {
  const formElement = document.createElement('div');
  main.innerHTML = '';
  console.log(data[0])
  const {id, title, descr, cover, media_type, release_date, vote_average} = data[0];
  formElement.classList.add('container');
  formElement.innerHTML = `
    
    <form id="form">
      <h3> ${title}</h3>
      <h4> Formulario de Actualizacion/Modificacion</h4>
      <fieldset>
        <label> ID </label>
        <p hidden name="id_hidden">${id} </p>
        <input readonly placeholder="TMDB: ${id}" name="id" type="text" tabindex="1">
      </fieldset>
      <fieldset>
        <label> Titulo </label>
        <input placeholder="" type="text" tabindex="2" name="titulo_update" value = "${title}" autofocus>
      </fieldset>
      <fieldset>
        <label> Calificacion (Ejemplo: 6.6)*</label>
        <input placeholder="" type="tel" tabindex="3" name="votes_update" value = "${vote_average}" id="calificacion">
      </fieldset>
      <fieldset>
        <label> Fecha de estreno (formato yyyy-mm-dd)* </label>
        <input placeholder="" type="tel" tabindex="4" name="release_update" value = "${release_date}" id="estreno">
      </fieldset>
      <fieldset>
        <label> Imagen URL (1080x1050)*</label>
        <input placeholder="" type="url" tabindex="5" name="cover_update" value = "${cover}" >
      </fieldset>
      <fieldset>
        <label> Descripcion </label>
        <textarea placeholder="" name="descrip_update" tabindex="5"> ${descr}</textarea>
      </fieldset>
      <fieldset>
        <label> Tipo </label>
        <input placeholder="" type="tel" tabindex="6" name="media_update" value = "${media_type}" id="type">
      </fieldset>
      <fieldset>
      <button type="button" id="btnSave" class="btnSave"> Guardar </button>
      </fieldset>
      <p> * Si no se cumplen con las caracteristicas no se mostraran los datos de forma correcta</p>
    </form>
  </div>
            
        `
  main.append(formElement);
}

const on = (element, event, selector, handler) => {

  element.addEventListener(event, e => {
      if (e.target.closest(selector)) {
          handler(e);
      }
  })
}

on(document, 'click', '.btnSave', e => {
  const id_fieldElement = e.target.parentNode.parentNode[0];
  //console.log(id_fieldElement);
  const id_update = id_fieldElement.children[1].innerHTML;
  console.log(id_update)
  var name_update = document.getElementsByName("titulo_update")[0].value;
  var cover_update = document.getElementsByName("cover_update")[0].value;
  var votes_update = document.getElementsByName("votes_update")[0].value;
  var media_update = document.getElementsByName("media_update")[0].value;
  var descrip_update = document.getElementsByName("descrip_update")[0].value;
  var release_update = document.getElementsByName("release_update")[0].value;
  
  //console.log(name_update);
  //console.log(votes_update);
  //console.log(release_update);
  //console.log(cover_update);
  //console.log(descrip_update);
  //console.log(media_update);

  let data = {
    title: name_update,
    cover: cover_update,
    vote_average: votes_update,
    media_type: media_update,
    descr: descrip_update,
    release_date: release_update
  }
  saveIDtoUpdate(data, id_update)
})


function saveIDtoUpdate(data,id) {
  const BackURL = 'http://localhost:3000/api/media/' + id;
  console.log(id);
  const asyncPostCall = async (data_json) => {
      try {
          const response = await fetch(BackURL, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data_json),
              mode: 'cors'
          });
          const data = await response.json();
          // enter you logic when the fetch is successful
          console.log(data);
      } catch (error) {
          // enter your logic for when there is an error (ex. error toast)
          console.log(error)
      }
  }

  asyncPostCall(data);
  window.open('http://localhost:5500/my_media.html','_self');
}