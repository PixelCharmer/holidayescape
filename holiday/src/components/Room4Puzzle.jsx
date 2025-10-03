import React, { useState } from "react";

import box1 from "../assets/game_elements/room4/box1.png";
import box2 from "../assets/game_elements/room4/box2.png";
import box3 from "../assets/game_elements/room4/box3.png";
import box4 from "../assets/game_elements/room4/box4.png";
import box5 from "../assets/game_elements/room4/box5.png";

export default function Room4Puzzle({
    onClose = () => { },
    onSuccess = () => { },
}) {
    const [status, setStatus] = useState("idle"); // idle | wrong | success
    const [lastPick, setLastPick] = useState(null);

    const choices = [
        { id: 1, img: box1, alt: "Box 1" },
        { id: 2, img: box2, alt: "Box 2" },
        { id: 3, img: box3, alt: "Box 3" }, // correct (bell)
        { id: 4, img: box4, alt: "Box 4" },
        { id: 5, img: box5, alt: "Box 5" },
    ];

    function handlePick(id) {
        setLastPick(id);
        if (id === 3) {
            setStatus("success");
            setTimeout(() => onSuccess(), 12000);
        } else {
            setStatus("wrong");
            setTimeout(() => setStatus("idle"), 8000);
        }
    }

    return (
        <div className="r4p-overlay" role="dialog" aria-modal="true" aria-label="Gift Guessing Game">
            <div className={`r4p-panel ${status === "wrong" ? "shake" : ""}`}>
                <header className="r4p-header">
                    <h2 className="r4p-title">Gift Guessing Game</h2>
                    <button className="r4p-close" onClick={onClose} aria-label="Close puzzle" title="Close">
                        ✕
                    </button>
                </header>

                <p className="r4p-intro">
                    Five festive boxes sit in a row. Clues in the room suggest only one hides a <strong>bell</strong>.
                    Pick the gift you think is ringing with joy.
                </p>

                <div className="r4p-grid" role="group" aria-label="Choose a box">
                    {choices.map((c) => (
                        <button
                            key={c.id}
                            className={`r4p-choice ${lastPick === c.id ? "picked" : ""} ${status}`}
                            onClick={() => handlePick(c.id)}
                            aria-label={`Choose ${c.alt}`}
                            title={`Choose ${c.alt}`}
                        >
                            <img src={c.img} alt={c.alt} />
                            <span className="r4p-label">{c.id}</span>
                        </button>
                    ))}
                </div>

                {status === "success" && (
                    <div className="r4p-success" aria-live="polite">
                        🔔 You found the bell! Nice pick.
                    </div>
                )}
                {status === "wrong" && (
                    <div className="r4p-wrong" aria-live="assertive">
                        Not that one—try again!
                    </div>
                )}
            </div>

            {/* lightweight confetti burst on success */}
            {status === "success" && (
                <div className="r4p-confetti" aria-hidden="true">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <span key={i} className="confetti" />
                    ))}
                </div>
            )}
        </div>
    );
}
