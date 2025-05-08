import { FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const HeroSection = () => {
    return (
        <div className="hero-section main">
            <div className="container grid grid-two-cols">
                <div className="hero-content">
                    <h1 className="heading-xl">
                        Explore the World, through books
                    </h1>
                    <p className="paragraph">
                        Discover a universe of stories, knowledge, and inspiration at your fingertips. Whether you're a lifelong reader or just beginning your literary journey, our curated collection offers something for everyone—bestsellers, hidden gems, timeless classics, and everything in between.
                    </p>
                    <button className="cst-btn">
                        <NavLink to="/open_search">
                            Start Exploring
                        </NavLink>
                    </button>
                </div>
                <div className="hero-image">
                    <img src="/images/library.jpg" alt="library" className="banner-image" />
                </div>
            </div>
        </div>
    )
};