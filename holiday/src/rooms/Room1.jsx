import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ add this
import "../styles/Room1.scss";
import bg from "../assets/backgrounds/room1_bg.png";

// Stockings
import stockingRed from "../assets/game_elements/room1/stocking_red.png";
import stockingGreen from "../assets/game_elements/room1/stocking_green.png";
import stockingBlue from "../assets/game_elements/room1/stocking_blue.png";
import stockingGold from "../assets/game_elements/room1/stocking_gold.png";

// Digits
import digit7 from "../assets/game_elements/room1/digit_7.png";
import digit5 from "../assets/game_elements/room1/digit_5.png";
import digitBlank from "../assets/game_elements/room1/digit_blank.png";

// Hints & reward
import noteStockings from "../assets/game_elements/room1/note_stockings.png";
import ornamentGlow from "../assets/game_elements/room1/ornament_glow.png";

import StockingShuffle from "../components/StockingShuffle";

export default function Room1() {
    const [showPuzzle, setShowPuzzle] = useState(false);
    const [gotOrnament, setGotOrnament] = useState(false);

    // hint panels
    const [showNote, setShowNote] = useState(false);
    const [showMixer, setShowMixer] = useState(false);
    const [showTreeHint, setShowTreeHint] = useState(false);

    const nav = useNavigate(); // ✅ navigation hook

    return (
        <section
            className="room1"
            style={{ backgroundImage: `url(${bg})` }}
            aria-label="Room 1: The Cozy Living Room"
        >
            <div className="scene">
                {/* Stockings */}
                <img src={stockingRed} alt="Red stocking" className="asset stocking red" />
                <img src={stockingGreen} alt="Green stocking" className="asset stocking green" />
                <img src={stockingBlue} alt="Blue stocking" className="asset stocking blue" />
                <img src={stockingGold} alt="Gold stocking" className="asset stocking gold" />

                {/* Digits */}
                <img src={digit7} alt="Digit 7" className="asset digit d7" />
                <img src={digit5} alt="Digit 5" className="asset digit d5" />
                <img src={digitBlank} alt="Digit blank for Blue" className="asset digit dBlue" />
                <img src={digitBlank} alt="Digit blank for Gold" className="asset digit dGold" />

                {/* Hint nodes */}
                <button className="node node-note" onClick={() => setShowNote(true)} />
                <button className="node node-mixer" onClick={() => setShowMixer(true)} />
                <button className="node node-tree" onClick={() => setShowTreeHint(true)} />

                {/* Start puzzle node */}
                <button className="node node-start" onClick={() => setShowPuzzle(true)}>
                    <span className="start-label">Play Puzzle</span>
                </button>

                {/* Reward + prompt */}
                {gotOrnament && (
                    <>
                        <button
                            className="ornament-btn"
                            onClick={() => nav("/room2intro")} // ✅ routes to Room2Intro
                            aria-label="Collect the ornament and continue"
                        >
                            <img src={ornamentGlow} alt="Glowing ornament" />
                        </button>
                        <p className="reward-text">
                            Collect the ornament to restore the holiday tree
                        </p>
                    </>
                )}

                {/* Panels / Modals */}
                {showNote && (
                    <div className="panel" role="dialog" aria-modal="true" aria-label="Stockings note">
                        <button className="panel-close" onClick={() => setShowNote(false)} aria-label="Close">✕</button>
                        <img src={noteStockings} alt='Note reading: "To light the tree, add the colors that mix me."' />
                        <p className="panel-text">“To light the tree, add the colors that mix me.”</p>
                    </div>
                )}

                {showMixer && (
                    <div className="panel" role="dialog" aria-modal="true" aria-label="Color mixing hints">
                        <button className="panel-close" onClick={() => setShowMixer(false)} aria-label="Close">✕</button>
                        <h2>Color Clues</h2>
                        <ul className="panel-list">
                            <li><strong>Gold</strong> shines when <em>Red + Green</em> come together.</li>
                            <li><strong>Purple</strong> appears from <em>Red + Blue</em> (it’s “more” than either alone).</li>
                            <li>Two stockings already show their numbers.</li>
                        </ul>
                        <p className="panel-text faint">Maybe “mix” means add the color numbers…</p>
                    </div>
                )}

                {showTreeHint && (
                    <div className="panel" role="dialog" aria-modal="true" aria-label="Tree lights hint">
                        <button className="panel-close" onClick={() => setShowTreeHint(false)} aria-label="Close">✕</button>
                        <h2>Tree Lights</h2>
                        <p className="panel-text">
                            The lights flicker near the <b>Blue</b> and <b>Gold</b> stockings, waiting for their numbers.
                        </p>
                        <p className="panel-text faint">
                            Red = 7, Green = 5… if Purple comes from Red + Blue, what might Blue be?
                        </p>
                    </div>
                )}

                {showPuzzle && (
                    <StockingShuffle
                        onClose={() => setShowPuzzle(false)}
                        onSolved={() => {
                            setShowPuzzle(false);
                            setGotOrnament(true); // ✅ success → ornament + text appear
                        }}
                    />
                )}
            </div>
        </section>
    );
}
