import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../ExploreAllNowPlayingMovies/ExploreAllNowPlayingMovies.css";
import Header from "../Header/Header";

const ExploreAllNowPlayingMovies = () =>{
    const [exploreAllNowPlayingMoviesData, setExploreAllNowPlayingMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const {page} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getExploreAllNowPlayingMovies = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${currentPage}`);
                const data = await response.json();
                setExploreAllNowPlayingMoviesData(data);
                console.log(data);
            }
            catch(error){
                console.error('Error fetchind explore all now playing movie data:', error);
            }
        }
        getExploreAllNowPlayingMovies();
        // eslint-disable-next-line
    },[page]);

    const handlePageChange = (newPage) =>{
        setCurrentPage(newPage);
        navigate(`/nowPlayingMovies/${newPage}`);
    }
    return(
        <>
            <Header />
            <section className="explore-all-now-playing-movies-section">
                <div className="container">
                    <div className="row">
                        {
                            exploreAllNowPlayingMoviesData.results && exploreAllNowPlayingMoviesData.results.map((movie)=>(
                                <div key={movie.id} className="col-sm-2 explore-all-now-playing-card">
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className="explore-all-now-playing-movies-images-wrapper">
                                            <img className="explore-all-now-playing-movie-image" 
                                                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                                                alt={movie.title} 
                                            />
                                            <div className="mobile-all-now-playing-movie-details d-block d-lg-none">
                                                <p className="movie-title">{movie.title}</p>
                                            </div>
                                            <div className="all-top-rated-movie-details d-none d-lg-block">
                                                <p className="movie-title">{movie.title}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="pagination">
                        <button className="navigation-btn" 
                            onClick={()=>handlePageChange(currentPage - 1)}
                            disabled = {currentPage === 1}
                            >
                            Previous
                        </button>
                        <span className="current-page-number">{currentPage}</span>
                        <button className="navigation-btn"
                            onClick={()=>handlePageChange(currentPage + 1)}
                            disabled={currentPage === exploreAllNowPlayingMoviesData.total_pages}
                            >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExploreAllNowPlayingMovies;