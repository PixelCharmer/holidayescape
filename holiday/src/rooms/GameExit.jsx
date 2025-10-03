import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GameExit.scss";

/* Use your existing Room 5 background to keep the finale vibe */
import bg from "../assets/backgrounds/room5_bg.png";

/* Individually controlled finale elements (all separate so you can move/resize) */
import snowGlobe from "../assets/game_elements/room5/snow_globe.png";
import spiritBurst from "../assets/game_elements/room5/spirit_burst.png";
import congratsBanner from "../assets/game_elements/room5/congrats_banner.png";

export default function GameExit() {
    const navigate = useNavigate();

    return (
        <section
            className="game-exit"
            style={{ backgroundImage: `url(${bg})` }}
            aria-label="Grand Celebration Hall — Finale"
        >
            {/* Soft overlay for readability */}
            <div className="overlay" aria-hidden="true" />

            <div className="scene" role="group" aria-label="Finale scene">
                {/* Banner */}
                <img
                    className="banner"
                    src={congratsBanner}
                    alt="Congratulations! You saved the season!"
                    draggable="false"
                />

                {/* Snow globe base */}
                <img
                    className="snow-globe"
                    src={snowGlobe}
                    alt="Magical snow globe restored"
                    draggable="false"
                />

                {/* Spirit burst animation overlay */}
                <img
                    className="spirit-burst"
                    src={spiritBurst}
                    /* decorative spark burst */
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                />

                {/* Headline + copy */}
                <header className="text">
                    <h1 className="title">You Restored the Holiday Spirit!</h1>
                    <p className="subtitle">
                        Lights blaze, music swells, and the Gremlin of Gloom tiptoes away defeated.
                        The Headquarters sparkles once more—thanks to you.
                    </p>
                </header>

                {/* Actions */}
                <div className="actions">
                    <button
                        className="btn primary"
                        onClick={() => navigate("/")}
                        aria-label="Return to Start"
                    >
                        Return to Start
                    </button>
                    <button
                        className="btn"
                        onClick={() => navigate("/room1intro")}
                        aria-label="Play Again"
                    >
                        Play Again
                    </button>
                </div>

                {/* Lightweight confetti (pure CSS, no libraries) */}
                <div className="confetti" aria-hidden="true">
                    {Array.from({ length: 60 }).map((_, i) => (
                        <span
                            key={i}
                            style={{
                                ["--i"]: i,
                                ["--h"]: (i * 23) % 360  // pass pre-calculated hue
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
