
const BLINK_MODES = {
    'CURSOR_BLINK_NONE': 'CURSOR_BLINK_NONE',
    'CURSOR_BLINK_FLASH': 'CURSOR_BLINK_FLASH',
    'CURSOR_BLINK_LINEAR': 'CURSOR_BLINK_LINEAR'
};


const CURSOR_STYLES = {
    'CURSOR_STYLE_VERT': 'CURSOR_STYLE_VERT',
    'CURSOR_STYLE_I': 'CURSOR_STYLE_I',
    'CURSOR_STYLE_Y': 'CURSOR_STYLE_Y',
    'CURSOR_STYLE__': 'CURSOR_STYLE__',
    'CURSOR_STYLE_BLOCK': 'CURSOR_STYLE_BLOCK',
    'CURSOR_STYLE_LEFTARR': 'CURSOR_STYLE_LEFTARR',
    'CURSOR_STYLE_NONE': 'CURSOR_STYLE_NONE'
};


//  DO NOT CHANGE THE TBOX PREFIX. PRESET THEME FUNCTION RELIES ON IT
const TEXTBOX_THEMES = {
    'TBOX_THEME_DEFAULT': 'TBOX_THEME_DEFAULT',
    'TBOX_THEME_DARK': 'TBOX_THEME_DARK'
}


const values = {
    //  Available Properties for Settings
    BLINK_MODES,
    CURSOR_STYLES,
    TEXTBOX_THEMES,

    //  Default Values used when Cursor first initializes
    DEFAULT_BLINK_MODE: BLINK_MODES.CURSOR_BLINK_LINEAR,
    DEFAULT_BLINK_PERIOD: 1000,
    DEFAULT_CURSOR_STYLE: CURSOR_STYLES.CURSOR_STYLE_VERT,


    //  Default Values used when TextTyper first initializes
    DEFAULT_TYPE_CPS: 10,
    DEFAULT_DELETE_CPS: 10,
    DEFAULT_TEXTBOX_THEME: TEXTBOX_THEMES.TBOX_THEME_DEFAULT
}


export default values;
