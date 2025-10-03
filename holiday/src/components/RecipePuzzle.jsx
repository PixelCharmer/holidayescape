import React, { useState } from "react";
import "../styles/RecipePuzzle.scss";

export default function RecipePuzzle({
    onClose = () => { },
    onSolved = () => { },
}) {
    // Target: Sugar = 2, Flour = 3, Sprinkles = 4
    const TARGET = { sugar: 2, flour: 3, sprinkles: 4 };

    const [counts, setCounts] = useState({ sugar: 0, flour: 0, sprinkles: 0 });
    const [status, setStatus] = useState("idle"); // idle | error | success

    // Progressive hints WITHOUT reveal
    const [hintStep, setHintStep] = useState(0); // 0 none, 1..3 = hints

    const setCount = (key, val) => {
        const v = Math.max(0, Math.min(9, Number(val) || 0));
        setCounts((c) => ({ ...c, [key]: v }));
    };

    const adjust = (key, delta) => {
        setCounts((c) => {
            const v = Math.max(0, Math.min(9, c[key] + delta));
            return { ...c, [key]: v };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const ok =
            counts.sugar === TARGET.sugar &&
            counts.flour === TARGET.flour &&
            counts.sprinkles === TARGET.sprinkles;

        if (ok) {
            setStatus("success");
            setTimeout(onSolved, 650);
        } else {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 550);
        }
    };

    const nextHint = () => setHintStep((h) => Math.min(3, h + 1));
    const resetHints = () => setHintStep(0);

    return (
        <div className="puzzle-overlay" role="dialog" aria-modal="true">
            <div className={`puzzle-card ${status}`}>
                <button className="close-btn" onClick={onClose} aria-label="Close puzzle">✕</button>

                <h2 className="title">Recipe Riddle</h2>
                <p className="riddle">
                    “Something sweet (but not too much),<br />
                    A base to bind (a hearty touch),<br />
                    Then cheerful sparks to make them beam—<br />
                    Measure true to feed the team.”
                </p>

                {/* Progressive hints (no reveal) */}
                <div className="puzzle-hints">
                    {hintStep === 0 && <p className="hint-line faint">Need a nudge? Tap Hint.</p>}
                    {hintStep >= 1 && <p className="hint-line">Hint 1: Sugar shouldn’t overpower.</p>}
                    {hintStep >= 2 && <p className="hint-line">Hint 2: Flour forms the base.</p>}
                    {hintStep >= 3 && <p className="hint-line">Hint 3: Add more sprinkles then anything else.</p>}

                    <div className="hint-actions">
                        <button className="ghost" onClick={nextHint} disabled={hintStep >= 3}>
                            {hintStep < 3 ? "Hint" : "No more hints"}
                        </button>
                        {hintStep > 0 && (
                            <button className="ghost" onClick={resetHints}>Reset hints</button>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="measure-grid">
                    <fieldset className="measure">
                        <legend className="label">Sugar</legend>
                        <div className="stepper">
                            <button type="button" className="step" onClick={() => adjust("sugar", -1)} aria-label="Decrease sugar">–</button>
                            <input inputMode="numeric" aria-label="Sugar amount" value={counts.sugar} onChange={(e) => setCount("sugar", e.target.value)} />
                            <button type="button" className="step" onClick={() => adjust("sugar", +1)} aria-label="Increase sugar">+</button>
                        </div>
                    </fieldset>

                    <fieldset className="measure">
                        <legend className="label">Flour</legend>
                        <div className="stepper">
                            <button type="button" className="step" onClick={() => adjust("flour", -1)} aria-label="Decrease flour">–</button>
                            <input inputMode="numeric" aria-label="Flour amount" value={counts.flour} onChange={(e) => setCount("flour", e.target.value)} />
                            <button type="button" className="step" onClick={() => adjust("flour", +1)} aria-label="Increase flour">+</button>
                        </div>
                    </fieldset>

                    <fieldset className="measure">
                        <legend className="label">Sprinkles</legend>
                        <div className="stepper">
                            <button type="button" className="step" onClick={() => adjust("sprinkles", -1)} aria-label="Decrease sprinkles">–</button>
                            <input inputMode="numeric" aria-label="Sprinkles amount" value={counts.sprinkles} onChange={(e) => setCount("sprinkles", e.target.value)} />
                            <button type="button" className="step" onClick={() => adjust("sprinkles", +1)} aria-label="Increase sprinkles">+</button>
                        </div>
                    </fieldset>

                    <button type="submit" className="submit-btn glow-strong">Mix &amp; Bake</button>
                </form>
            </div>
        </div>
    );
}
