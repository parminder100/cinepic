import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExploreAllActionMovies from "../ExploreAllActionMovies/ExploreAllActionMovies";
import ExploreAllAdventureMovies from "../ExploreAllAdventureMovies/ExploreAllAdventureMovies";
import ExploreAllAnimationMovies from "../ExploreAllAnimationMovies/ExploreAllAnimationMovies";
import ExploreAllComedyMovies from "../ExploreAllComedyMovies/ExploreAllComedyMovies";
import ExploreAllCrimeMovies from "../ExploreAllCrimeMovies/ExploreAllCrimeMovies";
import ExploreAllDocumentaryMovies from "../ExploreAllDocumentaryMovies/ExploreAllDocumentaryMovies";
import ExploreAllDramaMovies from "../ExploreAllDramaMovies/ExploreAllDramaMovies";
import ExploreAllNowPlayingMovies from "../ExploreAllNowPlayingMovies/ExploreAllNowPlayingMovies";
import ExploreAllSimilarMovies from "../ExploreAllSimilarMovies/ExploreAllSimilarMovies";
import ExploreAllTopRatedMovies from "../ExploreAllTopRatedMovies/ExploreAllTopRatedMovies";
import ExploreAllUpcomingMovies from "../ExploreAllUpcomingMovies/ExploreAllUpcomingMovies";
import ExplorePopularMovies from "../ExplorePopularMovies/ExplorePopularMovies";
import Home from "../Home/Home";
import PopularMoviesDetails from "../PopularMoviesDetails/PopularMoviesDetails";
import SimilarMoviesDetails from "../SimilarMoviesDetails/SimilarMoviesDetails";

const Pages = () =>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/moviedetails/:id" element={<PopularMoviesDetails />} />
                    <Route path="/similarMovieDetails/:id" element={<SimilarMoviesDetails />} />
                    <Route path="/popularmovies/:page" element={<ExplorePopularMovies />} />
                    <Route path="similarmovies/:id/:page" element={<ExploreAllSimilarMovies />} />
                    <Route path="/topRatedMovies/:page" element={<ExploreAllTopRatedMovies />} />
                    <Route path="/nowPlayingMovies/:page" element={<ExploreAllNowPlayingMovies />} />
                    <Route path="/upcomingMovies/:page" element={<ExploreAllUpcomingMovies />} />
                    <Route path="/actionMovies/:page" element={<ExploreAllActionMovies />} />
                    <Route path="/adventureMovies/:page" element={<ExploreAllAdventureMovies />} />
                    <Route path="/animationMovies/:page" element={<ExploreAllAnimationMovies />} />
                    <Route path="/comedyMovies/:page" element={<ExploreAllComedyMovies />} />
                    <Route path="/crimeMovies/:page" element={<ExploreAllCrimeMovies />} />
                    <Route path="/documentaryMovies/:page" element={<ExploreAllDocumentaryMovies />} />
                    <Route path="/dramaMovies/:page" element={<ExploreAllDramaMovies />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Pages;