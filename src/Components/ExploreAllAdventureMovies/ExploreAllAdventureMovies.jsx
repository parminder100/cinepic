import { useEffect } from "react";
import { useState } from "react";
import Header from "../Header/Header";
import "../ExploreAllAdventureMovies/ExploreAllAdventureMovies.css";
import { useNavigate, useParams, Link } from "react-router-dom";

const ExploreAllAdventureMovies = () =>{
    const [exploreAllAdventureMoviesData, setExploreAllAdventureMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const page = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getExploreAllAdventureMoviesData = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=12&page=${currentPage}`);
                const data = await response.json();
                console.log(data.results);
                setExploreAllAdventureMoviesData(data.results);
            }
            catch(error){
                console.error('Error fetching Explore all adventure movies data', error);
            }
        }
        getExploreAllAdventureMoviesData();
        // eslint-disable-next-line
    },[page]);

    const handlePageChange = (newPage) =>{
        setCurrentPage(newPage);
        navigate(`/adventureMovies/${newPage}`);
    }
    return(
        <>
            <Header />
            <section className="explore-all-adventure-movies-section">
                <div className="container">
                    <div className="row">
                        {
                            exploreAllAdventureMoviesData && exploreAllAdventureMoviesData.map((movie)=>(
                                <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 mb-4 all-adventure-movies-images-main-wrapper">
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className="all-adventure-movies-images-wrapper">
                                            <img className="all-adventure-movies-images" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                                alt={movie.title}
                                            />
                                            <div className="mobile-all-adventure-movie-details d-block d-lg-none">
                                                <p className="movie-title">{movie.title}</p>
                                            </div>
                                            <div className="all-adventure-movie-details d-none d-lg-block">
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
                            disabled={currentPage === exploreAllAdventureMoviesData.total_pages}
                            >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExploreAllAdventureMovies;