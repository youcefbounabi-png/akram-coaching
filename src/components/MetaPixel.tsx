import React, { useEffect } from 'react';

const MetaPixel: React.FC = () => {
    useEffect(() => {
        // Meta Pixel Base Code Integration
        if (typeof window !== 'undefined') {
            // @ts-ignore
            if (window.fbq) return;

            // @ts-ignore
            const n = window.fbq = function () {
                // @ts-ignore
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };

            // @ts-ignore
            if (!window._fbq) window._fbq = n;
            // @ts-ignore
            n.push = n;
            // @ts-ignore
            n.loaded = true;
            // @ts-ignore
            n.version = '2.0';
            // @ts-ignore
            n.queue = [];

            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://connect.facebook.net/en_US/fbevents.js';
            const firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode?.insertBefore(script, firstScript);

            // Initialize
            // @ts-ignore
            window.fbq('init', '1825384058160965');
            // @ts-ignore
            window.fbq('track', 'PageView');
        }
    }, []);

    return (
        <noscript>
            <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src="https://www.facebook.com/tr?id=1825384058160965&ev=PageView&noscript=1"
                alt=""
            />
        </noscript>
    );
};

export default MetaPixel;
