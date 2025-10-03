import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Intros.scss";

/* Background uses the actual Room 2 image */
import bg from "../assets/backgrounds/room2_bg.png";

export default function Room2Intro() {
    const navigate = useNavigate();

    return (
        <section
            className="intro"
            style={{ backgroundImage: `url(${bg})` }}
            aria-label="Room 2 Intro"
        >
            <div className="scene">
                <h1 className="intro-title">The Cookie Kitchen</h1>
                <p className="intro-body">
                    Whisked-up riddles and mischievous measurements await. Decode the recipe
                    to bake a little joy back into the headquarters.
                </p>
                <button
                    className="intro-cta"
                    onClick={() => navigate("/room2")}
                    aria-label="Enter Room 2"
                >
                    Enter Room 2
                </button>
            </div>
        </section>
    );
}
