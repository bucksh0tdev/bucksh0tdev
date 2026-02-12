import { useRef, useState } from "react";

const TerminalInput = ({ onSubmit }) => {
    const inputRef = useRef(null);
    const [value, setValue] = useState("");
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const focusInput = () => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    };

    const setInputValue = (nextValue) => {
        setValue(nextValue);
        if (inputRef.current) {
            inputRef.current.value = nextValue;
        }
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const command = value.trim();
            if (!command) return;

            onSubmit(command);
            setHistory((prev) => [...prev, command]);
            setHistoryIndex(-1);
            setInputValue("");
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (history.length === 0) return;
            const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(historyIndex - 1, 0);
            setHistoryIndex(nextIndex);
            setInputValue(history[nextIndex]);
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (history.length === 0) return;
            const nextIndex = historyIndex >= history.length - 1 ? -1 : historyIndex + 1;
            setHistoryIndex(nextIndex);
            setInputValue(nextIndex === -1 ? "" : history[nextIndex]);
            return;
        }

        if (event.key === "Escape") {
            event.preventDefault();
            setHistoryIndex(-1);
            setInputValue("");
        }
    };

    return (
        <div className="terminal-input-row" onClick={focusInput}>
            <span className="terminal-prompt">$</span>
            <input
                ref={inputRef}
                className="terminal-input-text"
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="type a command..."
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
            />
        </div>
    );
};

export default TerminalInput;
