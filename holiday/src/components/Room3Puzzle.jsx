import React, { useState } from "react";
import "../styles/Room3.scss";

// Light assets
import blueOff from "../assets/game_elements/room3/light_blue_off.png";
import blueOn from "../assets/game_elements/room3/light_blue_on.png";
import yellowOff from "../assets/game_elements/room3/light_yellow_off.png";
import yellowOn from "../assets/game_elements/room3/light_yellow_on.png";
import redOff from "../assets/game_elements/room3/light_red_off.png";
import redOn from "../assets/game_elements/room3/light_red_on.png";
import greenOff from "../assets/game_elements/room3/light_green_off.png";
import greenOn from "../assets/game_elements/room3/light_green_on.png";

/**
 * New pattern (by color), requiring repeated clicks:
 * red x3, green x4, blue x1, yellow x2
 */
const COLOR_PATTERN = [
    "red", "red", "red",
    "green", "green", "green", "green",
    "blue",
    "yellow", "yellow",
];

export default function Room3Puzzle({
    onClose = () => { },
    onSolved = () => { },
}) {
    // On/off visual feedback
    const [isOn, setIsOn] = useState({
        yellow: false,
        green: false,
        red: false,
        blue: false,
    });

    // Player input as color keys
    const [input, setInput] = useState([]);
    const [status, setStatus] = useState("idle"); // idle | error | success

    // Briefly light a bulb when pressed
    const blink = (key) => {
        setIsOn((prev) => ({ ...prev, [key]: true }));
        setTimeout(() => {
            setIsOn((prev) => ({ ...prev, [key]: false }));
        }, 200);
    };

    const checkProgress = (next) => {
        // Check prefix against expected pattern
        for (let i = 0; i < next.length; i++) {
            if (next[i] !== COLOR_PATTERN[i]) {
                setStatus("error");
                // feedback then reset
                setTimeout(() => {
                    setInput([]);
                    setStatus("idle");
                }, 2250);
                return;
            }
        }
        // Completed successfully
        if (next.length === COLOR_PATTERN.length) {
            setStatus("success");
            setTimeout(() => {
                onSolved();
            }, 2350);
            return;
        }
        // Still matching so far
        setStatus("idle");
    };

    const handlePress = (colorKey) => {
        blink(colorKey);
        const next = [...input, colorKey];
        setInput(next);
        checkProgress(next);
    };

    return (
        <div className={`r3p-overlay ${status === "error" ? "error" : ""}`} role="dialog" aria-modal="true">
            <div className={`r3p-panel ${status}`}>
                <header className="r3p-header">
                    <h2 className="r3p-title">Light Code</h2>
                    <button className="r3p-close" onClick={onClose} aria-label="Close puzzle" title="Close">✕</button>
                </header>

                <p className="r3p-instructions">
                    Repeat the light's rhythm: some colors blink more than once. Tap the lights in the <em>exact</em> order to awaken the clue.
                </p>

                <div className="r3p-grid">
                    {/* Yellow */}
                    <div className="r3p-cell">
                        <button
                            className="r3p-light"
                            onClick={() => handlePress("yellow")}
                            aria-label="Yellow light"
                            title="Yellow"
                        >
                            <img src={isOn.yellow ? yellowOn : yellowOff} alt="Yellow light" draggable="false" />
                        </button>
                        <span className="r3p-label">Yellow</span>
                    </div>

                    {/* Green */}
                    <div className="r3p-cell">
                        <button
                            className="r3p-light"
                            onClick={() => handlePress("green")}
                            aria-label="Green light"
                            title="Green"
                        >
                            <img src={isOn.green ? greenOn : greenOff} alt="Green light" draggable="false" />
                        </button>
                        <span className="r3p-label">Green</span>
                    </div>

                    {/* Red */}
                    <div className="r3p-cell">
                        <button
                            className="r3p-light"
                            onClick={() => handlePress("red")}
                            aria-label="Red light"
                            title="Red"
                        >
                            <img src={isOn.red ? redOn : redOff} alt="Red light" draggable="false" />
                        </button>
                        <span className="r3p-label">Red</span>
                    </div>

                    {/* Blue */}
                    <div className="r3p-cell">
                        <button
                            className="r3p-light"
                            onClick={() => handlePress("blue")}
                            aria-label="Blue light"
                            title="Blue"
                        >
                            <img src={isOn.blue ? blueOn : blueOff} alt="Blue light" draggable="false" />
                        </button>
                        <span className="r3p-label">Blue</span>
                    </div>
                </div>


                <div className="r3p-status" aria-live="polite">
                    {status === "error" && <span>That rhythm slipped—start from the top.</span>}
                    {status === "success" && <span>JOY! The lights align in triumph.</span>}
                </div>
            </div>
        </div>
    );
}
