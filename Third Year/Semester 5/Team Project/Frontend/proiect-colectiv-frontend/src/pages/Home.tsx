import HomeHeader from "../components/HomeHeader.tsx";
import {Link} from "react-router-dom";
import "../styles/Home.css";

export function Home() {
    return (
        <div className="home-container">
            <HomeHeader/>
            <main className="home-main">
                <div className="home-buttons">
                    <Link className={"home-button"} to={"/login"}>Login</Link>
                    <Link className={"home-button"} to={"/register"}>Register</Link>
                </div>
            </main>
        </div>
    );
}