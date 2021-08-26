set -e

npm run build:clean
npm rebuild
npm test
