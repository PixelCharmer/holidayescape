import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Room5.scss";

/* Background */
import room5Bg from "../assets/backgrounds/room5_bg.png";

/* Room elements (individual so you can position/resize) */
import scrambled1 from "../assets/game_elements/room5/scrambled_word1.png";
import scrambled2 from "../assets/game_elements/room5/scrambled_word2.png";
import scrambled3 from "../assets/game_elements/room5/scrambled_word3.png";
import scrambled4 from "../assets/game_elements/room5/scrambled_word4.png";
import snowGlobe from "../assets/game_elements/room5/snow_globe.png";
import congratsBanner from "../assets/game_elements/room5/congrats_banner.png";

/* Puzzle */
import Room5Puzzle from "../components/Room5Puzzle";

export default function Room5() {
    const [showPuzzle, setShowPuzzle] = useState(false);
    const [solved, setSolved] = useState(false);
    const [showHints, setShowHints] = useState({
        h1: false,
        h2: false,
        h3: false,
    });

    const navigate = useNavigate();

    const handleOpenPuzzle = () => setShowPuzzle(true);
    const handleClosePuzzle = () => setShowPuzzle(false);

    const handleSuccess = () => {
        setSolved(true);
        setShowPuzzle(false);
    };

    const handleExit = () => {
        navigate("/gameexit");
    };

    return (
        <div
            className="room5"
            style={{ backgroundImage: `url(${room5Bg})` }}
            aria-label="Room 5: The Grand Celebration Hall"
        >
            <div className="scene">
                {/* --- Clickable Hint Nodes --- */}
                <button
                    className={`hint-node hint1 ${showHints.h1 ? "active" : ""}`}
                    onClick={() => setShowHints(s => ({ ...s, h1: !s.h1 }))}
                    aria-label="Hint node 1"
                    title="Hint: Toggle"
                />
                {showHints.h1 && (
                    <div className="hint-card hint1-card">
                        Lights, lyrics, and cheer unscramble what crowds sing every year.
                    </div>
                )}

                <button
                    className={`hint-node hint2 ${showHints.h2 ? "active" : ""}`}
                    onClick={() => setShowHints(s => ({ ...s, h2: !s.h2 }))}
                    aria-label="Hint node 2"
                    title="Hint: Toggle"
                />
                {showHints.h2 && (
                    <div className="hint-card hint2-card">
                        what is part of something that rides in a one horse open sleigh.
                    </div>
                )}

                <button
                    className={`hint-node hint3 ${showHints.h3 ? "active" : ""}`}
                    onClick={() => setShowHints(s => ({ ...s, h3: !s.h3 }))}
                    aria-label="Hint node 3"
                    title="Hint: Toggle"
                />
                {showHints.h3 && (
                    <div className="hint-card hint3-card">
                        the first part of the song is scrabled around the room, and repeats twice.
                    </div>
                )}

                {/* --- Decorative/Clue Images you can freely position/resize --- */}
                <img className="scrambled s1" src={scrambled1} alt="Scrambled word 1" />
                <img className="scrambled s2" src={scrambled2} alt="Scrambled word 2" />
                <img className="scrambled s3" src={scrambled3} alt="Scrambled word 3" />
                <img className="scrambled s4" src={scrambled4} alt="Scrambled word 4" />

                {/* --- Start Puzzle Node (Snow Globe) --- */}
                <button
                    className="start-puzzle"
                    onClick={handleOpenPuzzle}
                    aria-label="Open the final puzzle"
                    title="Open the final puzzle"
                >
                    <img className="snow-globe" src={snowGlobe} alt="Snow globe" />
                    {!solved && <span className="cta"> </span>}
                </button>

                {/* --- Win FX (post-solve) --- */}
                {solved && (
                    <>
                        <button
                            className="congrats-btn"
                            onClick={handleExit}
                            aria-label="Proceed to celebration"
                            title="Proceed to celebration"
                        >
                            <img
                                className="congrats-banner"
                                src={congratsBanner}
                                alt="Congratulations banner"
                            />
                            <span className="proceed">You Saved The Holidays!</span>
                        </button>
                    </>
                )}
            </div>

            {/* Modal Puzzle */}
            {showPuzzle && (
                <Room5Puzzle
                    onClose={handleClosePuzzle}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    );
}
