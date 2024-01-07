import { useEffect } from "react";
import { useState } from "react";
import "../MoviesTrailer/MoviesTrailer.css";
import movie_trailer_close_btn from "../../asset/img/movie_trailer_close_btn.svg";

const MoviesTrailer = ({onClose, movieTitle, movieId}) =>{
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(()=>{
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            console.error('API key is missing. Please check your environment variables.');
            return;
        }
        const getTrailer = async() =>{
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
                const data = await response.json();
                if(data.results && data.results.length > 0){
                    setTrailerKey(data.results[0].key);
                }
            }
            catch(error){
                console.error('Error fetching trailer:', error);
            }
        };
        getTrailer();
    },[movieId]);

    const youtubeUrl = `https://www.youtube.com/embed/${trailerKey}`;

    const handleClickOutside = (e) => {
        if (
          e.target.closest(".popup-content") === null &&
          e.target.closest(".popup-container") !== null
        ) {
          onClose();
        }
    };
    
    useEffect(() => {
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    // eslint-disable-next-line
    }, [onClose]);
    return(
        <>
            <div className="popup-container">
                <div className="popup-content">
                    <div className="close-button" onClick={onClose}>
                        <img className="movie-trailer-close-btn" src={movie_trailer_close_btn} alt="movie_trailer_close_btn" />
                    </div>
                    <div className="video-container">
                        {/* {trailerKey && ( */}
                            <iframe
                                width="560"
                                height="315"
                                src={youtubeUrl}
                                title={`${movieTitle} Trailer`}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        {/* )  */}
                        {/* } */}
                    </div>
                </div>
            </div>
            {/* <div className="trailer-modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>
                        &times;
                    </span>
                    <h2>{movieTitle} Trailer</h2>
                    {trailerKey ? (
                        <iframe
                            width="560"
                            height="315"
                            src={youtubeUrl}
                            title={`${movieTitle} Trailer`}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p>No trailer available</p>
                    )}
                </div>
            </div> */}
        </>
    )
}
export default MoviesTrailer;