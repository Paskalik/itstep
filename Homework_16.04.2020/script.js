'use strict';
function Movie(json) {
    if (json.Poster === 'N/A') {
        this.poster = 'images.png'
    }
    else {
        this.poster = json.Poster;
    }
    this.title = json.Title;
    this.year = json.Year;
}
function MovieDetail(json) {
    if (json.Poster === 'N/A') {
        this.poster = 'images.png';
    }
    else {
        this.poster = json.Poster;
    }
    this.title = json.Title;
    this.released = json.Released;
    this.genre = json.Genre;
    this.country = json.Country;
    this.director = json.Director;
    this.writer = json.Writer;
    this.actors = json.Actors;
    this.awards = json.Awards
}
class MovieService {
    request(url) {
        return new Promise(function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.onload = function(e) {
                if (xhr.status === 200) {
                    setTimeout( () => {
                        resolve(xhr.response)
                    }, 5000);
                }
                else {
                    reject(xhr.status);
                }
            }
            xhr.ontimeout = function () {
                reject('timeout')
            }
            xhr.open('get', url, true)
            xhr.send()
        })
    }
    async search(title,type,page) {
        const xhr = 'http://www.omdbapi.com/?i=tt3896198&apikey=c2fc6e8c&s=' + title + '&type=' + type + '&page=' + page;
        return await this.request(xhr);
    }
    async getMovie(title,year) {
        const xhr = 'http://www.omdbapi.com/?i=tt3896198&apikey=c2fc6e8c&t=' + title + '&y=' + year;
        return await this.request(xhr);
    }
}
let form = document.getElementById('form');
let title = document.getElementById('title');
let type = document.getElementById('type');
let btn = document.getElementById('btn');
let more = document.createElement('button');
let search = document.getElementsByClassName('search');
let error = document.getElementById('error');
let div = document.createElement('div');
let header = document.createElement('h5');
let detail = document.querySelectorAll('.detail');
let info = document.createElement('div');
let countPages;
let number;
let json;
let jsonFull;
let count = 0;
let preloader = document.createElement('div');
preloader.className = 'preloader';
more.id = 'more';
more.innerHTML = 'More';
div.className = 'wrapper';
btn.onclick = async () => {
    error.innerText = "";
    header.innerText = "";
    div.innerHTML = "";
    info.innerHTML = "";
    form.appendChild(preloader);
    let movieService = new MovieService();
    let response = movieService.search(title.value, type.value, 1);
    if (title.value === "") {
        form.removeChild(preloader);
        error.innerText = 'Fill search criteria, please!';
    }
    else {
        json = JSON.parse(await response);
        countPages = +json.totalResults;
        form.removeChild(preloader);
        if (json.Error) {
            error.innerText = 'Movie not found!';
        }
        else {
            for (let i = 0; i < json.Search.length; i++) {
                let movie = new Movie(json.Search[i]);
                fillData(movie);
            }
            search[0].after(header);
            header.after(div);
            div.after(more);
            detail = document.querySelectorAll('.detail');
            detail.forEach(function (el, i) {
                el.onclick = async function () {
                    form.appendChild(preloader);
                    let responseFull = movieService.getMovie(json.Search[i].Title, json.Search[i].Year);
                    if (responseFull) {
                        form.removeChild(preloader);
                        jsonFull = JSON.parse(await responseFull);
                        let movieDetail = new MovieDetail(jsonFull);
                        fillDetailedData(movieDetail);
                    }
                }
            })
        }
    }
    return countPages;
}
more.onclick = () => {
    more.before(preloader);
    more.className = 'disabled'
    more.disabled = true;
}
function fillData(movie) {
    header.innerText = 'Films:';
    let film = document.createElement('div');
    film.className = 'film';
    let filmPoster = document.createElement('img');
    filmPoster.className = 'smallPoster';
    let filmTitle = document.createElement('p');
    filmTitle.style.fontWeight = 'bold';
    let filmYear = document.createElement('p');
    let detail = document.createElement('button');
    detail.className = 'detail';
    detail.innerText = 'Details';
    filmPoster.src = movie.poster;
    filmTitle.innerText = movie.title;
    filmYear.innerText = movie.year;
    film.appendChild(filmPoster);
    film.appendChild(filmTitle);
    film.appendChild(filmYear);
    film.appendChild(detail);
    div.appendChild(film);
}
function fillDetailedData(movieDetail) {
    let check = document.getElementsByClassName('movieDetail');
    let movieDetailed;
    if (check.length > 0) {
        movieDetailed = check[0];
        movieDetailed.innerHTML = "";
    }
    else {
        movieDetailed = document.createElement('div');
    }
    movieDetailed.className = 'movieDetail';
    let h5 = document.createElement('h5');
    h5.innerText = 'Film info:';
    let imgDiv = document.createElement('div');
    let filmPoster = document.createElement('img');
    filmPoster.className = 'posterFull';
    filmPoster.src = movieDetail.poster;
    let movieInfo = document.createElement('div');
    movieInfo.className = 'movieInfo';
    let obj = {
        'Title:': movieDetail.title,
        'Released:': movieDetail.released,
        'Genre:': movieDetail.genre,
        'Country:': movieDetail.country,
        'Director:': movieDetail.director,
        'Writer:': movieDetail.writer,
        'Actors:': movieDetail.actors,
        'Awards:': movieDetail.awards
    };
    for (let key in obj) {
        let divName = document.createElement('div');
        let divValue = document.createElement('div');
        divName.innerHTML = key;
        divValue.innerHTML = obj[key];
        movieInfo.appendChild(divName);
        movieInfo.appendChild(divValue);
    }
    imgDiv.appendChild(filmPoster);
    movieDetailed.appendChild(imgDiv);
    movieDetailed.appendChild(movieInfo);
    info.appendChild(h5);
    info.appendChild(movieDetailed);
    form.appendChild(info);
}