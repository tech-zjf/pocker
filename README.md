### Pocker - 炸金花扑克游戏

### 安装依赖

```
pnpm i
```

### 前端运行

```
pnpm run start:pocker-ky
```

项目结构

```
packages
├── pocker-ky
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── .prettierrc
│   ├── env                                     #环境文件
│   │   ├── .env.beta
│   │   └── .env.prod
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── public                                  #静态文件
│   │   └── image.png
│   ├── src
│   │   ├── .DS_Store
│   │   ├── App.tsx                             #Layout页面
│   │   ├── api                                 #api接口目录
│   │   │   ├── .DS_Store
│   │   │   ├── constant.ts
│   │   │   ├── http.ts
│   │   │   ├── index.ts
│   │   │   ├── interface.ts
│   │   │   └── modules                         #api各模块目录
│   │   ├── assets
│   │   │   ├── css
│   │   │   └── images
│   │   ├── components                          #组件目录
│   │   │   ├── custom-icon
│   │   │   ├── interface.ts
│   │   │   ├── login-card
│   │   │   └── ui
│   │   ├── constants                            #全局的常量
│   │   │   └── dayjs.ts
│   │   ├── index.less
│   │   ├── libs
│   │   │   ├── .DS_Store
│   │   │   ├── hooks
│   │   │   ├── storage
│   │   │   └── tools
│   │   ├── main.tsx
│   │   ├── pages                               #页面目录
│   │   │   ├── connect-test
│   │   │   ├── home
│   │   │   ├── login
│   │   │   └── room
│   │   ├── router                              #路由目录
│   │   │   └── index.tsx
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts

```
