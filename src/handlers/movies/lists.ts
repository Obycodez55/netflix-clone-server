import { Request, Response } from "express-serve-static-core";
import prismadb from "../../lib/prismadb";
import { getMostLoved, getMostRecentlyAdded, getMostWatched, getMoviesByGenre } from "../../providers/listOperations";

const getLists = async (request: Request, response: Response) => {
    // Aggregate from movies :
    // 1. Most Recently Added from Movies
    // 2. Most Recently Added from Series
    // 3. Most Watched Movies
    // 4. Most Watched Series
    // 5. Most Loved Movies
    // 6. Most Loved Series
    // 7. Thriller
    // 8. Action
    // 9. Drama
    // 10. Tragedy
    // 11. Comedy
    // 12. SciFi
    // 13. History
    // 14. Horror
    // 15. Crime
    // 16. Romance
    // 17. Adventure
    // 18. Fantasy
    // 19. Animation
    // 20. Period_piece
    // 21. Biography
    // 22. Mystery
    // 23. Action Comedy
    // Return all these lists with appropriate titles

    // 1. Most Recently Added
    const recentlyAdded = await getMostRecentlyAdded();

    // 2. Most Recently Added from Movies
    const recentlyAddedMovies = await getMostRecentlyAdded(false);

    // 3. Most Recently Added from Series
    const recentlyAddedSeries = await getMostRecentlyAdded(true);

    // 4. Most Watched
    const mostWatched = await getMostWatched();

    // 5. Most Watched Movies
    const mostWatchedMovies = await getMostWatched(false);

    // 6. Most Watched Series
    const mostWatchedSeries = await getMostWatched(true);

    //  7. Most Loved
    const mostLoved = await getMostLoved();

    // 8 Most Loved Movies
    const mostLovedMovies = await getMostLoved(false);

    // 9 Most Loved Series
    const mostLovedSeries = await getMostLoved(true);
    
    // 10 Thriller
    const thriller = await getMoviesByGenre("Thriller");

    // 11 Action
    const action = await getMoviesByGenre("Action");

    // 12 Drama
    const drama = await getMoviesByGenre("Drama");

    // 13 Tragedy
    const tragedy = await getMoviesByGenre("Tragedy");
    
    // 14 Comedy
    const comedy = await getMoviesByGenre("Comedy");

    // 15 SciFi
    const scifi = await getMoviesByGenre("SciFi");

    // 16 History
    const history = await getMoviesByGenre("History");

    // 17 Horror
    const horror = await getMoviesByGenre("Horror");

    // 18 Crime
    const crime = await getMoviesByGenre("Crime");

    // 19 Romance
    const romance = await getMoviesByGenre("Romance");

    // 20 Adventure
    const adventure = await getMoviesByGenre("Adventure");

    // 21 Fantasy
    const fantasy = await getMoviesByGenre("Fantasy");

    // 22 Animation
    const animation = await getMoviesByGenre("Animation");

    // 23 Period_piece
    const period_piece = await getMoviesByGenre("Period_piece");

    // 24 Biography
    const biography = await getMoviesByGenre("Biography");

    // 26 Action Comedy
    const actionComedy = await getMoviesByGenre(["Action", "Comedy"]);

    // Combine the response into a single array and map them into another array with appropriate titles
    const lists = [
        { title: "Recently Added", list: recentlyAdded },
        { title: "Recently Added Movies", list: recentlyAddedMovies },
        { title: "Recently Added Series", list: recentlyAddedSeries },
        { title: "Most Watched", list: mostWatched },
        { title: "Most Watched Movies", list: mostWatchedMovies },
        { title: "Most Watched Series", list: mostWatchedSeries },
        { title: "Most Loved", list: mostLoved },
        { title: "Most Loved Movies", list: mostLovedMovies },
        { title: "Most Loved Series", list: mostLovedSeries },
        { title: "Thriller", list: thriller },
        { title: "Action", list: action },
        { title: "Drama", list: drama },
        { title: "Tragedy", list: tragedy },
        { title: "Comedy", list: comedy },
        { title: "SciFi", list: scifi },
        { title: "History", list: history },
        { title: "Horror", list: horror },
        { title: "Crime", list: crime },
        { title: "Romance", list: romance },
        { title: "Adventure", list: adventure },
        { title: "Fantasy", list: fantasy },
        { title: "Animation", list: animation },
        { title: "Period Piece", list: period_piece },
        { title: "Biography", list: biography },
        { title: "Action Comedy", list: actionComedy }
    ]

    response.status(200).send(lists);
}

export default getLists ;