import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import "../ExploreAllComedyMovies/ExploreAllComedyMovies.css";

const ExploreAllComedyMovies = () =>{
    const [exploreAllComedyMoviesData, setExploreAllComedyMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const page = useParams();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getExploerAllComedyMoviesData = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&page=${currentPage}`);
                const data = await response.json();
                console.log(data.results);
                setExploreAllComedyMoviesData(data.results);
            }
            catch(error){
                console.error('Error fetching explore all comedy movies data', error);
            }
        }
        getExploerAllComedyMoviesData();
        // eslint-disable-next-line
    },[page]);

    const handlePageChange = (newPage) =>{
        setCurrentPage(newPage);
        navigate(`/comedyMovies/${newPage}`);
    }
    return(
        <>
            <Header />
            <section className="explore-all-comedy-movies-section">
                <div className="container">
                    <div className="row">
                        {
                            exploreAllComedyMoviesData && exploreAllComedyMoviesData.map((movie)=>(
                                <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 mb-4 all-comedy-movies-images-main-wrapper">
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className="all-comedy-movies-images-wrapper">
                                            <img className="all-comedy-movies-images" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                                alt={movie.title}
                                            />
                                            <div className="mobile-all-comedy-movie-details d-block d-lg-none">
                                                <p className="movie-title">{movie.title}</p>
                                            </div>
                                            <div className="all-comedy-movie-details d-none d-lg-block">
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
                            disabled={currentPage === exploreAllComedyMoviesData.total_pages}
                            >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExploreAllComedyMovies;