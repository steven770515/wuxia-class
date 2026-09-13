// 宗門啟示錄 — 只給本機用的極簡靜態伺服器（零套件依賴）
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8765;

// 白名單：只服務這三個檔案，不可能被要求讀到資料夾裡其他東西
const FILES = {
  '/': 'index.html',
  '/index.html': 'index.html'
};

const TYPES = {
  '.html': 'text/html; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const file = FILES[url];

  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('找不到這個頁面');
    return;
  }

  fs.readFile(path.join(__dirname, file), (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('讀取檔案失敗');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] });
    res.end(data);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('連接埠 ' + PORT + ' 已經有人在用了。可能遊戲已經開著，直接到瀏覽器看 http://localhost:' + PORT);
  } else {
    console.error('啟動失敗：' + err.message);
  }
  process.exit(1);
});

// 只綁本機，外面連不進來
server.listen(PORT, '127.0.0.1', () => {
  console.log('宗門啟示錄已啟動 → http://localhost:' + PORT);
  console.log('關掉這個視窗就會結束（資料存在瀏覽器裡，不會消失）');
});
