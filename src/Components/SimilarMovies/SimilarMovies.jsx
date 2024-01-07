import { useEffect } from "react";
import { useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "../SimilarMovies/SimilarMovies.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SimilarMovies = ({movieId}) =>{
    const [similarMoviesData, setSimilarMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getSimilarMovies = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`);
                const data = await response.json();
                setSimilarMoviesData(data);
                console.log(data);
            }
            catch(error){
                console.error('Error fetching similar movie details:', error);
            }
        }
        getSimilarMovies();
        // eslint-disable-next-line
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

    const handleExploreAllSimilarMovies = (newPage, movieId) =>{
        setCurrentPage(newPage)
        navigate(`/similarmovies/${movieId}/${newPage}`);
    }
    return(
        <>
            <div className="similar-movies-section">
                <div className="popular-movies-section-heading text-container" onClick={()=>handleExploreAllSimilarMovies(currentPage, movieId)}>
                    Similar Movies
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
                <div className="similar-movie-list">
                    <OwlCarousel classID="owl-theme" {...options}>
                        {
                            similarMoviesData.results && similarMoviesData.results.map((movie)=>(
                                <div key={movie.id} className="item">
                                    <Link to={`/similarMovieDetails/${movie.id}`}>
                                        <img className="movie-poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                                    </Link>
                                </div>
                            ))
                        }
                    </OwlCarousel>
                </div>
            </div>
        </>
    )
}
export default SimilarMovies;