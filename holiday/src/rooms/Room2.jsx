import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Room2.scss";

import room2Bg from "../assets/backgrounds/room2_bg.png";

import recipeBookImg from "../assets/game_elements/room2/recipe_book.png";
import sugarImg from "../assets/game_elements/room2/sugar.png";
import flourImg from "../assets/game_elements/room2/flour.png";
import sprinklesImg from "../assets/game_elements/room2/srinkles.png"; // matches your folder name
import bowlImg from "../assets/game_elements/room2/mixing_bowl.png";
import cookiesCompleteImg from "../assets/game_elements/room2/cookies_complete.png";

import RecipePuzzle from "../components/RecipePuzzle";

export default function Room2() {
    const navigate = useNavigate();
    const [showPuzzle, setShowPuzzle] = useState(false);
    const [showReward, setShowReward] = useState(false);

    // NEW: separate enlarged recipe modal
    const [showRecipe, setShowRecipe] = useState(false);

    const [activeHint, setActiveHint] = useState(null); // sugar | flour | sprinkles | bowl

    const handleSolved = () => {
        setShowPuzzle(false);
        setShowReward(true);
    };

    const handleCollectReward = () => {
        navigate("/room3intro");
    };

    // Hint text (non-book)
    const HINT_TEXT = {
        sugar: {
            title: "Sugar Clue",
            lines: [
                "Too sweet ruins the batch - keep it light.",
                "Think: a pinch... and a little more.",
            ],
        },
        flour: {
            title: "Flour Clue",
            lines: [
                "Structure comes from flour.",
                "A trifecta tends to hold a cookie together.",
            ],
        },
        sprinkles: {
            title: "Sprinkles Clue",
            lines: [
                "Festive sparks top things off.",
                "Take a pair, and then add two more.",
            ],
        },
        bowl: {
            title: "Mixing Bowl",
            lines: [
                "All parts must be measured correctly before mixing.",
                "When the numbers feel right, tap Mix & Bake.",
            ],
        },
    };

    return (
        <div className="room2" role="main" aria-label="The Cookie Kitchen">
            <img className="bg" src={room2Bg} alt="" />

            {/* Clickables */}
            <button
                className="node hint-node recipe-book glow"
                onClick={() => setShowRecipe(true)}
                aria-label="Open recipe book"
                title="Open recipe book"
            >
                <img src={recipeBookImg} alt="Recipe book" />
            </button>

            <button
                className="node hint-node sugar-note"
                onClick={() => setActiveHint("sugar")}
                aria-label="View hint: sugar"
            >
                <img src={sugarImg} alt="Sugar bag" />
            </button>

            <button
                className="node hint-node flour-note"
                onClick={() => setActiveHint("flour")}
                aria-label="View hint: flour"
            >
                <img src={flourImg} alt="Flour bag" />
            </button>

            <button
                className="node hint-node sprinkles-note"
                onClick={() => setActiveHint("sprinkles")}
                aria-label="View hint: sprinkles"
            >
                <img src={sprinklesImg} alt="Sprinkles" />
            </button>

            <button
                className="node hint-node bowl-note"
                onClick={() => setActiveHint("bowl")}
                aria-label="View hint: mixing bowl"
            >
                <img src={bowlImg} alt="Mixing bowl" />
            </button>

            {/* Enlarged recipe modal */}
            {showRecipe && (
                <div className="recipe-pop" role="dialog" aria-modal="true">
                    <div className="recipe-card">
                        <button
                            className="close"
                            aria-label="Close recipe"
                            onClick={() => setShowRecipe(false)}
                        >
                            ✕
                        </button>
                        <div className="recipe-img-wrap">
                            <img src={recipeBookImg} alt="Recipe book enlarged" />
                        </div>
                        <div className="recipe-actions">
                            <button
                                className="primary glow-strong"
                                onClick={() => {
                                    setShowRecipe(false);
                                    setShowPuzzle(true);
                                }}
                            >
                                Start Puzzle
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Other hint cards */}
            {activeHint && (
                <div className="hint-pop" role="dialog" aria-modal="true">
                    <div className="hint-card">
                        <button
                            className="close"
                            aria-label="Close hint"
                            onClick={() => setActiveHint(null)}
                        >
                            ✕
                        </button>
                        <h3 className="hint-title">{HINT_TEXT[activeHint].title}</h3>
                        <ul className="hint-lines">
                            {HINT_TEXT[activeHint].lines.map((l, i) => (
                                <li key={i}>{l}</li>
                            ))}
                        </ul>
                        <div className="hint-actions">
                            <button
                                className="secondary"
                                onClick={() => setActiveHint(null)}
                            >
                                Got it
                            </button>
                            <button
                                className="primary"
                                onClick={() => {
                                    setActiveHint(null);
                                    setShowPuzzle(true);
                                }}
                            >
                                Try Puzzle
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Puzzle modal */}
            {showPuzzle && (
                <RecipePuzzle
                    onClose={() => setShowPuzzle(false)}
                    onSolved={handleSolved}
                />
            )}

            {/* Reward */}
            {showReward && (
                <div className="reward-layer fade-in">
                    <div className="reward-card">
                        <p className="reward-text">
                            Cookies complete! Click the cookies to keep the spirit flowing.
                        </p>
                        <button
                            className="cookies-btn glow-strong"
                            onClick={handleCollectReward}
                            aria-label="Collect cookies and continue"
                        >
                            <img src={cookiesCompleteImg} alt="Glowing cookies" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
