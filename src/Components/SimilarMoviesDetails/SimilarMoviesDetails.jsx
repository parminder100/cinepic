import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import "../PopularMoviesDetails/PopularMoviesDetails.css";
import language_icon from "../../asset/img/language_icon.svg";
import timer_icon from "../../asset/img/timer_icon.svg";
import trailer_btn_play_icon from "../../asset/img/trailer_btn_play_icon.svg";
import MoviesTrailer from "../MoviesTrailer/MoviesTrailer";
import SimilarMovies from "../SimilarMovies/SimilarMovies";

const SimilarMoviesDetails = () =>{
    const {id} = useParams();
    const [popularMovieDetails, setPopularMovieDetails] = useState(null);
    const [trailerModalOpen, setTrailerModalOpen] = useState(false);

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getSimilarMoviesDetails = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
                const data = await response.json();
                setPopularMovieDetails(data);
                console.log(data);
            }
            catch(error){
                console.error('Error fetching movie details:', error);
            }
        };
        getSimilarMoviesDetails();
    },[id]);

    const movieBackgroundImage = {
        backgroundImage: `linear-gradient(rgba(16, 22, 36, 0.22) 0%, rgba(9, 12, 20, 0.9) 30.82%, rgb(14, 19, 32) 71.12%, rgb(17, 24, 39) 100%), url(https://image.tmdb.org/t/p/original/${popularMovieDetails?.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% top',
        minHeight: '100vh'
    }

    const formateRuntime = (runtime) =>{
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    }

    const toggleTrailerModal = () =>{
        setTrailerModalOpen(!trailerModalOpen);
    }
    return(
        <>
            <Header />
            {
                popularMovieDetails && (
                    <section className="movie-details-section" style={movieBackgroundImage}>
                        <div className="movie-details-content mx-auto">
                            <img className="movie-poster" src={`https://image.tmdb.org/t/p/original/${popularMovieDetails?.poster_path}`} alt={popularMovieDetails.title}/>
                            <div className="popular-movie-right-col">
                                <h2 className="popular-movie-title">{popularMovieDetails.title}</h2>
                                <ul className="popular-movie-type">
                                    {
                                        popularMovieDetails.genres && popularMovieDetails.genres.map((genre, index)=>(
                                            <li key={genre.id}>
                                                {genre.name}
                                                {index < popularMovieDetails.genres.length - 1 && <span className="dot"></span>}
                                            </li>
                                        ))
                                    }
                                </ul>
                                <div className="movie-spoken-language-wrapper">
                                    <div className="movie-spoken-language">
                                        <img className="language-icon" src={language_icon} alt="language_icon" />
                                        <ul className="movie-spoken-language-list">
                                            {
                                                popularMovieDetails.spoken_languages && popularMovieDetails.spoken_languages.map((language, index)=>(
                                                    <li key={index}>
                                                        {language.english_name}
                                                        {index < popularMovieDetails.spoken_languages.length - 1 && <span className="dot"></span>}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="popular-movie-runtime-wrapper">
                                        <img className="timer-icon" src={timer_icon} alt="timer_icon" />
                                        <p className="popular-movie-runtime">{formateRuntime(popularMovieDetails.runtime)}</p>
                                    </div>
                                </div>
                                <p className="popular-movie-overview">{popularMovieDetails.overview}</p>
                                <button onClick={toggleTrailerModal} className="watch-trailer-btn">
                                    <img className="trailer-btn-play-icon" src={trailer_btn_play_icon} alt="trailer_btn_play_icon" />
                                    Watch Trailer
                                </button>
                                {
                                    trailerModalOpen && (
                                        <MoviesTrailer
                                            onClose = {toggleTrailerModal}
                                            movieTitle = {popularMovieDetails.title}
                                            movieId = {id}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </section>
                )
            }
            <section>
                <SimilarMovies movieId = {id} />
            </section>
        </>
    );
};
export default SimilarMoviesDetails;