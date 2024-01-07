import { useEffect } from "react";
import { useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import play_btn from "../../asset/img/play_btn.svg";
import plus_icon from "../../asset/img/plus_icon.svg";
import like_icon from "../../asset/img/like_icon.svg";
import volume_up_icon from "../../asset/img/volume_up_icon.svg";
import angle_down_icon from "../../asset/img/angle_down_icon.svg";
import "../UpcomingMovies/UpcomingMovies.css";
import { Link, useNavigate } from "react-router-dom";

const UpcomingMovies = () =>{
    const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getUpcomingMovies = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
                const data = await response.json();

                const movieWithDetails = await Promise.all(
                    data.results.map(async(movie)=>{
                        try{
                            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
                            const data = await response.json();
                            const genres = data.genres ? data.genres.map((genre)=>genre.name) : 'Unknown Genre';
                            return {...movie, runtime: data.runtime, genres}
                        }
                        catch(error){
                            console.error('Error fetching movie details:', error);
                        }
                    })
                )
                setUpcomingMoviesData(movieWithDetails);
                console.log(movieWithDetails);
            }
            catch(error){
                console.error('Error fetching upcoming movies details:', error);
            }
        }
        getUpcomingMovies();
    },[]);

    const options = {
        items: 5,
        // loop: true,
        // autoplay: true,
        margin: 16,
        nav: true,
        dots: false,
        responsiveClass:true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>',
        ],
        responsive:{
            0:{
                items:1,
                // nav:true
            },
            768:{
                items:2,
                // nav:false
            },
            992:{
                items:3,
            },
            1199:{
                items: 5
            }
        }
    };

    const formatRuntime = (runtime) =>{
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    };

    const handleUpcomingMoviesCard = (e) =>{
        let currentUpcomingMoviesCard = false;

        const upcomingMovieCard = document.querySelectorAll(".upcoming-movie-poster");
        upcomingMovieCard.forEach((movieCard)=>{
            if(movieCard === e.currentTarget){
                currentUpcomingMoviesCard = true;
                return;
            }
            if(!currentUpcomingMoviesCard){
                movieCard.classList.add("shiftLeft");
            }
            if(currentUpcomingMoviesCard){
                movieCard.classList.add("shiftRight");
            }
            movieCard.classList.add('darker');
        })
    };

    const removeHandleUpcomingMoviesCard = () =>{
        const upcomingMovieCard = document.querySelectorAll(".upcoming-movie-poster");

        upcomingMovieCard.forEach((moviCard)=>{
            moviCard.classList.remove('shiftLeft');
            moviCard.classList.remove('shiftRight');
            moviCard.classList.remove('darker');
        })
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        navigate(`/upcomingMovies/${newPage}`);
    }
    return(
        <>
            <section className="upcoming-movies-section">
                <div className="top-rated-movies-heading-wrapper">
                    <div className="top-rated-movies-heading popular-movies-section-heading text-container" onClick={()=>handlePageChange(currentPage)}>
                        Upcoming Movies
                        <div className="popular-explore-all">
                            <span className="hidden-text">E</span>
                            <span className="hidden-text">x</span>
                            <span className="hidden-text">p</span>
                            <span className="hidden-text">l</span>
                            <span className="hidden-text">o</span>
                            <span className="hidden-text">r</span>
                            <span className="hidden-text">e</span>
                            <span className="hidden-text"></span>
                            <span className="hidden-text">A</span>
                            <span className="hidden-text">l</span>
                            <span className="hidden-text">l</span>
                        </div>
                    </div>
                </div>
                <div className="upcoming-movie-list">
                    <OwlCarousel className="owl-theme" {...options}>
                        {
                            upcomingMoviesData && upcomingMoviesData.map((movie)=>(
                                <Link key={movie.id} to={`/moviedetails/${movie.id}`}>
                                    <div key={movie.id} 
                                        className="item upcoming-movie-poster"
                                        onMouseEnter={handleUpcomingMoviesCard}
                                        onMouseLeave={removeHandleUpcomingMoviesCard}
                                        >
                                        <img className="upcoming-movie-images" 
                                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                                            alt={movie.title} 
                                        />
                                        <div className="mobile-movie-title-wrapper d-block d-lg-none">
                                            <h2 className="mobile-movie-title">{movie.title}</h2>
                                        </div>
                                        <div className="movie-details-top-card d-none d-lg-flex">
                                            <h2 className="movie-title">{movie.title}</h2>
                                            <button className="volumn-up-btn">
                                                <img className="volumn-up-icon" src={volume_up_icon} alt="volumn-up-icon" />
                                            </button>
                                        </div>
                                        <div className="d-none d-lg-block">
                                            <div className="movie-details-bottom-card">
                                                <div className="video-controls-container">
                                                    <div className="video-controls">
                                                        <button className="play-btn">
                                                            <img className="play-icon" src={play_btn} alt="play-btn" />
                                                        </button>
                                                        <button className="plus-btn">
                                                            <img className="plus-icon" src={plus_icon} alt="plus-icon" />
                                                        </button>
                                                        <button className="like-btn">
                                                            <img className="like-icon" src={like_icon} alt="like-icon" />
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button className="angle-down-btn">
                                                            <img className="angle-down-icon" src={angle_down_icon} alt="angle-down-icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="movie-additional-details">
                                                    <p className="movie-percentage-match">{(movie.vote_average * 10).toFixed()}% Match</p>
                                                    <p className="movie-runtime">{!isNaN(movie.runtime) && formatRuntime(movie.runtime)}</p>
                                                    <p className="movie-quality">HD</p>
                                                </div>
                                                <div className="movie-genres">
                                                    <ul>
                                                        {movie.genres && movie.genres.map((genre, index) => (
                                                            <li key={`${movie.id}-${index}`}>
                                                                {genre}
                                                                {index < movie.genres.length - 1 && <span key={index} className="dot"></span>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </OwlCarousel>
                </div>
            </section>
        </>
    )
}
export default UpcomingMovies;