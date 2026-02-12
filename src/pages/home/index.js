import HeaderLayout from "../../layouts/header.js";
import FooterLayout from "../../layouts/footer.js";
import HeroLayout from "./layouts/hero.js";

const HomePage = () => {
    return (
        <div className="page-shell">
            <div className="bg-orb orb-1" aria-hidden="true"></div>
            <div className="bg-orb orb-2" aria-hidden="true"></div>
            <div className="bg-grid" aria-hidden="true"></div>

            <main className="page-main">
                <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="terminal-title">bucksh0t@macbook-pro-m4:~</div>
                            <div className="terminal-status">ONLINE</div>
                        </div>
                        <div className="terminal-body">
                            <HeaderLayout />
                            <HeroLayout />
                        </div>
                        <div className="scanlines" aria-hidden="true"></div>
                        <div className="terminal-noise" aria-hidden="true"></div>
                    </div>
                </div>
            </main>

            <FooterLayout />
        </div>
    )
}

export default HomePage;
