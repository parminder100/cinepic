import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "../ExploreAllDramaMovies/ExploreAllDramaMovies.css"
import sample_default_image from"../../asset/img/sample_default_image.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";

const ExploreAllDramaMovies = () =>{
    const [exploreAllDramaMoviesData, setExploreAllDramaMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const page = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getExploreAllDramaMovies = async() =>{
            try{
                const response = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18&page=${currentPage}`);
                console.log(response.data.results);
                setExploreAllDramaMoviesData(response.data.results);
            }
            catch(error){
                console.error('Error fetching explore all drama movies data', error);
            }
        }
        getExploreAllDramaMovies();
        // eslint-disable-next-line
    },[page]);

    const handlePageChange = (newPage) =>{
        setCurrentPage(newPage);
        navigate(`/dramaMovies/${newPage}`);
    }
    return(
        <>
            <Header />
            <section className="explore-all-drama-movies-section">
                <div className="container">
                    <div className="row">
                        {
                            exploreAllDramaMoviesData && exploreAllDramaMoviesData.map((movie)=>(
                                <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 mb-4 all-drama-movies-images-main-wrapper">
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className="all-drama-movies-images-wrapper">
                                            {
                                                movie.backdrop_path ? (
                                                    <img className="all-drama-movies-images" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                                        alt={movie.title}
                                                    />
                                                ):
                                                (
                                                    <img className="sample-explore-all-drama-movie-images" src={sample_default_image} alt="sample_default_image" />
                                                )
                                            }
                                            <div className="mobile-all-drama-movie-details d-block d-lg-none">
                                                <p className="movie-title">{movie.title}</p>
                                            </div>
                                            <div className="all-drama-movie-details d-none d-lg-block">
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
                            disabled={currentPage === exploreAllDramaMoviesData.total_pages}
                            >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExploreAllDramaMovies;