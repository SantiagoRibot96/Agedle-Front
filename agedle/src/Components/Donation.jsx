import { FaHeart } from "react-icons/fa";

export default function Donation() {
    return (
    <div className="donations-card text-center my-3">
        <p>Enjoying the game? Support us!</p>
        <a
        href="https://buymeacoffee.com/agedle"
        target="_blank"
        rel="noopener noreferrer"
        className="donate-button"
        >
        <FaHeart className="heart-icon" /> Donate Now
        </a>
    </div>
    );
}
