/* eslint-disable */

// fis3-enable
fis.config.set('namespace', 'dva');

// 按照 react-redux 的目录规范设置源代码目录
fis.match('/client/{models,components,services,routes,utils,page}/**.{js,es,jsx,ts,tsx}', {
    parser: fis.plugin('babel-5.x', {
        sourceMaps: true,
        optional: ["es7.decorators", "es7.classProperties", "runtime", "asyncToGenerator", "es6.destructuring","es6.templateLiterals","es6.parameters","es6.spec.templateLiterals"]
    }),
    isJsXLike: true,
    isMod: true
});
// px2rem
/*fis.match('/client/**.less', {
    postprocessor: fis.plugin('px2rem', {
        baseDpr: 2,             // base device pixel ratio (default: 2)
        remVersion: true,       // whether to generate rem version (default: true)
        remUnit: 75,            // rem unit value (default: 75)
        remPrecision: 6         // rem precision (default: 6)
    })
});*/

// 启用npm管理前端组件
fis.enableNPM({
    autoPack: true
});

fis.unhook('node_modules');

fis.hook('node_modules', {
    shimProcess: false
});

// 后端配置js
fis.match('/server/**.js', {
    parser: fis.plugin('typescript', {
        module: 1,
        target: 2
    })
});



fis.media('prod').match('client/**.{js,es,ts,tsx,less,css,jsx}', {
    domain: 'http://tb1.bdstatic.com/tb/mobile/n'
}).match('client/**.{png,jpg,gif}', {
    domain: 'http://tb2.bdstatic.com/tb/mobile/n'
});


fis.media('prod').match('/client/{components,containers,actions,reducers}/**.{js,jsx}', {
    packTo: '/client/pkg/client.js'
});
fis.media('prod').match('client/**.less', {
    packTo: '/client/pkg/client.css'
});
// chrome下可以安装插件实现livereload功能
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
fis.set('livereload.port', 35729);

fis.media('debug').match('*', {
    optimizer: null,
    useHash: false,
    deploy: fis.plugin('http-push', {
        receiver: 'http://127.0.0.1:8085/yog/upload',
        to: '/'
    })
});

var uploadUrl = 'http://xx.TiebaNode.otp.baidu.com/yog/upload';
fis.media('debug-prod').match('*', {
    deploy: fis.plugin('http-push', {
        receiver: uploadUrl,
        to: '/'
    })
});
