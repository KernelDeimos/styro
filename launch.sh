set -e
node node_modules/foam3/tools/genjs
npx electron ./src/script/boot.js
