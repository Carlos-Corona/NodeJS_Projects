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

getTV(API_URL_TV);

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
        const { name, poster_path, vote_average, overview, id, first_air_date } = TV;
        const mediaElement = document.createElement('div');
        const full_date = moment(first_air_date).format("DD MMMM YYYY"); //prints 21 April, 2018
        mediaElement.classList.add('movie');
        mediaElement.innerHTML = `
            <p hidden>${id}</p>
            <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580.png?text=Imagen+No+Disponible"}" alt="${name}">
            <div class="movie-info">
                <h2>${name}</h2>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="type-data">
                <h3>Serie</h3>
            </div>
            <div class="overview">
                <span class="first_air_date">
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
                    <button type="submit" class="btnGoto" id=${id} >Ver en TMDB</button>
                    <button type="submit" class="btnSaveto" id="btnSaveto">Guardar</button>
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
    const URL = 'https://api.themoviedb.org/3/tv/';
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
        const { name, poster_path, vote_average, overview, id, first_air_date } = dataTV;

        params.title = name
        params.descr = overview
        params.cover = IMG_URL + poster_path
        params.vote_average = vote_average.toFixed(1)
        params.id = id
        params.release_date = first_air_date
        params.media_type = 'Serie'
        asyncPostCall(params);
    }).catch(err => console.log(err));

    /*
    let result = fetch(BackURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: idTV,
            title: tvName,
            descr: overviewTV,
            cover: poster_pathTV,
            vote_average: vote_averageTV,
            release_date: first_air_dateTV,
            media_type: 'Series'
        }),
        mode: "cors"
    })
    result.then((sucess) => { console.log(sucess) })
    */
    
}




function openNav(id) {
    const Link = "https://www.themoviedb.org" + "/tv/" + id + '?language=es-ES';
    window.open(Link, '_blank');
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