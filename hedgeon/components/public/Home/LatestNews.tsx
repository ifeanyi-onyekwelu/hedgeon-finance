import { useEffect } from 'react';

export default function LatestNews() {
    useEffect(() => {
        // Dynamically load TradingView script
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "feedMode": "market",
            "colorTheme": "light",
            "isTransparent": true,
            "displayMode": "compact",
            "width": "1000",
            "height": "400",
            "locale": "en",
            "market": "crypto"
        });

        const container = document.getElementById('tradingview-container');
        if (container) {
            container.appendChild(script);
        }

        return () => {
            // Cleanup script on component unmount
            if (container && script.parentNode === container) {
                container.removeChild(script);
            }
        };
    }, []);

    return (
        <section className="bg-background py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
                    <h2 className="text-4xl font-light tracking-tight">
                        LATEST NEWS
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        On the global marketplace
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <div className="p-6">
                            <div
                                id="tradingview-container"
                                className="tradingview-widget-container"
                            >
                                <div className="tradingview-widget-container__widget" />
                            </div>

                            <div className="flex justify-center mt-8">
                                <svg
                                    className="w-6 h-6 text-muted-foreground"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}