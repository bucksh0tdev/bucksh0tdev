import { useMemo, useRef, useState } from "react";
import buildTerminalEntries, { buildCommandMap, extraCommandEntries } from "./terminalContent.js";
import TerminalSection from "./TerminalSection.js";
import TerminalInput from "./TerminalInput.js";

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const HeroLayout = () => {
    const yearsInIndustry = new Date().getFullYear() - 1997;
    const baseEntries = useMemo(
        () => buildTerminalEntries({ yearsInIndustry }).map((entry) => ({ ...entry, id: createId() })),
        [yearsInIndustry]
    );
    const commandMap = useMemo(
        () => buildCommandMap([...baseEntries, ...extraCommandEntries]),
        [baseEntries]
    );
    const [userLog, setUserLog] = useState([]);
    const audioRef = useRef(null);

    const scrollToBottom = () => {
        if (typeof window === "undefined") return;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const doc = document.documentElement;
                const top = Math.max(doc.scrollHeight, document.body.scrollHeight) - doc.clientHeight;
                window.scrollTo({ top, behavior: "smooth" });
            });
        });
    };

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return "Music Not Found!";
        audio.loop = true;
        audio.volume = 0.3;
        if (audio.paused) {
            audio.play().catch(() => {});
            return "This devil plays to win ~ and he never loses.";
        }
        audio.pause();
        return "Signal muted.";
    };

    const appendUserEntry = (entry) => {
        setUserLog((prev) => {
            const next = [...prev, entry];
            if (next.length <= 3) return next;
            return next.slice(next.length - 3);
        });
    };

    const handleCommand = (rawCommand) => {
        const normalized = rawCommand.trim().toLowerCase();
        if (!normalized) return;

        if (normalized === "clear") {
            setUserLog([]);
            scrollToBottom();
            return;
        }

        if (normalized === "help") {
            const commands = Object.keys(commandMap).sort().join(", ");
            appendUserEntry({
                id: createId(),
                command: rawCommand,
                type: "text",
                output: `Commands: ${commands}, clear`,
            });
            scrollToBottom();
            return;
        }

        const match = commandMap[normalized];
        if (match) {
            let outputOverride;
            if (match.effect === "music") {
                outputOverride = toggleMusic();
            }
            appendUserEntry({
                ...match,
                id: createId(),
                command: rawCommand,
                output: outputOverride ?? match.output,
            });
            scrollToBottom();
            return;
        }

        appendUserEntry({
            id: createId(),
            command: rawCommand,
            type: "text",
            output: `command not found: ${rawCommand}`,
        });
        scrollToBottom();
    };

    return (
        <div className="terminal-stack">
            <section className="terminal-section terminal-section--single">
                {baseEntries.map((entry) => (
                    <TerminalSection key={entry.id} entry={entry} />
                ))}

                {userLog.map((entry) => (
                    <TerminalSection key={entry.id} entry={entry} />
                ))}

                <TerminalInput onSubmit={handleCommand} />
            </section>
            <audio ref={audioRef} src="/libs/music.mp3" preload="auto" style={{ display: "none" }} />
        </div>
    );
}

export default HeroLayout;
