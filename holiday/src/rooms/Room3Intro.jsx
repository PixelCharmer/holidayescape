import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Intros.scss";

/* Background uses the actual Room 3 image */
import bg from "../assets/backgrounds/room3_bg.png";

export default function Room3Intro() {
    const navigate = useNavigate();

    return (
        <section
            className="intro"
            style={{ backgroundImage: `url(${bg})` }}
            aria-label="Room 3 Intro"
        >
            <div className="scene">
                <h1 className="intro-title">The Snowy Yard</h1>
                <p className="intro-body">
                    Caroling lights blink with meaning. Follow their rhythm to spell out a
                    message and brighten the winter night.
                </p>
                <button
                    className="intro-cta"
                    onClick={() => navigate("/room3")}
                    aria-label="Enter Room 3"
                >
                    Enter Room 3
                </button>
            </div>
        </section>
    );
}
