# 内容管理系统(后端工程)
[![downloads](https://img.shields.io/github/downloads/wormhole/cms-front/total.svg)](https://github.com/wormhole/cms-front/releases)
[![forks](https://img.shields.io/github/forks/wormhole/cms-front.svg)](https://github.com/stdutil/cms-front/network/members)
[![stars](https://img.shields.io/github/stars/wormhole/cms-front.svg)](https://github.com/stdutil/cms-front/stargazers) 
[![repo size](https://img.shields.io/github/repo-size/wormhole/cms-front.svg)](https://github.com/wormhole/cms-front/archive/master.zip)
[![release](https://img.shields.io/github/release/wormhole/cms-front.svg)](https://github.com/wormhole/cms-front/releases)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/wormhole/cms-front/blob/master/LICENSE)

[内容管理系统(后端工程)传送门](https://github.com/wormhole/cms)

## 一、如何运行
### 1、安装依赖
```$xslt
npm install
```

### 2、打包
```$xslt
npm run build
```

### 3、运行
```$xslt
npm run start
```

## 二、项目结构
```$xslt
├─config
│   └─webpack.config.dev.js
├─src
│   ├─image
│   ├─module
│   │  ├─auth
│   │  │  ├─permission
│   │  │  ├─role
│   │  │  └─user
│   │  ├─config
│   │  ├─dashboard
│   │  └─personal
│   ├─page
│   │  ├─home
│   │  ├─login
│   │  └─register
│   ├─util
│   ├─index.html
│   ├─App.jsx
│   ├─app.less
│   └─store.js
├─.babelrc
└─package.json

```

## 三、功能列表
- [x] 认证授权
    - [x] 用户注册
    - [x] 用户登录
    - [x] 验证码校验
    - [x] 用户管理
    - [x] 角色管理
    - [x] 权限管理
    
- [x] 仪表盘
    - [x] 在线用户统计
    - [x] 流量统计
    - [x] cpu监控
    - [x] 内存监控
    - [x] 磁盘监控
    
- [x] 系统设置
    - [x] 标题设置
    - [x] 版权设置
    - [x] 头像设置
    - [x] 还原默认配置

- [x] 个人信息
    - [x] 基本信息修改
    - [x] 密码修改
    
##  四、演示
### 1、登录页
![登录](image/login.png)

### 2、仪表盘
![仪表盘](image/dashboard.png)

### 3、用户管理 (角色管理, 权限管理与之类似)
![用户管理](image/user.png)

### 4、角色分配 (权限分配与之类似)
![角色分配](image/grant.png)

### 5、系统设置
![系统设置](image/setting.png)

### 6、个人信息
![个人信息](image/personal.png)
