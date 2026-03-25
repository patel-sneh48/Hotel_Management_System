import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Robust ScrollToTop component.
 * Uses requestAnimationFrame to ensure the scroll happens after the 
 * new page has rendered and any potential initial scroll layout shifts.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Delayed scroll as fallback for slower renders or hidden overflows
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);

    // Frame-based scroll for ultra-reliability
    let frameId;
    const scrollOnFrame = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    frameId = requestAnimationFrame(scrollOnFrame);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
