# 使用 pm2 启动 server
pm2 start ./server/src/app.js

# 启动 client
curPath=$(cd "$(dirname "$0")"; pwd)
cd "${curPath}"
cd ./client
npm run pre

cd "${curPath}"







