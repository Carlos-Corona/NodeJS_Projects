//TMDB 

const API_KEY = 'api_key=530e0261c942a040e464884807ad95d8';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANG = '&language=es-ES'
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_URL_TV = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY + LANG;
const searchTV = '/search/tv?';
const searchURL_TV = BASE_URL + searchTV + API_KEY + LANG;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const urlLocal = 'http://localhost:3000/api/media/'
const tmdb_id = 0;

sessionStorage.setItem('last_id_media', 0);


getMovies(urlLocal);


function getMovies(urlM) {
    fetch(urlM).then(res => res.json()).then(dataM => {
        console.log('PELICULAS');
        console.log(urlM);
        console.log(dataM);
        showMovies(dataM);
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(media => {
        const { title, cover, vote_average, descr, id, release_date, media_type } = media;
        const movieEl = document.createElement('div');
        const full_date = moment(release_date).format("DD MMMM YYYY"); //prints 21 April, 2018

        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <p hidden>${id}</p>
            <img class = 'imgClick' id = "imgClick" src="${cover ? cover : "http://via.placeholder.com/1080x1580"}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="type-data">
                <h3>${media_type}</h3>
            </div>
            <div class="edit btnUpdate" id="btnUpdate">
                <a><i class="fa-solid fa-pen-to-square fa-lg"></i></a>
            </div>
            <div class="overview">
                <span class="release_date">
                    Estreno: 
                    <p>${full_date}</p>
                </span>
                <h3>Sinopsis</h3>
                <p align="justify">
                ${descr}
                <p/> 
            </div>
            <div class="action-buttons">
                <div class="action_inner">
                    <button type="submit" class="btnGoto" id=${id} >Ver en TMDB</button>
                    <button type="submit" class="btnDelete" id="btnDelete">Eliminar de Favoritos</button>
                </div>
                
            </div>
            <div class="space-between"></div>
            
        `
        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNav(id, media_type)
        })
    })
}



function getColor(vote) {
    if (vote >= 7) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
}


const on = (element, event, selector, handler) => {

    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    })
}

on(document, 'click', '.imgClick', e => {
    const id = e.target.parentNode.firstElementChild.innerHTML;
    console.log(id)
    //return saveIDtoBack_Action(id, 0)
})

on(document, 'click', '.btnDelete', e => {
    const id_movie = e.target.parentNode.parentNode.parentNode;
    //console.log(id_movie);
    const sent = id_movie.firstElementChild.innerHTML;
    //const element1 = save_id.children[1];
    console.log(sent);
    return deleteFuntionRestAPI(sent);
})


on(document, 'click', '.btnUpdate', e => {
    const id_movie = e.target.parentNode.parentNode.parentNode;
    //console.log(id_movie);
    const sent = id_movie.firstElementChild.innerHTML;
    //const element1 = save_id.children[1];
    //localStorage.setItem('last_id_media', sent);
    //console.log(localStorage.getItem('last_id_media'));

    return saveIDtoBack_Action(sent, 1)
})

function saveIDtoBack_Action(id, option) {
    const BackURL = 'http://localhost:3000/api/store/last_id/' + id;

    const asyncPostCall = async () => {
        try {
            const response = await fetch(BackURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: undefined,
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

    asyncPostCall();
    if (option) {
        window.open('http://localhost:5500/Update.html', '_self');
    } else {
        //window.open('http://localhost:5500/view.html', '_self');
    }

}



function deleteFuntionRestAPI(id) {
    const BackURL = 'http://localhost:3000/api/media/';
    const FULL_URL = BackURL + id;
    console.log(FULL_URL);
    const asyncPostCall = async (FULL_URL) => {
        try {
            const response = await fetch(FULL_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: undefined
            });
            const data = await response.json();
            // enter you logic when the fetch is successful
            console.log(data);
            getMovies(urlLocal);
        } catch (error) {
            // enter your logic for when there is an error (ex. error toast)

            console.log(error)
        }
    }
    asyncPostCall(FULL_URL);

    //location.reload(true)
}




function openNav(id, media_type) {
    if (media_type == 'Serie') {
        const Link = "https://www.themoviedb.org" + "/tv/" + id + '?language=es-ES';
        window.open(Link, '_blank');
    } else {
        const Link = "https://www.themoviedb.org" + "/movie/" + id + '?language=es-ES';
        window.open(Link, '_blank');
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getTV(searchURL_TV + LANG + '&query=' + searchTerm);
    } else {
        getTV(API_URL_TV);
    }
})