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
    this.movieId = json.imdbID;
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
                    }, 1000);
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
        const xhr = 'http://www.omdbapi.com/?apikey=c2fc6e8c&s=' + title + '&type=' + type + '&page=' + page;
        return await this.request(xhr);
    }
    async getMovie(movieId) {
        const xhr = 'http://www.omdbapi.com/?apikey=c2fc6e8c&i=' + movieId;
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
let info = document.createElement('div');
let countFilms;
let number;
let json;
let jsonFull;
let count;
let movieId = [];
let movieService = new MovieService();
let modal = document.createElement('div');
modal.id = 'myModal';
modal.className = 'modal';
let modalContent = document.createElement('div');
modalContent.className = 'modal_content';
let close = document.createElement('span');
close.className = 'close';
close.innerText = '×';
modalContent.appendChild(close);
modal.appendChild(modalContent);
let preloader = document.createElement('div');
preloader.className = 'preloader';
more.id = 'more';
more.innerHTML = 'More';
div.className = 'wrapper';
btn.onclick = async () => {
    let countMore = document.getElementById('more');
    if (countMore) {
        form.removeChild(countMore);
    }
    count = 1;
    error.innerText = "";
    header.innerText = "";
    div.innerHTML = "";
    info.innerHTML = "";
    form.appendChild(preloader);
    let response = movieService.search(title.value, type.value, count);
    if (title.value === "") {
        form.removeChild(preloader);
        error.innerText = 'Fill search criteria, please!';
    }
    else {
        json = JSON.parse(await response);
        countFilms = +json.totalResults;
        form.removeChild(preloader);
        if (json.Error) {
            error.innerText = 'Movie not found!';
        }
        else {
            for (let i = 0; i < json.Search.length; i++) {
                let movie = new Movie(json.Search[i]);
                movieId.push(movie.movieId);
                fillData(movie);
            }
            count++;
            search[0].after(header);
            header.after(div);
            div.after(more);
            getDetail();
        }
    }
    return countFilms;
}
function getDetail() {
    let detail = document.querySelectorAll('.detail');
    detail.forEach((el, i) => {
        el.onclick = async () => {
            close.after(preloader);
            form.appendChild(modal);
            let responseFull = movieService.getMovie(movieId[i]);
            if (responseFull) {
                jsonFull = JSON.parse(await responseFull);
                modalContent.removeChild(preloader);
                let movieDetail = new MovieDetail(jsonFull);
                fillDetailedData(movieDetail);
            }
        }
    })
    close.onclick = function () {
        info.innerHTML = "";
        modalContent.removeChild(info);
        form.removeChild(modal);
    }
}
more.onclick = async () => {
    more.before(preloader);
    more.disabled = true;
    let response = movieService.search(title.value, type.value, count);
    let jsonNext = JSON.parse(await response);
    for (let i = 0; i < jsonNext.Search.length; i++) {
        let movie = new Movie(jsonNext.Search[i]);
        movieId.push(movie.movieId);
        fillData(movie);
    }
    form.removeChild(preloader);
    more.before(div);
    getDetail();
    if ((count * 10) < countFilms) {
        more.disabled = false;
    }
    count++;
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
    let movieDetailed = document.createElement('div');
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
    modalContent.appendChild(info);
}
