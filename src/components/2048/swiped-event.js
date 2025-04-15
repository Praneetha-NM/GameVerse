(function (window, document) {

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    if (typeof window.CustomEvent !== 'function') {

        window.CustomEvent = function (event, params) {


            let evt = document.createEvent('CustomEvent');
            return evt;
        };

        window.CustomEvent.prototype = window.Event.prototype;
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    let xDown = null;
    let yDown = null;
    let xDiff = null;
    let yDiff = null;
    let timeDown = null;
    let startEl = null;

    function handleTouchEnd(e) {
        if (startEl !== e.target) return;
    
        const swipeThreshold = parseInt(startEl.getAttribute('data-swipe-threshold') || '20', 10);
        const swipeTimeout = parseInt(startEl.getAttribute('data-swipe-timeout') || '500', 10);
        const timeDiff = Date.now() - timeDown;
    
        const eventType = getSwipeDirection({ xDiff, yDiff, swipeThreshold, swipeTimeout, timeDiff });
    
        if (eventType) {
            startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true }));
        }
    
        resetTouchData();
    }
    
    function getSwipeDirection({ xDiff, yDiff, swipeThreshold, swipeTimeout, timeDiff }) {
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            return shouldTriggerSwipe(xDiff, swipeThreshold, timeDiff, swipeTimeout, 'left', 'right');
        } else {
            return shouldTriggerSwipe(yDiff, swipeThreshold, timeDiff, swipeTimeout, 'up', 'down');
        }
    }
    
    function shouldTriggerSwipe(diff, threshold, timeDiff, timeout, positive, negative) {
        if (Math.abs(diff) > threshold && timeDiff < timeout) {
            return diff > 0 ? `swiped-${positive}` : `swiped-${negative}`;
        }
        return '';
    }
    
    function resetTouchData() {
        xDown = null;
        yDown = null;
        timeDown = null;
    }
        function handleTouchStart(e) {

        // if the element has data-swipe-ignore="true" we stop listening for swipe events
        if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

        startEl = e.target;

        timeDown = Date.now();
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
    }

    function handleTouchMove(e) {

        if (!xDown || !yDown) return;

        let xUp = e.touches[0].clientX;
        let yUp = e.touches[0].clientY;

        xDiff = xDown - xUp;
        yDiff = yDown - yUp;
    }

}(window, document));