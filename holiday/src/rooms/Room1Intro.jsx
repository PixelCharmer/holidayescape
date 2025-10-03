import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Intros.scss";

/* Background uses the actual Room 1 image */
import bg from "../assets/backgrounds/room1_bg.png";

export default function Room1Intro() {
    const navigate = useNavigate();

    return (
        <section
            className="intro"
            style={{ backgroundImage: `url(${bg})` }}
            aria-label="Room 1 Intro"
        >
            <div className="scene">
                <h1 className="intro-title">The Cozy Living Room</h1>
                <p className="intro-body">
                    The tree twinkles, stockings sway, and a warm glow hums with hidden clues.
                    Restore the first spark of holiday joy to begin the rescue.
                </p>
                <button
                    className="intro-cta"
                    onClick={() => navigate("/room1")}
                    aria-label="Enter Room 1"
                >
                    Enter Room 1
                </button>
            </div>
        </section>
    );
}
