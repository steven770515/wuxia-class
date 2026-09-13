#!/bin/bash
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "找不到 node，請先安裝 Node.js 再試一次"
  echo "（按任意鍵關閉）"
  read -n 1
  exit 1
fi

echo "宗門啟示錄 啟動中..."
node server.js &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null' EXIT

sleep 1
open "http://localhost:8765"

echo ""
echo "遊戲已經在瀏覽器打開了。關掉這個視窗就會結束。"
wait $SERVER_PID
