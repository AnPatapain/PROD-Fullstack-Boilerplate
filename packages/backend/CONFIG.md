# Backend Configuration

This document provides an overview of the TypeScript configuration files used in the backend package.

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

## Author

**Ke An Nguyen**
