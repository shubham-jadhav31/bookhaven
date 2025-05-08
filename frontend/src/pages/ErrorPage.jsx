import { NavLink, useRouteError } from "react-router-dom";
import { Headers } from "./../components/UI/Header";
import { Footers } from "./../components/UI/Footer";

export const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <>
            <Headers />
            <div className="error-page">
                <h1 className="error-title">Oops! Something went wrong.</h1>
                <p className="error-message">{error.data || "An unexpected error has occurred."}</p>
                <NavLink to="/">
                    <button className="error-btn">Go Back Home</button>
                </NavLink>
            </div>
            <Footers />
        </>
    );
};
