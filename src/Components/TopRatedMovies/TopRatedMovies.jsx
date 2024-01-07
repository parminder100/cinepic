import { useState, useEffect } from "react";
import "../TopRatedMovies/TopRatedMovies.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import play_btn from "../../asset/img/play_btn.svg";
import plus_icon from "../../asset/img/plus_icon.svg";
import like_icon from "../../asset/img/like_icon.svg";
import volume_up_icon from "../../asset/img/volume_up_icon.svg";
import angle_down_icon from "../../asset/img/angle_down_icon.svg";
import { Link, useNavigate } from "react-router-dom";

const TopRatedMovies = () =>{
    const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getTopRatedMovies = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
                const data = await response.json();

                const movieWithDetails = await Promise.all(
                    data.results.map(async(movie)=>{
                        try{
                            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
                            const data = await response.json();
                            const genres = data.genres ? data.genres.map(genre => genre.name).join('. ') : 'Unknown Genre';
                            return{...movie, runtime: data.runtime, genres};
                        }
                        catch(error){
                            console.error('Error fetching movie details:', error);
                            return movie;
                        }
                    })
                )

                setTopRatedMoviesData(movieWithDetails);
                console.log(movieWithDetails);
            }
            catch(error){
                console.error('Error fetching top rated movies:', error);
            }
        }
        getTopRatedMovies();
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

    const handleTopRatedMovieCard = (e) =>{
        let currentTopRatedMovieCard = false;

        const topRatedMovieCard = document.querySelectorAll(".top-rated-poster");

        topRatedMovieCard.forEach(async(topRatedMovieImage)=>{
            if(topRatedMovieImage === e.currentTarget){
                currentTopRatedMovieCard = true;
                return;
            }
            if(!currentTopRatedMovieCard){
                topRatedMovieImage.classList.add('shiftLeft');
            }
            if(currentTopRatedMovieCard){
                topRatedMovieImage.classList.add('shiftRight');
            }
            topRatedMovieImage.classList.add('darker');
        });
    };

    const removeHandleTopRatedMovieCard = () =>{
        const topRatedMovieCard = document.querySelectorAll(".top-rated-poster");

        topRatedMovieCard.forEach((topRatedMovieImage)=>{
            topRatedMovieImage.classList.remove('shiftLeft');
            topRatedMovieImage.classList.remove('shiftRight');
            topRatedMovieImage.classList.remove('darker');
        });
    };

    const formatRuntime = (runtime) =>{
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    }

    const handlePageChange = (newPage) =>{
        setCurrentPage(newPage);
        navigate(`/topRatedMovies/${newPage}`);
    };
    return(
        <>
            <section className="top-rated-movies-section">
                <div className="top-rated-movies-heading-wrapper">
                    <div className="top-rated-movies-heading popular-movies-section-heading text-container" onClick={()=>handlePageChange(currentPage)}>
                        Top Rated Movies
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
                <div className="top-rated-movie-list">
                    <OwlCarousel classID="owl-theme" {...options}>
                        {
                            topRatedMoviesData && topRatedMoviesData.map((movie)=>(
                                <Link key={movie.id} to={`/moviedetails/${movie.id}`}>
                                    <div key={movie.id} 
                                        className="item top-rated-poster"
                                        onMouseEnter={handleTopRatedMovieCard}
                                        onMouseLeave = {removeHandleTopRatedMovieCard}
                                        >
                                        <img className="top-rated-movie-image" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
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
                                                        {movie.genres && movie.genres.split('.').map((genre, index) => (
                                                            <li key={`${movie.id}-${index}`}>
                                                                {genre}
                                                                {index < movie.genres.split('.').length - 1 && <span key={index} className="dot"></span>}
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
export default TopRatedMovies;