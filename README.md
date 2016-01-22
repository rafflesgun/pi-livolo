# Getting Pi-Livolo with Node.js

It's designed to integrate with Node.js.

# Build instructions
First... get the code:
```
> git clone https://github.com/rafflesgun/pi-livolo.git
```

## Step 1:  Install node-gyp
This is required for building all the C++ example projects, including the addons.

```
> npm install -g node-gyp
```

## Step 2:  Build the examples

### If you have grunt installed
Just type:

```
> npm install        
```
which installs the web and grunt build dependencies... and then
```
> grunt              
```
which build the C++ examples.   If you want to remove the build artifacts (clean), just type:
```
> grunt cleanup
```

### If you don't want to use grunt
Just type `npm install` 
