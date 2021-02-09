# ⌨️ Text Typer ⌨️

<br>

### __Links__
* [Usage](#usage)
* [Example](#example)
* [Non-Chainable Methods](#non-chainable-methods)
* [Chainable Methods](#chainable-methods)
* [Settings](#settings)
* [Extensions](#extensions)

<br>

# Usage

Simply put the script tag into your HTML document. Module will be loaded via CDN

```html
<script src='https://unpkg.com/text-typers@latest/build/bundle.js'></script>
```

<br>


# Example

```javascript
const tt = new TextTyper( document.getElementById('test') );

tt.eventQueue()
    .typeText('Hello World!')
    .standby(1000)
    .deleteChar()
    .standby(500)
    .typeText('Text Typer! ✏')
    .start();
```

<br>

# Non-Chainable Methods

Those methods upon called, will perform the event immediately, asynchronously. Usually, you would want to use [Chainable Methods](#chainable-methods) instead.

| Method | Parameters | Description | Example |
|-|-|-|-|
| `constructor` | `textBox` - Targeted HTML element to type text in.<br> `TextBoxSettings` (optional) - See more in [TextBoxSettings](#TextBoxSettings). | Constructor. Initializes a Text Typer on the target HTML element to be the text box (The HTML element that text will be typed in | `const tt = new TextTyper(document.getElementById('my-box') );` |
| `typeText` | `string` - The text to be typed one by one into text box <br> | Types the string provided into the text box | `tt.typeText('Hello World');` |
| `putText` | `string` - The text to be put into text box | Put the string __immediately__ into the text box. | `tt.putText('Hello World');` |
| `deleteChar` | `count` (optional) - Number of characters to be deleted. If exceeds the number of existing characters, it will simply stop after all characters are deleted. If no argument given, it will delete everything inside the text box one by one | Deletes the specified number of characters from the text box. | `tt.deleteChar();` <br> `tt.deletecChar(10);` |
| `clearText` | - | Clears the textbox __immediately__ | `tt.clearText();` |
| `settings` | [TextBoxSettings](#TextBoxSettings) | Change the settings of the Text typer | See [Settings](#settings) |
| `presetTheme` | `theme` - The theme to be applied to the textbox. See [Settings](#settings) | Applies a Preset Theme to the text box. | See [Settings](#settings) |
| `eventQueue` | - | Initializes and returns the Event Queue to obtain the ability to chain events | `const eq = tt.eventQueue();` |

<br>

# Chainable Methods

With `eventQueue()` called, it will return a `CursorEventQueue` object which you can __chain__ events and have them execute one after another synchronously.

Most of the methods mentioned above in [Non-Chainable Methods](#non-chainable-methods) are also chainable for `CursorEventQueue`.

| Method | Parameters | Description | Example |
|-|-|-|-|
| `start` | - | Starts the event queue, in one pass | `eq.typeText("Hello World!").start();` |
| `loop` | `count` (optional) - Number of times to loop. If no arguments specified, will loop for infinite times. | Adds a loop event to the event queue. It will loop everything currently in the event queue for specified number of times. Note that after loop, the events are cleared. |  `eq.typeText("a").loop(3).start();` <br> `// This will cause 'aaaa' to be typed` |
| `standby` | `time` - Time in milliseconds for the stand by duration | Hold for specified milliseconds before execution of next event in the queue | `eq.standby(3000)` |
| `clearHistory` | - | Clears the current history queue, so previously queued events won't be executed in the upcoming loop | `eq.typeText('a').clearHistory().loop().start()` <br> `// Only single 'a' will be typed` |
| `typeText` | `string` - The text to be typed one by one into text box <br> | Types the string provided into the text box | `eq.typeText('Hello World')` |
| `putText` | `string` - The text to be put into text box | Put the string __immediately__ into the text box. | `eq.putText('Hello World')` |
| `deleteChar` | `count` (optional) - Number of characters to be deleted. If exceeds the number of existing characters, it will simply stop after all characters are deleted. If no argument given, it will delete everything inside the text box one by one | Deletes the specified number of characters from the text box. | `eq.deleteChar();` <br> `eq.deleteChar(10)` |
| `clearText` | - | Clears the textbox __immediately__ | `tt.clearText();` |
| `settings` | [TextBoxSettings](#TextBoxSettings) | Change the settings of the Text typer | See [Settings](#settings) |
| `presetTheme` | `theme` - The theme to be applied to the textbox. See [Setting Constants](#setting-constants) | Applies a Preset Theme to the text box. | See [Setting Constants](#setting-constants) |
| `eventQueue` | - | Initializes and returns the Event Queue to obtain the ability to chain events | `const eq = tt.eventQueue();` |

<br>

# Settings

This module comes with several settings that you can set to customize the behavior and look of the cursor.

First, familiarize yourself with format of the settings javascript object:

* ## CursorSettings
```javascript
{ blinkMode, blinkPeriod, cursorStyling }
```
| Property | Description |
|-|-|
| `blinkMode` | A string constant. Will determine the cursor blinking behavior. Explained in [Setting Constants](#setting-constants) |
| `blinkPeriod` | Time taken to complete one cycle of blinking (dissapear and reappear of Cursor), in milliseconds. |
| `cursorStyling` | A string constant. Will style the cursor. Explained in [Setting Constants](#setting-constants) |

<br>

* ## TextBoxSettings
```javascript
{ typeCPS, deleteCPS, cursorSettings }
```

| Property | Description |
|-|-|
| `typeCPS` | Number. Characters per second for typing |
| `deleteCPS` | Number. Characters per second for deleting |
| `cursorSettings` | [CursorSettings Object](#cursorsettings) |

<br><br>

# Setting Constants
Constants to be used in settings. Accessed via static class property - `TextTyper.YOUR_CONSTANT_HERE`

1. `blinkMode` constants
    * `TextTyper.CURSOR_BLINK_FLASH` - Cursor dissapears suddenly, then reappears. Very commonly seen
    * `TextTyper.CURSOR_BLINK_LINEAR` - Cursor transitions to opacity 0 then transition to opacity 1
    * `TextTyper.CURSOR_BLINK_NONE` - Cursor will not blink at all
1. `cursorStyling` constants
    * `TextTyper.CURSOR_STYLE_BLOCK` - Cursor appear as a rectangular, filled block
    * `TextTyper.CURSOR_STYLE_I` - Cursor appear capital i shaped
    * `TextTyper.CURSOR_STYLE_LEFTARR` - Cursor appear as <
    * `TextTyper.CURSOR_STYLE_NONE` - Cursor becomes invisible
    * `TextTyper.CURSOR_STYLE_VERT` - Cursor appear | shaped
    * `TextTyper.CURSOR_STYLE_Y` - Cursor appear capital i shaped, but top and buttom is curved
    * `TextTyper.CURSOR_STYLE__` - Cursor appear as underscore shaped, _
1. `presetTheme` constants
    * `TextTyper.TBOX_THEME_DARK` - Dark background green text
    * `TextTyper.TBOX_THEME_DEFAULT` - Default theme

<br><br>

# Extensions

You can extend the functionality of this module through extensions!

1. [Sound Extension](https://www.npmjs.com/package/text-typer-ext-sound)