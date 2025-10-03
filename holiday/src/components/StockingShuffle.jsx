import React, { useState } from "react";


export default function StockingShuffle({ onClose = () => { }, onSolved = () => { } }) {
    // Known: Red=7, Green=5. Solve for Blue and Gold.
    // From project notes: correct sequence is [7, 5, 9, 12].
    const [blue, setBlue] = useState("");
    const [gold, setGold] = useState("");
    const [status, setStatus] = useState("idle"); // 'idle' | 'error' | 'success'

    const handleSubmit = (e) => {
        e.preventDefault();
        const b = parseInt(blue, 10);
        const g = parseInt(gold, 10);

        if (b === 9 && g === 12) {
            setStatus("success");
            setTimeout(() => onSolved(), 600);
        } else {
            setStatus("error");
        }
    };

    return (
        <div className={`modal ${status}`} role="dialog" aria-modal="true" aria-label="Stocking Shuffle Puzzle">
            <div className="modal-card">
                <button className="panel-close" onClick={onClose} aria-label="Close puzzle">✕</button>
                <h2>Stocking Shuffle</h2>
                <p className="modal-hint">
                    Red = <b>7</b>, Green = <b>5</b>. Blue and Gold are blank.
                    <br />
                    Use the hints around the room about color mixing to find their values.
                </p>

                <form className="inputs" onSubmit={handleSubmit}>
                    <label>
                        Blue
                        <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={blue}
                            onChange={(e) => setBlue(e.target.value)}
                            placeholder="?"
                            aria-label="Enter Blue stocking number"
                            required
                        />
                    </label>

                    <label>
                        Gold
                        <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={gold}
                            onChange={(e) => setGold(e.target.value)}
                            placeholder="?"
                            aria-label="Enter Gold stocking number"
                            required
                        />
                    </label>

                    <button className="btn-primary" type="submit">Submit</button>
                </form>

                {status === "error" && (
                    <p className="feedback error" role="alert">
                        That doesn’t light the tree. Re-check the mixing clues!
                    </p>
                )}
                {status === "success" && (
                    <p className="feedback success" role="status">
                        The tree blazes to life! You earn a glowing ornament.
                    </p>
                )}
            </div>
        </div>
    );
}
