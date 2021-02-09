
/**
 * Object containing the className and ID to be applied on the new HTML element
 * 
 * @typedef {Object} Settings
 * @property {Array} classNames An array of strings representing classNames to be applied on the
 *      HTML element
 * @property {string} id ID to be applied on the new HTML element
 */
/**
 * Creates an HTML element, with specified tagname. Optionally classes and ID to apply
 * 
 * @param {string} tagName Tag name of the HTML Element to be created. Example: `div`
 * @param {Settings} param1 Object containing the className and ID to be applied on the new HTML element
 * 
 * @returns {HTMLElement}
 */
function htmlElementFactory(tagName, {classNames = [], id} = {} ) {
    const element = document.createElement(tagName);
    classNames.forEach( className => element.classList.add(className));
    if (id) element.id = id;

    return element;
}

export default htmlElementFactory;