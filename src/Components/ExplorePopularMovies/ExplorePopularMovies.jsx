import { useState, useEffect } from "react";
import Header from "../Header/Header";
import "../ExplorePopularMovies/ExplorePopularMovies.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ExplorePopularMovies = () =>{
    const [allPopularMoviesData, setAllPopularMoviesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const { page } = useParams();
    
    
    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getAllPopularMovies = async() =>{
            try{
                const reponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`);
                const data = await reponse.json();
                setAllPopularMoviesData(data);
                console.log(data.total_pages);
                console.log(data);
            }
            catch(error){
                console.error('Error fetching all popular movies data:', error);
            }
        }

        // if (page && !isNaN(page)) {
        //     setCurrentPage(parseInt(page, 10));
        // } else {
        //     setCurrentPage(1);
        // }
        getAllPopularMovies();
    // eslint-disable-next-line
    },[page]);
    
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        navigate(`/popularmovies/${newPage}`)
    };
    return(
        <>
            <Header />
            <section className="explore-popular-movies-section">
                <div className="container">
                    <div className="row">
                        {
                            allPopularMoviesData.results && allPopularMoviesData.results.map((movie)=>(
                                <div key={movie.id} className="col-sm-2 mb-4 explore-all-popular-movies-main-wrapper">
                                    <Link key={movie.id} to={`/moviedetails/${movie.id}`}>
                                        <div className="explore-popular-movie-image">
                                            <img className="all-popular-movies-images" 
                                                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                                                alt={movie.title} 
                                            />
                                            <div className="mobile-explore-popular-movie-details-card d-block d-lg-none">
                                                <h2 className="explor-popular-movie-title">{movie.title}</h2>
                                            </div>
                                            <div className="explore-popular-movie-details-card d-none d-lg-block">
                                                <h2 className="explor-popular-movie-title">{movie.title}</h2>
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
                        <button className="navigation-btn" onClick={()=>handlePageChange(currentPage + 1)} disabled={currentPage === allPopularMoviesData.total_pages}>Next</button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ExplorePopularMovies;