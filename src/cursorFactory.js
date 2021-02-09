
import htmlElementFactory from './util/htmlElementFactory.js';
import htmlClassIDManipulator from './util/htmlClassIDManipulator.js';
import VALUES from './VALUES.js';

import './style/cursor.css';


/**
 * Options to be applied to the Cursor
 * @typedef CursorSettings
 * 
 * @property {string} blinkMode Blinking Mode of the cursor. Defaults to `VALUES.DEFAULT_BLINK_MODE`
 * @property {number} blinkPeriod Time taken to complete one cycle of blinking (Dissapear and Reappear of Cursor),
 *      in milliseconds. Defaults to `VALUES.DEFAULT_BLINK_PERIOD`
 */
/**
 * Creates a Span element, append it with Cursor related methods, and returns it.
 * 
 * @param {CursorSettings} param0 Options to be applied to the Cursor
 * @returns {HTMLSpanElement} Span element modified to work like a Text Cursor
 */
function cursorFactory( {blinkMode=VALUES.DEFAULT_BLINK_MODE, blinkPeriod=VALUES.DEFAULT_BLINK_PERIOD}={} ) {

    const span = htmlElementFactory('span');

    //  ============================================================
    //                          Methods
    //  ============================================================
    span.settings = ( {blinkMode, blinkPeriod, cursorStyling}={} ) => {
        //  Cursor Styling
        if (cursorStyling) {
            if ( !(cursorStyling in VALUES.CURSOR_STYLES) )
                throw "Invalid Cursor Style Given";
            
            const classNames = ['cursor'];
            classNames.push( cursorStyling );
            htmlClassIDManipulator(span, { classNames, clearClassNames:true} );
        }

        //  Duration
        if (blinkPeriod) {
            if ( !isFinite(blinkPeriod) || blinkPeriod < 0) throw "Invalid blink Period Provided";
            span.style.animationDuration = blinkPeriod? `${blinkPeriod}ms` : span.style.animationDuration;
        }

        //  Blink Mode
        if (blinkMode) {
            if ( !(blinkMode in VALUES.BLINK_MODES) ) throw "Invalid Blink Mode Provided";
            span.style.animationName = blinkMode;
        }
    }

    /**
     *  Switches the cursor to be blinking or not
     * 
     *  @param {boolean} turnOn true for blink. False to stop blinking
     */
    span.turnBlinking = (turnOn) => {
        const animationName = span.style.animationName; 
        const isStopped = animationName.endsWith('STOP');

        if (turnOn && isStopped) span.style.animationName = animationName.slice(0, -4);
        else if (!turnOn && !isStopped) span.style.animationName = `${animationName}STOP`;
    }


    //  ============================================================
    //                          Initialization
    /// ============================================================
    span.classList.add('cursor');
    span.blinkPeriod = blinkPeriod;
    span.blinkMode = blinkMode;
    span.cursorStyling = VALUES.DEFAULT_CURSOR_STYLE;

    span.settings({ blinkMode, blinkPeriod, cursorStyling: VALUES.DEFAULT_CURSOR_STYLE });

    span.style.animationIterationCount = 'infinite';
    span.style.animationTimingFunction = 'linear';

    return span;
}


export default cursorFactory;