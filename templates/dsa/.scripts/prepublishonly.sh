set -e

npm run test:coverage
npm run lint:fix
npm run build
