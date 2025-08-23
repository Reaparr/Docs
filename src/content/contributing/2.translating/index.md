---
title: Translating
---

# Translating

Make Reaparr easier to use for everyone by translating it to your native language!

## Languages

All current translations are available in the [lang folder](https://github.com/Reaparr/Reaparr/tree/dev/src/WebAPI/ClientApp/src/lang) on the dev branch. To keep things organized, it is best to keep discussions related to translations in a single issue. That way translators can watch a specific issue for their preferred languages. If you have any questions or would like a quick Discord call to help you get started, then ping [@JasonLandbridge](https://github.com/JasonLandbridge).

Current language issues:

- [American English](https://github.com/Reaparr/Reaparr/discussions/166) (main language)
- [German](https://github.com/Reaparr/Reaparr/discussions/164)
- [French](https://github.com/Reaparr/Reaparr/discussions/165)

## Steps to start translating:

### Preparation

1. Ensure your preferred language isn't already in the [lang folder](https://github.com/Reaparr/Reaparr/tree/dev/src/WebAPI/ClientApp/src/lang).
2. Check the GitHub issues if someone else is already translating to your language. This is to avoid multiple people translating to the same language.
3. If not, ping [@JasonLandbridge](https://github.com/JasonLandbridge) about the language you want to translate.
    - He will create a GitHub issue for the language you're about to translate and setup Reaparr to work with the new language. You don't have to wait for this, you can continue with the next few steps.

### I know how pull requests work

1. If you know how pull requests work then fork the [dev branch](https://github.com/Reaparr/Reaparr/tree/dev) and navigate to the lang folder:
   ```bash
   [repository folder]/src/WebAPI/ClientApp/src/lang
   ```

2. Make a copy of the [en-US.json](https://github.com/Reaparr/Reaparr/blob/dev/src/WebAPI/ClientApp/src/lang/en-US.json) into the "lang" folder and rename it to your language in a code format. e.g. "nl-NL.json (Dutch), lt-LT.json (Lithuanian)".
    - See [lingohub](https://lingohub.com/developers/supported-locales/language-designators-with-regions) for language-code examples.

### I don't know how pull requests work

1. Make a copy of the [en-US.json](https://github.com/Reaparr/Reaparr/blob/dev/src/WebAPI/ClientApp/src/lang/en-US.json) and rename it to your language in a code format. e.g. "nl-NL.json (Dutch), lt-LT.json (Lithuanian)".
    - See [lingohub](https://lingohub.com/developers/supported-locales/language-designators-with-regions) for language-code examples.

### How to translate

#### Recommended way

I would highly recommend you use [BabelEdit](https://www.codeandweb.com/babeledit). This gives you a very clear overview what needs to yet be translated, if continuing from an existing translation, and it ensures the language files are formatted correctly. It is paid software however, but it has a free trial for the first 7 days without the need to enter any credit card info. When using BabelEdit, you can open the file [babel_edit.babel](https://github.com/Reaparr/Reaparr/blob/dev/src/WebAPI/ClientApp/src/lang/babel_edit.babel) and immediately have all the correct settings needed to start translating.

#### Manual way

Every language file is in a specific JSON format. It is very important that the format is maintained as is.
Let's take a look at an example:

```json [en-us.json]
{
  "general": {
    "name": "Reaparr",
    "name-version": "Reaparr - V{version}",
    "commands": {
      "cancel": "Cancel",
      "confirm": "Confirm"
    }
  }
} 
```

You see that there are many curly brackets "{" and "}", these should be ignored as they are needed for the file to be working as intended.

JSON works in key-value pairs. for example:

```json
 "name": "Reaparr"
 ```

Above you see a pair, where `"name"` is the key, and `"Reaparr"` is the value. All you need to do is translate whatever is inside of the quotation marks on the value-side, and leave the keys untouched.

Simply said, ONLY translate the text after the colon ":"!

### Done

When finished, either create a pull request or send it attached in an e-mail to [reaparr@protonmail.com](mailto:reaparr@protonmail.com?subject=[Reaparr%20Translation]).
