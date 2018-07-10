const port = 3000;  // 端口号
const dbfn = require('./data.js');  // 引入data.js
const db = dbfn();  // 通过执行data.js返回路由json
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(db)

server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.method = 'PATCH';
    }
    // setTimeout(() => next(), 1000);
    next()
})

server.use(jsonServer.rewriter({
    "/znbsyapi/:category/:resource": "/:category/:resource",
    "/znbsyapi/:category/:resource/:id": "/:category_:resource/:id",
    "/znbsyapi/:category/:resource/:sub/:id": "/:category_:resource_:sub/:id",
    "/znbsyapi/:category/:resource/:sub/:ssub/:id": "/:category_:resource_:sub_:ssub/:id",
}));


server.use(router);

server.listen(port, () => {
    console.log('JSON Server is running on', port)
})
