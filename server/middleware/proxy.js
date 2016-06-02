import http_proxy from 'http-proxy';
// import Promise from 'bluebird';
// Promise.promisifyAll(proxy);
const proxy = http_proxy.createProxyServer({});

// ref: http://crocodillon.com/blog/asynchronous-callbacks-in-koa
export default function proxy_middleware(to) {
  return async (ctx, next) => { 
    await new Promise((resolve, reject) => {
      ctx.res.on('close', () => {
        reject(new Error(`Http response closed while proxying ${ctx.url} to ${to}`));
      });
      ctx.res.on('finish', () => {
        resolve();
      })
      proxy.web(ctx.req, ctx.res, { target: to }, e => {
        reject(e);
      });
    });
  };
}
