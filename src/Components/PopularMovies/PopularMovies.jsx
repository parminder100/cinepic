import { useEffect } from "react";
import { useState } from "react";
import "../PopularMovies/PopularMovies.css";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import play_btn from "../../asset/img/play_btn.svg";
import plus_icon from "../../asset/img/plus_icon.svg";
import like_icon from "../../asset/img/like_icon.svg";
import volume_up_icon from "../../asset/img/volume_up_icon.svg";
import angle_down_icon from "../../asset/img/angle_down_icon.svg";
import { Link, useNavigate } from "react-router-dom";

const PopularMovies = () =>{
    const [popularMovies, setPopularMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getPopularMovies = async() =>{
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
            const data = await response.json();

            const moviesWithDetails = await Promise.all(
                data.results.map(async(movie)=>{
                    try{
                        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
                        const data = await response.json();

                        // Fetch genre names based on genre ID
                        const genres = data.genres ? data.genres.map(genre => genre.name).join('. ') : 'Unknown Genre';

                        return {...movie, runtime: data.runtime, genres};
                    }
                    catch(error){
                        console.error('Error fetching movie details:', error);
                        return movie;
                    }
                })
            )
            setPopularMovies(moviesWithDetails);
            console.log(moviesWithDetails);
        }
        getPopularMovies();
    },[]);

    // const settings = {
    //     speed: 500,
    //     slidesToShow: 5,
    //     infinite: false,
    //     responsive: [
    //         {
    //           breakpoint: 1024,
    //           settings: {
    //             slidesToShow: 1,
    //             infinite: false,
    //             dots: false
    //           }
    //         },
    //         {
    //           breakpoint: 600,
    //           settings: {
    //             slidesToShow: 1,
    //           }
    //         },
    //         {
    //           breakpoint: 480,
    //           settings: {
    //             slidesToShow: 1,
    //             infinite:false,
    //           }
    //         }
    //     ]
    // }

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
    }

    const handlePopularMovieCard = (e) =>{

        let currentPopularMovieCard = false;

        const popularMovieCard = document.querySelectorAll(".movieimage");

        popularMovieCard.forEach(async(movieimage)=>{
            if(movieimage === e.currentTarget){
                currentPopularMovieCard = true;
                return;
            }

            if(!currentPopularMovieCard){
                movieimage.classList.add('shiftLeft');
            }

            if(currentPopularMovieCard){
                movieimage.classList.add('shiftRight');
            }

            movieimage.classList.add('darker');
        });
    };

    const removeHandlePopularMovieCard = () =>{

        const popularMovieCard = document.querySelectorAll(".movieimage");

        popularMovieCard.forEach((movieimage)=>{
            movieimage.classList.remove('shiftLeft');
            movieimage.classList.remove('shiftRight');
            movieimage.classList.remove('darker');
        });
    };

    const formatRuntime = (runtime) =>{
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    }

    // const handlePopularMovieDetails = (movie) =>{
    //     console.log('Clicked movie:', movie);
    //     navigate(`moviedetails/${movie.id}`);
    // }

    const handleExploreAllPopularMovies = (newPage) =>{
        setCurrentPage(newPage);
        navigate(`/popularmovies/${newPage}`);
    }
    return(
        <>
            <section className="popular-movie-section">
                <div className="popular-movies-section-container">
                    <div className="popular-movies-section-heading text-container" onClick={()=>handleExploreAllPopularMovies(currentPage)}>
                        Popular Movies
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
                <div className="popular-movie-list">
                    {/* <Slider {...settings}>
                        {
                            popularMovies.map((movie)=>(
                                <img className="movieimage" 
                                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                                    alt={movie.title}
                                    onMouseOver = {handlePopularMovieCard}
                                    onMouseOut = {removeHandlePopularMovieCard} 
                                />
                            ))
                        }
                    </Slider> */}
                    <OwlCarousel className="owl-theme" {...options}>
                        {
                            popularMovies.map((movie)=>(
                                <Link key={movie.id} to={`/moviedetails/${movie.id}`}>
                                    <div
                                        key={movie.id} 
                                        className="item movieimage" 
                                        onMouseOver = {(e)=>handlePopularMovieCard(e, movie)}
                                        onMouseOut = {removeHandlePopularMovieCard}
                                        // onClick = {()=>handlePopularMovieDetails(movie)}
                                        >
                                        <img
                                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                                            alt={movie.title}
                                        />
                                        {/* For mobile and tablet Start */}
                                        <div className="mobile-movie-title-wrapper d-block d-lg-none">
                                            <h2 className="mobile-movie-title">{movie.title}</h2>
                                        </div>
                                        {/* For mobile and tablet End */}
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
                                                        {/* <button className="play-btn">
                                                            <svg class="play-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PlayCircleIcon">
                                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5-7 4.5z"></path>
                                                            </svg>
                                                        </button>
                                                        <button className="plus-btn">
                                                            <svg class="plus-icon">
                                                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                            </svg>
                                                        </button>
                                                        <button className="plus-btn">
                                                            <svg class="plus-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ThumbUpOffAltIcon">
                                                                <path d="m13.11 5.72-.57 2.89c-.12.59.04 1.2.42 1.66.38.46.94.73 1.54.73H20v1.08L17.43 18H9.34c-.18 0-.34-.16-.34-.34V9.82l4.11-4.1M14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.83C7 18.95 8.05 20 9.34 20h8.1c.71 0 1.36-.37 1.72-.97l2.67-6.15c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2zM4 9H2v11h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1z"></path>
                                                            </svg>
                                                        </button> */}
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
                                                    <p className="movie-runtime">{formatRuntime(movie.runtime)} min</p>
                                                    <p className="movie-quality">HD</p>
                                                </div>
                                                <div className="movie-genres">
                                                    <ul>
                                                        {movie.genres.split('.').map((genre, index) => (
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
export default PopularMovies;