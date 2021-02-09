
/**
 * Returns a Promise which when ran, will execute the callback function provided,
 * and delay for some time.
 * 
 * @param {function} callback Callback function to be executed 
 * @param {Array} callbackArgs An array of arguments to be passed into callback function
 * @param {number} delay Number of milliseconds to delay
 * @param {boolean} [execAfter=false] If true, will wait for delay to complete first, then execute
 *      the callback. 
 */
function timeoutPromiseGenerator(callback, callbackArgs, delay, execAfter = false) {
    return new Promise((resolve,reject)=> {
        let result;
        if (!execAfter) result = callback( ...callbackArgs );

        setTimeout(() => {
            if (execAfter) result = callback( ...callbackArgs );
            resolve(result);
        }, delay);
    });
}

export default timeoutPromiseGenerator;