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
export const movieCard = async () => {
    try {
        let data = await getFavorites();
        data.forEach((movie) => {
            let element = document.createElement("div");
            element.innerHTML = `

        <div class="row cardRow">
            <div class="column cardColumn">
                <h1>Movie : ${movie.title}</h1>
                <p>Genre: ${movie.genre}</p>
                <p>Rating: ${movie.rating}</p>
                <div class="row buttonRow">
                    <button class="deleteButton">delete</button>
                    <button class="editButton">edit</button>
                </div>
            </div>
           
      `;
            document.querySelector("#movie-daddy").appendChild(element);
        });
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

