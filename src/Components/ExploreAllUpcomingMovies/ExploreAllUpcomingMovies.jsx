import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import "../ExploreAllUpcomingMovies/ExploreAllUpcomingMovies.css";

const ExploreAllUpcomingMovies = () =>{
    const [exploreAllUpcomingMoviesData, setExploreAllUpcomingMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const Page = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getExploreAllUpcomingMovies = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${currentPage}`);
                const data = await response.json();
                setExploreAllUpcomingMoviesData(data);
                console.log(data);
            }
            catch(error){
                console.error('Error fetching explore all upcoming movies data:', error);
            }
        }
        getExploreAllUpcomingMovies();
        // eslint-disable-next-line
    },[Page]);

    const handlePageChange = (newPage) =>{
        setCurrentPage(newPage);
        navigate(`/upcomingMovies/${newPage}`);
    }
    return(
        <>
            <Header />
            <section className="explore-all-upcoming-movies-section">
                <div className="container">
                    <div className="row">
                        {
                            exploreAllUpcomingMoviesData.results && exploreAllUpcomingMoviesData.results.map((movie)=>(
                                <div key={movie.id} className="col-sm-2 mb-4 all-upcoming-movies-images-main-wrapper">
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className="all-upcoming-movies-images-wrapper">
                                            <img className="all-upcoming-movies-images" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                                                alt={movie.title} 
                                            />
                                            <div className="mobile-all-upcoming-movie-details d-block d-lg-none">
                                                <p className="movie-title">{movie.title}</p>
                                            </div>
                                            <div className="all-upcoming-movie-details d-none d-lg-block">
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
                            disabled={currentPage === 1}>
                                Previous
                        </button>
                        <span className="current-page-number">{currentPage}</span>
                        <button className="navigation-btn" 
                            onClick={()=>handlePageChange(currentPage + 1)}
                            disabled={currentPage === exploreAllUpcomingMoviesData.totale_pages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExploreAllUpcomingMovies;