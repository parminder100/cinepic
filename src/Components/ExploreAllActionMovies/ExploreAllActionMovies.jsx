import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../ExploreAllActionMovies/ExploreAllActionMovies.css";
import Header from "../Header/Header";

const ExploreAllActionMovies = () =>{
    const [exploreAllActionMoviesData, setExploreAllActionMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const Page = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getExploreAllActionMovies = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&page=${currentPage}`);
                const data = await response.json();
                console.log(data);
                setExploreAllActionMoviesData(data);
            }
            catch(error){
                console.error('Error fetching Explore all movies details', error);
            }
        }
        getExploreAllActionMovies();
        // eslint-disable-next-line
    },[Page]);

    const handlePageChange = (newPage) =>{
        setCurrentPage(newPage);
        navigate(`/actionMovies/${newPage}`);
    }
    return(
        <>
            <Header />
            <section className="explore-all-action-movies-section">
                <div className="container">
                    <div className="row">
                        {
                            exploreAllActionMoviesData.results && exploreAllActionMoviesData.results.map((movie)=>(
                                <div key={movie.id} className="col-sm-2 mb-4 all-action-movies-images-main-wrapper">
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className="all-action-movies-images-wrapper">
                                            <img className="all-action-movies-images" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                                alt={movie.title}
                                            />
                                            <div className="mobile-all-action-movie-details d-block d-lg-none">
                                                <p className="movie-title">{movie.title}</p>
                                            </div>
                                            <div className="all-action-movie-details d-none d-lg-block">
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
                            disabled={currentPage === 1}
                            >
                            Previous
                        </button>
                        <span className="current-page-number">{currentPage}</span>
                        <button className="navigation-btn"
                            onClick={()=>handlePageChange(currentPage + 1)}
                            disabled={currentPage === exploreAllActionMoviesData.totale_pages}
                            >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExploreAllActionMovies;