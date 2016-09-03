# yog2-react-dva-demo

## [dva是什么?](https://github.com/dvajs/dva/issues/1)  

> dva 是基于现有应用架构 (redux + react-router + redux-saga 等)的一层轻量封装，没有引入任何新概念，全部代码不到 100 行。

> dva 是 framework，不是 library，类似 emberjs，会很明确地告诉你每个部件应该怎么写，这对于团队而言，会更可控。

> 另外，除了 react 和 react-dom 是 peerDependencies 以外，dva 封装了所有其他依赖。dva 实现上尽量不创建新语法，而是用依赖库本身的语法，比如 router 的定义还是用 react-router 的 JSX 语法的方式(dynamic config 是性能的考虑层面，之后会支持)。他最核心的是提供了 app.model 方法，用于把 reducer, initialState, action, saga 封装到一起

## 使用体验

代码结构:

```
├── README.md
├── client
│   ├── components                              # 项目组件
│   │   ├── MainLayout
│   │   └── Users
│   ├── models                                  # 数据模型
│   │   └── users.js
│   ├── package.json
│   ├── page                                    
│   │   ├── client.js
│   │   ├── client.less
│   │   ├── index.tpl                           # 入口文件
│   │   └── router.js                           # 路由配置
│   ├── routes                                  # 路由组件（页面纬度）
│   │   ├── HomePage.jsx
│   │   ├── HomePage.less
│   │   ├── NotFound.jsx
│   │   ├── NotFound.less
│   │   ├── Users.jsx
│   │   └── Users.less
│   ├── services                                # 数据接口
│   │   └── users.js
│   ├── static
│   │   └── js
│   └── utils                                   # 工具函数
│       └── request.js
├── fis-conf.js
├── jsconfig.json
├── package.json
└── server
    ├── action
    │   ├── about.js
    │   ├── api
    │   └── index.js
    ├── lib
    │   ├── reactRenderAction.js
    │   └── redis.js
    ├── model                                   # 数据处理
    │   ├── index.js
    │   └── users.js                            
    └── router.js                               # 后端路由
```
