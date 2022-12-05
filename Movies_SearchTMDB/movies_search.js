//TMDB 

const API_KEY = 'api_key=530e0261c942a040e464884807ad95d8';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANG = '&language=es-ES'
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + LANG;
const searchMedia = '/search/movie?';
const searchURL = BASE_URL + searchMedia + API_KEY + LANG;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getTV(API_URL
);

const tmdb_id = 0;


function getTV(urlMedia) {
    const asyncPostCall = async (urlMedia) => {
        try {
            const response = await fetch(urlMedia, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: undefined
            });
            await response.json().then(dataMedia => {
                // enter you logic when the fetch is successful
                console.log(urlMedia);
                console.log(dataMedia);
                showTV(dataMedia.results);
            })
        } catch (error) {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        }
    }
    asyncPostCall(urlMedia)
}

function showTV(dataTV) {
    main.innerHTML = '';

    dataTV.forEach(TV => {
        const { title, poster_path, vote_average, overview, id, release_date } = TV;
        const mediaElement = document.createElement('div');
        const full_date = moment(release_date).format("DD MMMM YYYY"); //prints 21 April, 2018
        mediaElement.classList.add('movie');
        mediaElement.innerHTML = `
            <p hidden>${id}</p>
            <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580.png?text=Imagen+No+Disponible"}" alt="${title}">
            <div class="movie-info">
                <h2>${title}</h2>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="type-data">
                <h3>Pelicula</h3>
            </div>
            <div class="overview">
                <span class="release_date">
                    Estreno: 
                    <p>${full_date}</p>
                </span>
                <h3>Sinopsis</h3>
                <p align="justify">
                ${overview}
                <p/> 
            </div>
            <div class="action-buttons">
                <div class="action_inner">
                    <button type="submit" class="btnGoto" id="${id}" >Ver en TMDB</button>
                    <button type="submit" class="btnSaveto" id="tmdb${id}">Guardar</button>
                </div>
                
            </div>
            <div class="space-between"></div>
            
        `
        main.appendChild(mediaElement);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNav(id)
        });
    })

}




const on = (element, event, selector, handler) => {

    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    })
}

on(document, 'click', '.btnSaveto', e => {
    const id_movie = e.target.parentNode.parentNode.parentNode;
    //console.log(id_movie);
    const sent = id_movie.firstElementChild.innerHTML;
    //const element1 = save_id.children[1];
    console.log(sent);
    return getMovieInfo(sent);
})


function getColor(vote) {
    if (vote >= 7) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
}




function getMovieInfo(id_tv) {
    const URL = 'https://api.themoviedb.org/3/movie/';
    const BackURL = 'http://localhost:3000/api/media/';
    const FULL_URL = URL + id_tv + '?' + API_KEY + LANG;
    const asyncPostCall = async (parameters) => {
        try {
            const response = await fetch(BackURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parameters)
            });
            const data = await response.json();
            // enter you logic when the fetch is successful
            console.log(data);
            const btnSaveAction = document.getElementById('tmdb'+id_tv);
            console.log("ACTION ==== "+ btnSaveAction.innerHTML)
            
            btnSaveAction.parentNode.innerHTML = `<button type="submit" class="btnGoto" id="${id_tv}" >Ver en TMDB</button>
            <button type="submit" class="btnSaveto" id="tmdb${id_tv}">Guardado</button>`
        } catch (error) {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        }
    }
    let params = {
        id: 1,
        title: '',
        descr: '',
        cover: '',
        vote_average: 1,
        release_date: '',
        media_type: 'Series'
    }

    fetch(FULL_URL).then(res => res.json()).then(dataTV => {
        console.log('TV');
        console.log(FULL_URL);
        console.log(dataTV);
        const { title, poster_path, vote_average, overview, id, release_date } = dataTV;

        params.title = title
        params.descr = overview
        params.cover = IMG_URL + poster_path
        params.vote_average = vote_average.toFixed(1)
        params.id = id
        params.release_date = release_date
        params.media_type = 'Pelicula'
        asyncPostCall(params);
    }).catch(err => console.log(err));
}




function openNav(id) {
    const Link = "https://www.themoviedb.org" + "/movie/" + id + '?language=es-ES';
    window.open(Link, '_blank');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getTV(searchURL + LANG + '&query=' + searchTerm);
    } else {
        getTV(API_URL);
    }
})