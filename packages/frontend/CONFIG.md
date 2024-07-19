# Frontend Configuration
This document provides the details explanation for the configurations file in frontend
package
## TypeScript Configuration
### tsconfig.json
Typically, in development environment of frontend we work
with two environment: Browser which actually runs our frontend
code and Node.js which runs the Vite dev server (the server
that serves the frontend files with HMR).  
This is the main TypeScript configuration file for the frontend package, which includes settings for both browser and Node.js environments.

**Settings:**
- **target**: Use modern JavaScript features (ES2020).
- **useDefineForClassFields**: Use 'define' for class fields.
- **lib**: Include ES2020 and DOM APIs.
- **module**: Use ESNext module system.
- **skipLibCheck**: Skip type checking of declaration files.
- **moduleResolution**: Use bundler resolution algorithm.
- **allowImportingTsExtensions**: Allow imports with .ts extensions.
- **resolveJsonModule**: Allow importing JSON files.
- **isolatedModules**: Treat each file as a module.
- **noEmit**: Do not emit output files.
- **jsx**: Use React JSX transform.
- **strict**: Enable strict type-checking.
- **noUnusedLocals**: Report unused local variables.
- **noUnusedParameters**: Report unused parameters.
- **noFallthroughCasesInSwitch**: Report fallthrough in switch cases.

**Includes:**
- `./vite.config.ts`: Includes the Vite configuration file.

**References:**
- `./tsconfig.node.json`: References the Node.js configuration file for Vite.

### tsconfig.node.json

This configuration file is specifically for the Vite development server running on Node.js.

**Settings:**
- **composite**: Enables incremental compilation.
- **skipLibCheck**: Skip type checking for `.d.ts` files.
- **module**: Use ESNext module system.
- **moduleResolution**: Use bundler module resolution algorithm.
- **allowSyntheticDefaultImports**: Allow default imports from modules without a default export.
- **strict**: Enable strict type-checking.

**Includes:**
- `./vite.config.ts`: Includes the Vite configuration file.

## Vite Configuration

### vite.config.ts

This configuration file is for Vite, a fast build tool and development server for modern web projects. It sets up Vite with React support and custom build and server options.

**Settings:**
- **plugins**:
    - `react()`: Adds support for React.
- **build**:
    - **outDir**: Specifies the output directory for the built files (`./dist`).
- **server**:
    - **port**: The Vite server listens on port `3000`.
    - **open**: Do not automatically open the browser when the server starts.
    - **host**: Bind the host to `0.0.0.0` to allow connections from every local IPv4 address.

## Author

**Ke An Nguyen**
