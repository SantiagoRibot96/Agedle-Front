import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark mb-5">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={"/iconBCK.png"} className="m-2 logo" alt="Logo"/>
                </Link>
            </div>
            <div className="col-2 container-fluid">
                <Link className="navbar-brand" to="/game/civ">
                    Civ Guess
                </Link>
            </div>
            <div className="col-2 container-fluid">
                <Link className="navbar-brand" to="/game/unit">
                    Unit Guess
                </Link>
            </div>
            <div className="col-1 container-fluid">
                <Link className="navbar-brand" to="/about">
                    About
                </Link>
            </div>
        </nav>
    );
}