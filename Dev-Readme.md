# Publish new version
1. adjust code 
2. create tests
3. run `npm version <newversion> -m "<message>"` (major | minor | patch) [further see npm version](https://docs.npmjs.com/cli/version)
  
The **preversion** script runs the tests and the **postversion** script pushes the tags created by `npm version` so then the GitHub Action can run and publish the package.  
