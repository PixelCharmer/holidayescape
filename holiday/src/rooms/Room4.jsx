import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Room4.scss";

/* Background */
import bg from "../assets/backgrounds/room4_bg.png";

/* Individually positioned room elements */
import box1 from "../assets/game_elements/room4/box1.png";
import box2 from "../assets/game_elements/room4/box2.png";
import box3 from "../assets/game_elements/room4/box3.png";
import box4 from "../assets/game_elements/room4/box4.png";
import box5 from "../assets/game_elements/room4/box5.png";
import bellGlow from "../assets/game_elements/room4/bell_glow.png";

/* Hints (left in place, now NON-clickable) */
import giftTag from "../assets/game_elements/room4/gift_tag.png";
import ornamentHint from "../assets/game_elements/room4/ornament_hint.png";
import ribbonHint from "../assets/game_elements/room4/ribbon_hint.png";

/* Puzzle overlay */
import Room4Puzzle from "../components/Room4Puzzle";

export default function Room4() {
    const [showPuzzle, setShowPuzzle] = useState(false);
    const [unlocked, setUnlocked] = useState(false);

    // which hint node is open: "1" | "2" | "3" | null
    const [openHint, setOpenHint] = useState(null);

    const nav = useNavigate();

    // UPDATED: success now only unlocks; navigation happens when the bell is clicked
    const handlePuzzleSuccess = () => {
        setUnlocked(true);
        setShowPuzzle(false);
    };

    // NEW: player clicks the bell to "ring in the cheer" and proceed
    const handleRingBell = () => {
        if (!unlocked) return;
        nav("/room5intro");
    };

    // Optional: close any open hint if user clicks the backdrop
    const handleSceneClick = (e) => {
        // Only close if they clicked the open scene (not a button or card)
        if (e.target?.classList?.contains("scene")) setOpenHint(null);
    };

    return (
        <div
            className="room4"
            style={{ backgroundImage: `url(${bg})` }}
            aria-label="The Wrapping Room"
        >
            <div className="scene" role="group" aria-label="Room 4 scene" onClick={handleSceneClick}>
                {/* Start Puzzle trigger */}
                {!showPuzzle && !unlocked && (
                    <button
                        className="start-puzzle-btn"
                        onClick={() => setShowPuzzle(true)}
                        aria-label="Start the Gift Guessing Game"
                        title="Start the Gift Guessing Game"
                    >
                        Click to play the puzzle
                    </button>
                )}

                {/* Success visual: bell glows and is now clickable to proceed */}
                {unlocked && (
                    <img
                        src={bellGlow}
                        alt='Glowing bell — click to "ring in the cheer"'
                        className="bell-glow"
                        onClick={handleRingBell}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") handleRingBell();
                        }}
                    />
                )}

                {/* Gift boxes (visuals only) */}
                <img src={box1} alt="Gift box 1" className="box box1" />
                <img src={box2} alt="Gift box 2" className="box box2" />
                <img src={box3} alt="Gift box 3" className="box box3" />
                <img src={box4} alt="Gift box 4" className="box box4" />
                <img src={box5} alt="Gift box 5" className="box box5" />

                {/* Hint images — left in place, non-clickable */}
                <img src={giftTag} alt="Gift tag" className="hint-img gift-tag" />
                <img src={ribbonHint} alt="Ribbon hint" className="hint-img ribbon" />
                <img src={ornamentHint} alt="Ornament hint" className="hint-img ornament" />

                {/* --- 3 hint nodes with text cards (unchanged) --- */}
                <div className="hint-node-wrap node1">
                    <button
                        className="hint-node"
                        aria-haspopup="dialog"
                        aria-expanded={openHint === "1"}
                        aria-controls="hint-card-1"
                        title="Hint node 1"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenHint(openHint === "1" ? null : "1");
                        }}
                    />
                    {openHint === "1" && (
                        <div className="hint-card" id="hint-card-1" role="dialog" aria-label="Hint 1">
                            <p>
                                Not a toy, nor something to wear,
                                <br />
                                A sound of cheer floats in the air.
                                <br />
                                Find the box that rings so well,
                                <br />
                                Choose the gift that holds the🔔.
                            </p>
                            <button
                                className="close-hint"
                                aria-label="Close hint 1"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenHint(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                <div className="hint-node-wrap node2">
                    <button
                        className="hint-node"
                        aria-haspopup="dialog"
                        aria-expanded={openHint === "2"}
                        aria-controls="hint-card-2"
                        title="Hint node 2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenHint(openHint === "2" ? null : "2");
                        }}
                    />
                    {openHint === "2" && (
                        <div className="hint-card" id="hint-card-2" role="dialog" aria-label="Hint 2">
                            <p>Why would a ribbon read "B3LL".</p>
                            <button
                                className="close-hint"
                                aria-label="Close hint 2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenHint(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                <div className="hint-node-wrap node3">
                    <button
                        className="hint-node"
                        aria-haspopup="dialog"
                        aria-expanded={openHint === "3"}
                        aria-controls="hint-card-3"
                        title="Hint node 3"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenHint(openHint === "3" ? null : "3");
                        }}
                    />
                    {openHint === "3" && (
                        <div className="hint-card" id="hint-card-3" role="dialog" aria-label="Hint 3">
                            <p>When in doubt, think ornaments: which present match me?</p>
                            <button
                                className="close-hint"
                                aria-label="Close hint 3"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenHint(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                {/* Puzzle overlay */}
                {showPuzzle && !unlocked && (
                    <Room4Puzzle onClose={() => setShowPuzzle(false)} onSuccess={handlePuzzleSuccess} />
                )}
            </div>
        </div>
    );
}
