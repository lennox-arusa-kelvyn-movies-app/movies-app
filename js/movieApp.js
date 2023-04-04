import * as movieUtils from './movieUtils.js'


(async()=>{
    document.onreadystatechange = function() {
        if (document.readyState !== "complete") {
            // Add the "loading" class to the body element to apply the blur filter
            document.querySelector("body").classList.add("loading");
            document.querySelector("#loader").style.visibility = "visible";
        } else {
            // Delay the execution of this code by 5 seconds (5000 milliseconds)
            setTimeout(function() {
                document.querySelector("#loader").style.display = "none";
                document.querySelector("body").classList.remove("loading");
                document.querySelector("#content-container").style.display = "block";
            }, 3000);
        }
    };
    await movieUtils.getFavorites()
    await movieUtils.movieCard()
    document.querySelector('#add-Movie').addEventListener('click', async function(){

        const title = document.querySelector('#title').value;
        const genre = document.querySelector('#genre').value;
        const rating = parseFloat(document.querySelector('#rating').value);
        let movieData = {
            title,
            genre,
            rating
        }
        let result = await movieUtils.setFavorite(movieData);
        console.log(result);
    });
    // document.onreadystatechange = function() {
    //     if (document.readyState !== "complete") {
    //         document.querySelector("body").style.visibility = "hidden";
    //         document.querySelector("#loader").style.visibility = "visible";
    //     } else {
    //         document.querySelector("#loader").style.display = "none";
    //         document.querySelector("body").style.visibility = "visible";
    //     }
    // };

    // // let body = {
    // //     "rating": 3
    // // }
    // // let response = await patchFavorite(4, body);
    // // await deleteFavorite(4);
    //
    // let favorites = await movieUtils.getFavorites();
    // console.log('All favorites => ', favorites);
    // let favorite = await movieUtils.getFavorite(2);
    // console.log('ONE favorite => ', favorite);
    // let searched = await movieUtils.searchFavorite({genre: 'Comedy'});
    // console.log('Searched favorite => ', searched);

})();