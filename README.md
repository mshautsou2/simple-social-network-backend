# Project configuration
## Setup eslint
1. ```yarn add -D eslint typescript```
## Configure vscode 
Add this code snippet to your vscode settings.json
```
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
```
[guide](https://daveceddia.com/vscode-use-eslintrc/#:~:text=Configure%20VSCode%20Settings%20to%20use%20ESLint%20for%20Formatting&text=Click%20that%20tiny%20icon%20in,paper%20with%20a%20little%20arrow.&text=The%20first%20one%20turns%20on,it%2C%20we're%20done.)

## Install Koa

## How to configure absolute pathes

1. Update tsconfig.json
tsconfig.json
```
      "baseUrl": "./",
      "paths": {
        "@src/*": [
          "./src/*"
        ],
      }
```
2. Add tsconfig-paths dependency
```
yarn add -D tsconfig-paths
```

3. Update nodemon script

package.json
```
nodemon -e ts,js --exec ts-node -r tsconfig-paths/register src/index.ts
```
# Issues
1. eslint doesn't work