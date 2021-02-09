
/**
 * Object containing the className and ID to be applied on the new HTML element
 * 
 * @typedef {Object} Settings
 * @property {Array} classNames An array of strings representing classNames to be applied on the
 *      HTML element
 * @property {string} id ID to be applied on the new HTML element
 * @property {boolean} [clearClassNames=false] If true, will clear existing classNames before applying
 *      new classNames specified
 */
/**
 * Function to manipulate the class and ID of a HTML element.
 * 
 * @param {HTMLElement} htmlElement Target element to be manipulated
 * @param {Settings} param1 Object containing the className and ID to be applied on the new HTML element
 */
function htmlClassIDManipulator(htmlElement, {classNames = [], id, clearClassNames = false} = {}) {
    if (clearClassNames) htmlElement.classList = [];
    classNames.forEach( className => htmlElement.classList.add(className) );
    if (id) htmlElement.id = id;
}

export default htmlClassIDManipulator;