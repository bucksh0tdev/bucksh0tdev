const TerminalSection = ({ entry }) => {
    const { command, type, output, items, links } = entry;

    return (
        <>
            <div className="terminal-section-title">
                <span className="terminal-prompt">$</span>
                <span>{command}</span>
            </div>

            {type === "text" && <div className="terminal-output">{output}</div>}

            {type === "list" && (
                <div className="terminal-output terminal-grid">
                    {(items || []).map((item) => (
                        <span key={item}>{item}</span>
                    ))}
                </div>
            )}

            {type === "links" && (
                <div className="terminal-output">
                    <div className="terminal-links">
                        {(links || []).map((link) => (
                            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default TerminalSection;
