import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../ExploreAllTopRatedMovies/ExploreAllTopRatedMovies.css";
import Header from "../Header/Header";

const ExploreAllTopRatedMovies = () =>{
    const [allTopRatedMoviesData, setAllTopRatedMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const {page} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getAllTopRatedMoviesData = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${currentPage}`);
                const data = await response.json();
                setAllTopRatedMoviesData(data);
                console.log(data);
            }
            catch(error){
                console.log('Error fetching all top rated movies data:', error);
            }
        };
        getAllTopRatedMoviesData();
        // eslint-disable-next-line
    },[page]);

    const handlePageChange = (newPage) =>{
        setCurrentPage(newPage);
        navigate(`/topRatedMovies/${newPage}`);
    }
    return(
        <>
            <Header />
            <section className="explore-all-top-rated-movies-section">
                <div className="container">
                    <div className="row">
                        {
                            allTopRatedMoviesData.results && allTopRatedMoviesData.results.map((movie)=>(
                                <div key={movie.id} className="col-sm-2 mb-4 all-top-rated-movies-images-main-wrapper">
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className="all-top-rated-movies-images-wrapper">
                                            <img className="all-top-rated-movies-images" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                            alt={movie.title}
                                            />
                                            <div className="mobile-all-top-rated-movie-details d-block d-lg-none">
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
                        <button className="navigation-btn" onClick={()=>handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <span className="current-page-number">{currentPage}</span>
                        <button className="navigation-btn" onClick={()=>handlePageChange(currentPage + 1)} disabled={currentPage === allTopRatedMoviesData.total_pages}>Next</button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExploreAllTopRatedMovies;