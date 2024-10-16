/**
 * post-backend-build.cjs
 * For building backend, we specify the target module is ESNext in
 * packages/backend/tsconfig.build.json. Using ESNext, the compiled
 * codes in javascript use import keyword without extension '.js'
 * for local import, which causes the module resolution errors.
 *
 * This file make a post build script to add extension .js to compiled javascript file
 *
 * Author: Ke An Nguyen
 */

const fs = require('fs');
const path = require('path');

const ALLOWED_EXTENSION = [
    '.json',
]

function addJsExtensions(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            addJsExtensions(fullPath);
        } else if (path.extname(file) === '.js') {
            const data = fs.readFileSync(fullPath, 'utf8');
            const result = data.replace(/(from\s+['"])((?:\.\.?\/)+)(.*?)(['"])/g, (match, p1, p2, p3, p4) => {
                const importPath = path.join(dir, p2 + p3);

                // Check if the import path refers to a directory with an index.js file
                if (fs.existsSync(importPath) && fs.statSync(importPath).isDirectory()) {
                    if (fs.existsSync(path.join(importPath, 'index.js'))) {
                        return `${p1}${p2}${p3}/index.js${p4}`;
                    }
                }

                // Get the extension
                const extension = path.extname(p3);
                console.log(`extension: ${extension}`);
                // Only add .js extension if it doesn't already end with .js
                if (!ALLOWED_EXTENSION.includes(extension)) {
                    return `${p1}${p2}${p3}.js${p4}`;
                }
                return match;
            });
            fs.writeFileSync(fullPath, result, 'utf8');
        }
    });
}

const scriptDir = path.resolve(__dirname);
const rootDir = path.join(scriptDir, '../..');
const targetDir = path.join(rootDir, 'packages/backend/dist');

addJsExtensions(targetDir);

