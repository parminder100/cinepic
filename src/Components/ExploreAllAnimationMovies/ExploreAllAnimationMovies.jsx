import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import "../ExploreAllAnimationMovies/ExploreAllAnimationMovies.css";

const ExploreAllAnimationMovies = () =>{
    const [exploreAllAnimationMoviesData, setExploreAllAnimationMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const page = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getExploreAllAnimationMoviesData = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&page=${currentPage}`);
                const data = await response.json();
                console.log(data.results);
                setExploreAllAnimationMoviesData(data.results);
            }
            catch(error){
                console.error('Error fetching Explore all animation movies data', error);
            }
        }
        getExploreAllAnimationMoviesData();
        // eslint-disable-next-line
    },[page]);

    const handelPageChange = (newPage) =>{
        setCurrentPage(newPage);
        navigate(`/animationMovies/${newPage}`);
    }
    return(
        <>
            <Header />
            <section className="explore-all-animation-movies-section">
                <div className="container">
                    <div className="row">
                        {
                            exploreAllAnimationMoviesData && exploreAllAnimationMoviesData.map((movie)=>(
                                <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 mb-4 all-animation-movies-images-main-wrapper">
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className="all-animation-movies-images-wrapper">
                                            <img className="all-animation-movies-images" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                                alt={movie.title}
                                            />
                                            <div className="mobile-all-animation-movie-details d-block d-lg-none">
                                                <p className="movie-title">{movie.title}</p>
                                            </div>
                                            <div className="all-animation-movie-details d-none d-lg-block">
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
                            onClick={()=>handelPageChange(currentPage - 1)}
                            disabled = {currentPage === 1}
                            >
                            Previous
                        </button>
                        <span className="current-page-number">{currentPage}</span>
                        <button className="navigation-btn"
                            onClick={()=>handelPageChange(currentPage + 1)}
                            disabled = {currentPage === exploreAllAnimationMoviesData.total_pages}
                            >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExploreAllAnimationMovies;