import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Intros.scss";

/* Background uses the actual Room 5 image */
import bg from "../assets/backgrounds/room5_bg.png";

export default function Room5Intro() {
    const navigate = useNavigate();

    return (
        <section
            className="intro"
            style={{ backgroundImage: `url(${bg})` }}
            aria-label="Room 5 Intro"
        >
            <div className="scene">
                <h1 className="intro-title">The Grand Celebration Hall</h1>
                <p className="intro-body">
                    One last chorus to shatter the gloom. Unscramble the carol and let the
                    spirit burst free.
                </p>
                <button
                    className="intro-cta"
                    onClick={() => navigate("/room5")}
                    aria-label="Enter Room 5"
                >
                    Enter Room 5
                </button>
            </div>
        </section>
    );
}
