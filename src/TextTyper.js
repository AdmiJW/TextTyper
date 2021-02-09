import cursorFactory from './cursorFactory.js';
import timeoutPromiseGenerator from './util/timeoutPromiseGenerator.js';
import CursorEventQueue from './CursorEventQueue.js';
import VALUES from './VALUES.js';

import './style/textBox.css';



class TextTyper {

    /**
     * Settings Object consisting values to be set
     * 
     * @typedef {Object} Settings
     * @property {number} typeCPS Characters Per Second for Typing
     * @property {number} deleteCPS Characters Per Second for Deletings
     * @property {CursorSettings} cursorSettings Cursor Settings
     */


     /**
      * Initializes a Text Typer on the target HTML element to be the text box (The HTML element that text
      * will be typed in)
      * 
      * @param {HTMLElement} textBox The targeted HTML element to type text in
      * @param {Settings} param1 Settings Object consisting values to be set
      */
    constructor( textBox, { typeCPS=VALUES.DEFAULT_TYPE_CPS, deleteCPS=VALUES.DEFAULT_DELETE_CPS, cursorSettings } = {} ) {
        if (!(textBox instanceof Element) )
            throw "textBox must be a valid HTML element!";

        this.textBox = textBox;
        this.typeMsPerChar = 1000/typeCPS;               //  char/s converted to ms/char
        this.deleteMsPerChar = 1000/deleteCPS;
        this.Cursor = cursorFactory( cursorSettings );
        this.textNode = document.createTextNode('');
        
        this.presetTheme( VALUES.DEFAULT_TEXTBOX_THEME );
        this.textBox.classList.add('textbox');
        this.textBox.appendChild( this.textNode );
        this.textBox.appendChild( this.Cursor );

        //  Apply Extensions, if any
        if (TextTyper.extensions) {
            this.typeExt = [];
            this.deleteExt = [];

            TextTyper.extensions.forEach( f => {
                if (f.constructorExt) f.constructorExt(this);       //  Extension on constructor
                if (f.typeExt) this.typeExt.push(f.typeExt);        //  Extension on single character typed
                if (f.deleteExt) this.deleteExt.push(f.deleteExt);  //  Extension on single character deleted
            });
        }
    }


    /**
     * Types the string provided into the text box
     * 
     * @param {string} string The text to be typed one by one into text box
     * @param {function} resolve The Promise's resolve function to be executed after process is done. Used in 
     *      CursorEventQueue
     */
    async typeText( string, resolve ) {
        this.Cursor.turnBlinking(false);
        for (let c of string) {
            await timeoutPromiseGenerator( ()=> {
                if (this.typeExt) this.typeExt.forEach(f => f(this) );
                this.textNode.textContent += c;
            }, [], this.typeMsPerChar);
        }
        this.Cursor.turnBlinking(true);

        if (resolve) resolve();
    }


    /**
     * Put the string __immediately__ into the text box.
     * 
     * @param {string} string The text to be put into text box
     * @param {function} resolve The Promise's resolve function to be executed after process is done. Used
     *      in CursorEventQueue
     */
    async putText( string, resolve ) {
        this.Cursor.turnBlinking(false);
        this.textNode.textContent += string;
        this.Cursor.turnBlinking(true);

        if (resolve) resolve();
    }


    /**
     * Deletes the specified number of characters from the text box.
     * 
     * @param {number} [count=Infinity] Number of characters to be deleted. If exceeds the number of existing
     *      characters, it will simply stop after all characters are deleted
     * @param {function} resolve The Promise's resolve function to be executed after process is done. Used in
     *      CursorEventQueue
     */
    async deleteChar( count = Infinity, resolve ) {
        this.Cursor.turnBlinking(false);
        while (count-- > 0 && this.textNode.textContent ) {
            await timeoutPromiseGenerator( ()=> {
                if (this.deleteExt) this.deleteExt.forEach(f => f(this) );
                this.textNode.textContent = this.textNode.textContent.slice(0, -1);
            }, [], this.deleteMsPerChar);
        }
        this.Cursor.turnBlinking(true);

        if (resolve) resolve();
    }


    /**
     * Clears the textbox __immediately__
     * 
     * @param {function} resolve The Promise's resolve function to be executed after process is done
     */
    clearText( resolve ) {
        this.textNode.textContent = '';
        if (resolve) resolve();
    }

    
    /**
     * Change the settings of the Text typer
     * 
     * @param {Settings} param0 Settings Object consisting values to be set
     * @param {function} resolve The Promise's resolve function to be executed after process is done
     */
    settings( { typeCPS, deleteCPS, cursorSettings } = {}, resolve ) {

        if (typeCPS)
            this.typeMsPerChar = 1000/typeCPS;
        if (deleteCPS)
            this.deleteMsPerChar = 1000/deleteCPS;
        if (cursorSettings)
            this.Cursor.settings( cursorSettings );

        if (resolve) resolve();
    }

    
    /**
     * Applies a Preset Theme to the text box. 
     *  
     * @param {string} theme The theme to be applied to the textbox 
     * @param {function} resolve The Promise's resolve function to be executed after process is done. Used in
     *      CursorEventQueue
     */
    presetTheme( theme, resolve ) {
        if (!(theme in VALUES.TEXTBOX_THEMES) ) throw "Invalid Preset Theme for Text Box";
        
        const newClasses = [ ...this.textBox.classList ].filter(cls => cls.startsWith("TBOX") );
        this.textBox.classList.remove( ...newClasses );
        this.textBox.classList.add( theme );

        if (resolve) resolve();
    }


    /**
     * Initializes and returns the Event Queue to obtain the ability to chain events
     * 
     * @returns {CursorEventQueue}
     */
    eventQueue() {
        return new TextTyper.CursorEventQueue(this);
    }
}   


//==============================================
//  APPEND CONSTANTS TO CURSOR AS STATIC MEMBERS
//==============================================
for (let k in VALUES.BLINK_MODES)
    TextTyper[k] = VALUES.BLINK_MODES[k];

for (let k in VALUES.CURSOR_STYLES) 
    TextTyper[k] = VALUES.CURSOR_STYLES[k];

for (let k in VALUES.TEXTBOX_THEMES)
    TextTyper[k] = VALUES.TEXTBOX_THEMES[k];


TextTyper.CursorEventQueue = CursorEventQueue;      //  Append CursorEventQueue class as property
                                                    //  to TextTyper


export default TextTyper;