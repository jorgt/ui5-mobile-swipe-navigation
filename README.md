# Mobile Application 

This is an empty app for a mobile application. It comes with swipe-to-navigate code, and is otherwise a complete skeleton:

- Uses modularization to keep code separate
- Uses XML views and fragments
- Uses internationalization for text components
- Uses grunt and build tools for minifying and building

## To use

This uses Node and NPM. Install Node if not available. 

Install grunt and bower, if you haven't already:

```
npm install grunt-cli bower -g
```

Clone the repository and install all components.

```
git clone https://github.com/jorgt/ui5-mobile-swipe-navigation.git 
cd ui5-mobile-swipe-navigation
npm install && bower install
```

Because you'll want to develop something on top of this, **delete** the `.git` folder in folder ui5-mobile-swipe-navigation. 

## Develop

Developments go in the `src` folder, this is your base, and all source files go in here. Test frameworks have not been set up in this skeleton yet - stay tuned...

Run this by entering `grunt serve`. This will open the app on http://localhost:8080

## Test
A few unit tests regarding the models and app are included. Use `grunt test` to run.

## Build

Run `grunt build` and watch how your app is concatenated, minified, copied to the `dist` folder. Use `grunt buildRun` to also open the app on http://localhost:8080.

## Phonegap 

This does not include packaging up with Phonegap. See the preloads and libraries to see how little files are actually loaded through `grunt build`. 