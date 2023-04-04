import {movieApi} from "./keys.js";
// Gets our movie list from our local library
export const getFavorites = async () => {
    try {
        let url = `http://localhost:3000/favorites`;
        let options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let response = await fetch(url, options);
        let data = await response.json();
        console.log(data)
        return data;
    } catch(error){
        console.log(error);
    }
}

// Creates our movie card with our existing database
const API_KEY = 'movieApi';

const getMoviePoster = async (movie) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${movieApi}&query=${movie.title}`
    );
    const data = await response.json();
    const posterPath = data.results[0].poster_path;
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
};


// Creates our movie card with our existing database
export const movieCard = async () => {
    try {
        const data = await getFavorites();
        for (const movie of data) {
            const element = document.createElement('div');
            const posterUrl = await getMoviePoster(movie);
            element.innerHTML  = `
            <div class="column cardColumn">
                <h3>${movie.title}</h3>
                <img src="${posterUrl}" alt="${movie.title} poster">
                <p>Genre: ${movie.genre}</p>
                <p>Rating: ${movie.rating}</p>
                <div class="row buttonRow">
                    <button class="deleteButton">delete</button>
                    <button class="editButton">edit</button>
                </div>
            </div>
           
      `;
            let deleteButton = element.querySelector('.deleteButton');
            deleteButton.addEventListener('click', function(){
               deleteFavorite(movie.id);
               element.remove();
            });
            let editButton = element.querySelector('.editButton');
            editButton.addEventListener('click',function (){
                patchFavorite(movie.id,movie)
            })
            document.querySelector("#movie-daddy").appendChild(element);
        };
    } catch (error) {
        console.log(error);
    }
};

// Gets a single movie by the id number
export const getFavorite = async (id) => {
    try {
        let url = `http://localhost:3000/favorites/${id}`;
        let options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}


export const searchFavorite = async (movie) => {
    let favorites = await getFavorites();
    if (movie.title) {
        let favorite = favorites.find((result) => {
            return movie.title === result.title;
        });
        if (favorite) {
            return favorite;
        } else {
            return 'No movie was found with that title';
        }
    } else if(movie.genre) {
        let favoritesFiltered = favorites.filter((result) => {
            return movie.genre === result.genre;
        });
        if (favoritesFiltered.length > 0) {
            return favoritesFiltered;
        } else {
            return 'No movies were found with that genre';
        }
    }
}

export const setFavorite = async (movie) => {
    try {
        let url = `http://localhost:3000/favorites`;
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}

export const patchFavorite = async (id, movie) => {

    let title = prompt('Enter the new title for the movie:');
    let rating = prompt('Enter the new rating for the movie:');
    let genre = prompt('Enter the new genre for the movie:');

    // update the movie object with the new information
    movie.title = title;
    movie.rating = rating;
    movie.genre = genre;

    try {
        if (!id) {
            throw new Error('You must provide an id');
        }
        let url = `http://localhost:3000/favorites/${id}`;
        let options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        }

        let response = await fetch(url, options);
        let data = await response.json();


        console.log(data)
        return data;
    } catch(error){
        console.log(error);
    }
}


export const deleteFavorite = async (id) => {
    try {
        if (!id) {
            throw new Error('You must provide an id');
        }
        let url = `http://localhost:3000/favorites/${id}`;
        let options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch(error){
        console.log(error);
    }
}

