# expense-tracker
# 家庭記帳本

用 express 打造的記帳筆記本

### Features - 產品功能

1. 利用email註冊會員並且
2. 登入登出功能
3. 登入後可以新增，刪除，修改每一筆消費
4. 使用者可在首頁看到所有消費清單的總金額
5. 同步支援facebook 第三方登入

## Environment SetUp - 環境建置

[Node.js](https://nodejs.org/en/)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd expense-tracker
```

3. 安裝 npm 套件

```
npm install
```

4. 安裝 nodemon 套件

```
npm i -g nodemon 
```

5. 安裝完畢後，設定環境變數，請參照.env.example

```   
FACEBOOK_ID=SKIP
FACEBOOK_SECRET=SKIP
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
SESSION_SECRET=ThisIsMySecret
MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
PORT=3000
```

6. 利用腳本建立種子資料

```
npm run seed
```

7. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

8. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
App is running on http://localhost:3000
```

### 使用工具
- Node.js
- Express 
- MongoDB 

### 使用套件
- "bcryptjs": "^2.4.3",
- "connect-flash": "^0.1.1",
- "dotenv": "^16.3.1",
- "express": "^4.18.2",
- "express-flash": "^0.0.2",
- "express-handlebars": "^3.1.0",
- "express-session": "^1.17.3",
- "handlebars": "^4.7.7",
- "handlebars-dateformat": "^1.1.3",
- "handlebars-helpers": "^0.10.0",
- "method-override": "^3.0.0",
- "mongoose": "^7.4.1",
- "passport": "^0.6.0",
- "passport-facebook": "^3.0.0",
- "passport-local": "^1.0.0"
