import React, { useMemo, useState } from "react";

/**
 * Room 5 Puzzle — Carol Karaoke Finale
 * Player must enter the classic line:
 * "Jingle Bells, Jingle Bells, Jingle All The Way"
 * Validation is punctuation/case-insensitive & ignores extra spaces.
 *
 * Props:
 * - onClose(): close the modal without solving
 * - onSuccess(): notify parent Room5 of success
 */
export default function Room5Puzzle({ onClose = () => { }, onSuccess = () => { } }) {
    const [value, setValue] = useState("");

    // Normalize user input for robust matching
    const normalized = useMemo(() => {
        return value
            .toLowerCase()
            .replace(/[^a-z\s]/g, "")         // remove punctuation
            .replace(/\s+/g, " ")             // collapse spaces
            .trim();
    }, [value]);

    // Accepted answers (you can add more variants if you want)
    const accepted = useMemo(() => {
        const a = [
            "jingle all the way",
            "jingle all the way!"
        ];
        return new Set(a.map(s =>
            s.toLowerCase().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ").trim()
        ));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (accepted.has(normalized)) {
            onSuccess();
        } else {
            // quick shake via class toggle
            const form = e.currentTarget;
            form.classList.remove("error");
            // eslint-disable-next-line no-unused-expressions
            form.offsetWidth; // force reflow
            form.classList.add("error");
        }
    };

    return (
        <div className="r5p-backdrop" role="dialog" aria-modal="true" aria-label="Room 5 Puzzle">
            <div className="r5p-panel">
                <button className="r5p-close" onClick={onClose} aria-label="Close puzzle">×</button>

                <h2 className="r5p-title">Carol Karaoke Finale</h2>
                <p className="r5p-sub">
                    Unscramble the room's clues, then finish the song.
                </p>

                <form className="r5p-form" onSubmit={handleSubmit}>
                    <input
                        className="r5p-input"
                        type="text"
                        placeholder='Type the line here…'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        aria-label="Your answer"
                        autoFocus
                    />
                    <button className="r5p-submit" type="submit">
                        Sing
                    </button>
                </form>

                <p className="r5p-hint">
                    Punctuation doesn't matter. Case doesn't matter.
                </p>
            </div>
        </div>
    );
}
