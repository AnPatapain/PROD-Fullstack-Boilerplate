/**
 * Post build script to add extension .js to compiled javascript file
 * Author: Ke An Nguyen
 */

const fs = require('fs');
const path = require('path');

function addJsExtensions(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            addJsExtensions(fullPath);
        } else if (path.extname(file) === '.js') {
            const data = fs.readFileSync(fullPath, 'utf8');
            const result = data.replace(/(from\s+['"])(\.\/|..\/)(.*?)(['"])/g, (match, p1, p2, p3, p4) => {
                // Only add .js extension if it doesn't already end with .js
                if (!p3.endsWith('.js')) {
                    return `${p1}${p2}${p3}.js${p4}`;
                }
                return match;
            });
            fs.writeFileSync(fullPath, result, 'utf8');
        }
    });
}

const scriptDir = path.resolve(__dirname);
const rootDir = path.join(scriptDir, '..');
const targetDir = path.join(rootDir, 'packages/backend/dist');

addJsExtensions(targetDir);

