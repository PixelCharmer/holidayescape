import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Intros.scss";

/* Background uses the actual Room 4 image */
import bg from "../assets/backgrounds/room4_bg.png";

export default function Room4Intro() {
    const navigate = useNavigate();

    return (
        <section
            className="intro"
            style={{ backgroundImage: `url(${bg})` }}
            aria-label="Room 4 Intro"
        >
            <div className="scene">
                <h1 className="intro-title">The Wrapping Room</h1>
                <p className="intro-body">
                    Boxes whisper riddles beneath ribbons and bows. Pick the right present
                    and ring in a burst of cheer.
                </p>
                <button
                    className="intro-cta"
                    onClick={() => navigate("/room4")}
                    aria-label="Enter Room 4"
                >
                    Enter Room 4
                </button>
            </div>
        </section>
    );
}
