import { useEffect, useState } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "../Banner/Banner.css";
import play_buttton from "../../asset/img/play_buttton.png";
import Header from "../Header/Header";
import PopularMovies from "../PopularMovies/PopularMovies";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import NowPlayingMovies from "../NowPlayingMovies/NowPlayingMovies";
import UpcomingMovies from "../UpcomingMovies/UpcomingMovies";
import ActionMovies from "../ActionMovies/ActionMovies";
import AdventureMovies from "../AdventureMovies/AdventureMovies";
import AnimationMovies from "../AnimationMovies/AnimationMovies";
import ComedyMovies from "../ComedyMovies/ComedyMovies";
import CrimeMovies from "../CrimeMovies/CrimeMovies";
import DocumentaryMovies from "../DocumentaryMovies/DocumentaryMovies";
import DramaMovies from "../DramaMovies/DramaMovies";

const Banner = () =>{
    const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) {
        console.error('API key is missing. Please check your environment variables.');
        return;
    }

    const fetchMoviesInTheaters = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
          const data = await response.json();
          setMovieData(data.results);
          console.log(data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    fetchMoviesInTheaters();
  }, []);

    const options = {
        items: 1,
        loop: true,
        // autoplay: true,
        // margin: 10,
        dots: false
    }

    const filterMovieData = movieData.slice(0,4);
    return(
        <>
            <Header />
            <section>
                <OwlCarousel className="owl-theme banner-container" {...options}>
                    {
                        filterMovieData.map((movie)=>(
                            <div className="item" key={movie.id}>
                                <div className="owl-text-overlay">
                                    <h2 className="movie-name">{movie.title}</h2>
                                    <p className="movie-description">{movie.overview}</p>
                                    <button className="movie-play-button">
                                        <span className="movie-play-icon-wrapper">
                                            <img className="movie-play-icon" src={play_buttton} alt="play_buttton" />
                                        </span>
                                        Play
                                    </button>
                                </div>
                                <div className="overlay">
                                </div>
                                <img className="movie-backdrop-image" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
                            </div>
                        ))
                    }
                </OwlCarousel>
            </section>
            <PopularMovies />
            <TopRatedMovies />
            <NowPlayingMovies />
            <UpcomingMovies />
            <ActionMovies />
            <AdventureMovies />
            <AnimationMovies />
            <ComedyMovies />
            <CrimeMovies />
            <DocumentaryMovies />
            <DramaMovies />
        </>
    )
}
export default Banner;