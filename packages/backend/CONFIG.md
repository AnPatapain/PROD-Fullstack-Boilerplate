# Backend Configuration

This document provides an overview of the backend configuration.

## TypeScript Configuration

### tsconfig.json

This is the main TypeScript configuration file for the backend package.

**Settings:**
- **target**: ESNext - Use the latest ECMAScript features.
- **module**: ESNext - Use the latest module system for modern ES module support.
- **strict**: Enable strict type checking.
- **esModuleInterop**: Allow import of CommonJS modules using `import` keyword.
- **skipLibCheck**: Skip type checking of declaration files (`*.d.ts`) to improve compilation speed.
- **forceConsistentCasingInFileNames**: Ensure consistent casing in file names to avoid issues on case-sensitive file systems.

**ts-node Settings:**
- **esm**: Enable ECMAScript modules in ts-node.
- **experimentalSpecifierResolution**: Use Node's experimental specifier resolution algorithm.
- **transpileOnly**: Transpile code without type checking to improve performance.

*Why we need ts-node settings:* On development environment, we don't 
precompile typescript to javascript but use `ts-node` to JIT transpile Typescript into
Javascript.
### tsconfig.build.json

This configuration file extends the base `tsconfig.json` and adds specific settings for 
building the project for production (transpile typescript
to javascript).

**Settings:**
- **module**: ESNext - Use ESNext as the target module system for the compiled JavaScript code.
- **outDir**: `./dist` - Output compiled JavaScript files to the `dist` folder.
- **baseUrl**: Set the dir context, used by paths options bellow,
- **paths**: `{
  "@app/models/src/*": ["../models/src/*"],
  ...
  }` In backend/package.json because we specified the dependencies on '@app/models' and '@app/shared', pnpm will treat them as 
they are 3rd node_modules package (in fact pnpm just creates a symlink from node_modules to their location). In development env,
it's ok, but when it comes to transpile to JS for production, `tsc` still thinks they are actual 3rd node_modules package so
the error ERR_MODULE_NOT_FOUND will be raised. So we install a package called `tsconfig-paths` that loads the 'custom' paths at run time.
To make `tsconfig-paths` work we need to config the `paths` options that map the custom path to actual path and then used this command to
run the transpiled javascript file: `ts-node --project tsconfig.build.json -r tsconfig-paths/register dist/backend/src/server.js`

## Author
**Ke An Nguyen**
