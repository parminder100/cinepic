import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import "../ExploreAllSimilarMovies/ExploreAllSimilarMovies.css";
import { Link } from "react-router-dom";

const ExploreAllSimilarMovies = () =>{
    const [exploreAllSimilarMovies, setExploreAllSimilarMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const { id, page } = useParams();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getExploreAllSimilarMovies = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&page=${currentPage}`);
                const data = await response.json();
                setExploreAllSimilarMovies(data);
                console.log(data);
            }
            catch(error){
                console.error('Error fetching explore all similar movies:', error);
            }
        }
        getExploreAllSimilarMovies();
        // eslint-disable-next-line
    },[id, page]);

    const handlePageChange = (newPage,id) =>{
        setCurrentPage(newPage);
        navigate(`/similarmovies/${id}/${newPage}`);
    }
    return(
        <>
            <Header />
            <section className="explore-all-similar-movies-section">
                <div className="container">
                    <div className="row">
                        {
                            exploreAllSimilarMovies.results && exploreAllSimilarMovies.results.map((movie)=>(
                                <div key={movie.id} className="col-sm-2 mb-4 explore-all-similar-movies-main-wrapper">
                                    <Link to={`/similarMovieDetails/${movie.id}`}>
                                        <img className="explore-all-similar-movies-poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                                        <div className="mobile-all-similar-movie-details d-block d-lg-none">
                                            <p className="movie-title">{movie.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="pagination">
                        <button className="navigation-btn" onClick={()=>handlePageChange(currentPage - 1, id)} disabled={currentPage === 1}>Previous</button>
                        <span className="current-page-number">{currentPage}</span>
                        <button className="navigation-btn" onClick={()=>handlePageChange(currentPage + 1, id)} disabled={currentPage === exploreAllSimilarMovies.total_pages}>Next</button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExploreAllSimilarMovies;