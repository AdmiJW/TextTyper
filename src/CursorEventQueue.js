import timeoutPromiseGenerator from './util/timeoutPromiseGenerator.js';


class CursorEventQueue {
    /**
     * @param {TextTyper} textBox The targetted HTML Element to be the text box 
     */
    constructor( textBox ) {
        this.textBox = textBox;
        this.eventQueue = [];
        this.historyQueue = [];
    }

    //======================================
    //  PUBLIC, CHAINABLE METHODS
    //======================================

    /**
     * Starts the event queue, in one pass 
     */
    async start() {
        while (this.eventQueue.length) {
            const event = this.eventQueue.shift();
            await new Promise((resolve)=> {
                this._executeFunc( event, resolve );
            });
        }
        return this;
    }


    /**
     * Adds a loop event to the event queue. It will loop everything currently in the event queue
     * for specified number of times
     * 
     * @param {number} [count=Infinity] Number of times to loop. If no arguments specified, will
     *      loop for infinite times.
     */
    loop( count=Infinity ) {
        this.eventQueue.push( [this._looper, [count] ] );
        return this;
    }


    /**
     * Adds a standby event to the event queue
     * 
     * @param {number} time Time in milliseconds for the stand by duration
     */
    standby( time ) {
        this.eventQueue.push( [this._standby, [time] ] );
        return this;
    }  

    

    /**
     * Clears the current history queue, so previously queued events won't be executed in the
     * future loop
     */
    clearHistory() {
        this.eventQueue.push( [this._looper, [0] ] );
        return this;
    }


    /**
     * Adds a type event to the event queue.
     * 
     * @param {string} string The text to be typed into text box
     */
    typeText(string) {
        this.eventQueue.push( [this.textBox.typeText, [string] ] );
        return this;
    }


    /**
     * Adds a put text event to the event queue.
     * 
     * @param {string} string The text to be put into text box
     */
    putText( string ) {
        this.eventQueue.push( [this.textBox.putText, [string] ] );
        return this;
    }


    /**
     * Adds a delete character event to the event queue.
     * 
     * @param {number} [count=Infinity] Number of characters to be deleted. Defaults to `Infinity`
     */
    deleteChar( count = Infinity) {
        this.eventQueue.push( [this.textBox.deleteChar, [count] ] );
        return this;
    }


    /**
     * Adds a clear text event to the event queue
     */
    clearText( ) {
        this.eventQueue.push( [this.textBox.clearText, [] ] );
        return this;
    }
    

    /**
     * Settings Object consisting values to be set
     * 
     * @typedef {Object} Settings
     * @property {number} typeCPS Characters Per Second for Typing
     * @property {number} deleteCPS Characters Per Second for Deletings
     * @property {CursorSettings} cursorSettings Cursor Settings
     */
    /**
     * Adds a setting event to the event queue
     * 
     * @param {Settings} param0 Settings Object consisting values to be set
     */
    settings( { typeCPS, deleteCPS, cursorSettings } = {} ) {
        this.eventQueue.push( [this.textBox.settings, [{ typeCPS, deleteCPS, cursorSettings}] ] );
        return this;
    }


    /**
     * Adds a preset theme event to the event queue
     * 
     * @param {string} theme The preset theme to be applied to the text box
     */
    presetTheme( theme ) {
        this.eventQueue.push( [this.textBox.presetTheme, [theme] ] );
        return this;
    }



    //=================================
    //  PRIVATE METHODS
    //=================================
    _executeFunc( event, resolve ) {
        if (event[0] === this._looper) {
            this._looper(event[1], resolve);
        } 
        else if (event[0] === this._standby) {
            this._standby(...event[1], resolve);
            this.historyQueue.push(event);
        }
        else {
            event[0].call(this.textBox, ...event[1], resolve);
            this.historyQueue.push(event);
        }
    }


    async _looper( count=Infinity, resolve ) {
        if (count === Infinity) resolve();
        while (count-- > 0) {
            for (let event of this.historyQueue) {
                await new Promise((resolve)=> {
                    event[0].call(this.textBox, ...event[1], resolve );
                });
            }
        }

        this.historyQueue = [];
        resolve();
    }


    /**
     * Waits for a specified duration before next event. Only useful in event queue
     * 
     * @param {number} time Time in milliseconds for the stand by duration
     * @param {function} resolve The Promise's resolve function to be executed after process is done
     */
    async _standby( time, resolve ) {
        await timeoutPromiseGenerator(()=>{}, [], time);
        if (resolve) resolve();
    }
}


export default CursorEventQueue;