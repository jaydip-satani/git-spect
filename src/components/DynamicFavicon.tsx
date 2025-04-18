'use client';

import { useEffect } from 'react';

const DynamicFavicon = () => {
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const lightFavicon = document.getElementById('favicon-light') as HTMLLinkElement | null;
        const darkFavicon = document.getElementById('favicon-dark') as HTMLLinkElement | null;

        function setFavicon() {
            if (darkModeMediaQuery.matches && darkFavicon && lightFavicon) {
                darkFavicon.rel = 'icon';
                lightFavicon.rel = 'alternate icon';
            } else if (lightFavicon && darkFavicon) {
                lightFavicon.rel = 'icon';
                darkFavicon.rel = 'alternate icon';
            }
        }

        // Set favicon initially based on the system theme
        setFavicon();

        // Listen for changes in the system's theme
        darkModeMediaQuery.addEventListener('change', setFavicon);

        return () => {
            darkModeMediaQuery.removeEventListener('change', setFavicon);
        };
    }, []);

    return null; // This component does not render anything visible
};

export default DynamicFavicon;
