import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Room3.scss";

// Background + overlay gif
import room3Bg from "../assets/backgrounds/room3_bg.png";
import yardGif from "../assets/game_elements/room3/lights_blinking.gif";

// Other elements

import joyGlow from "../assets/game_elements/room3/joy_glow.png";

// Puzzle
import Room3Puzzle from "../components/Room3Puzzle";

export default function Room3() {
    const [showPuzzle, setShowPuzzle] = useState(false);
    const [joyReady, setJoyReady] = useState(false); // becomes true when puzzle solved
    const navigate = useNavigate();

    const handleOpenPuzzle = () => setShowPuzzle(true);
    const handleClosePuzzle = () => setShowPuzzle(false);

    const handleSolved = () => {
        setJoyReady(true);         // show clickable JOY
        handleClosePuzzle();
    };

    const handleCollectJoy = () => {
        // Optional: brief microfeedback could be added here
        navigate("/room4intro");
    };

    return (
        <div
            className="room3"
            aria-label="Room 3 — The Snowy Yard"
            style={{ backgroundImage: `url(${room3Bg})` }}
        >
            {/* GIF overlay */}
            <img
                className="yard-gif"
                src={yardGif}
                alt="Blinking holiday lights overlay"
                draggable="false"
            />

            {/* Hint nodes (place anywhere; all open the puzzle) */}
            <button
                className="node node-a"
                onClick={handleOpenPuzzle}
                aria-label="Inspect twinkle lights"
                title="Inspect twinkle lights"
            />
            <button
                className="node node-b"
                onClick={handleOpenPuzzle}
                aria-label="Check the snowdrift"
                title="Why are the windows glowing?"
            />
            <button
                className="node node-c"
                onClick={handleOpenPuzzle}
                aria-label="Peek behind the planter"
                title="Peek behind the planter"
            />

            {/* After solve: clickable JOY to collect */}
            {joyReady && (
                <button
                    className="joy-glow-btn"
                    onClick={handleCollectJoy}
                    aria-label="Collect the joy before it's lost forever"
                    title="Collect the joy before it's lost forever"
                >
                    <img
                        src={joyGlow}
                        alt="JOY glowing—click to collect before it's lost forever"
                        draggable="false"
                    />
                </button>
            )}

            {showPuzzle && (
                <Room3Puzzle onClose={handleClosePuzzle} onSolved={handleSolved} />
            )}
        </div>
    );
}
