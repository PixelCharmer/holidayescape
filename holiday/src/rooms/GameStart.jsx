import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/GameStart.scss";

// Background
import startBg from "../assets/backgrounds/start_bg.png";

export default function GameStart() {
    const nav = useNavigate();

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Enter") nav("/room1intro");
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [nav]);

    return (
        <main
            className="game-start"
            style={{ backgroundImage: `url(${startBg})` }}
            aria-label="Holiday Escape: The Great Spirit Rescue - Start"
        >
            <div className="veil" aria-hidden="true" />

            <section className="panel fade-in" role="dialog" aria-modal="true">
                <header className="header">
                    <h1 className="title">The Great Spirit Rescue</h1>
                    <p className="subtitle">A silly, sparkly, spirit restoring adventure</p>
                </header>

                <article className="story">
                    <p>
                        You and your team are whisked into <strong>Holiday Headquarters</strong>, the
                        beating heart of seasonal cheer. Disaster has struck! The mischievous{" "}
                        <em>Gremlin of Gloom</em> has swiped the holiday spirit and scattered it
                        across five themed rooms.
                    </p>
                    <p>
                        <strong>Your mission:</strong> solve puzzles, collect joy, and restore the magic before the
                        celebration kicks off. Expect giggles, glitter, and just the right amount of
                        chaos.
                    </p>

                    <hr />
                </article>

                <div className="actions">
                    <button
                        className="btn primary"
                        onClick={() => nav("/room1intro")}
                        aria-label="Begin the adventure"
                        title="Begin (Enter)"
                    >
                        Begin
                    </button>
                </div>

            </section>
        </main>
    );
}
