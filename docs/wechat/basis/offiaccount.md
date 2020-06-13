# 微信公众号入门

微信公众平台是运营者通过公众号为微信用户提供资讯和服务的平台。

公众平台开发接口是提供服务的基础，开发者在公众平台网站中创建公众号、获取接口权限后，可以通过阅读本接口文档来帮助开发。

## 环境

- [注册微信订阅号][mp_weixin]
- [安装微信开发者工具][miniprogram_devtools]
- [sunny-ngrok][ngrok] 工具的安装和注册

对于 `sunny-ngrok`，需要首先前往其[官网][ngrok]，然后注册一个账户并登录。

点击左边栏的开通隧道，选择一个隧道进行开通（其中提供了一个免费的 Ngrok 服务器）。开通时需要填写以下信息：

- 隧道名称：普通的昵称，可随意填写
- 前置域名：服务器免费赠送的域名，填写时不要带上后缀，如需注册 `sunny.free.idcfengye.com` 只需要填写 `sunny`
- 本地端口：可以为同一个局域网内任意一台机器进行映射，只需要填对 IP 和端口就行，例如：`172.0.0.1:80`

接着前往下载页面[下载客户端][ngrok_download]（一个可执行文件），完成之后就可以执行了：

```bash
# 启动隧道
./sunny clientid <隧道_ID>
```

启动成功后，按照上面的说明，在互联网中访问 `sunny.free.idcfengye.com` 相当于访问你本机上的 80 端口。

## 验证消息的确来自微信服务器

现在登录微信公众平台官网后，在公众平台官网的开发-基本设置页面，勾选协议成为开发者，点击“修改配置”按钮。

配置服务器地址（也就是上面赠送的域名 + 接口路径）、Token（可任意填写，用作生成签名） 和 EncodingAESKey（可任意填写，将用作消息体加解密密钥）。

提交后，微信服务器将发送 GET 请求到填写的服务器地址 URL 上，GET 请求携带参数如下表所示:

- **signature** 微信加密签名，`signature` 结合了开发者填写的 `token` 参数和请求中的 `timestamp` 参数、`nonce` 参数
- **timestamp** 时间戳
- **nonce** 随机数
- **echostr** 随机字符串

开发者通过检验 `signature` 对请求进行校验，加密/校验流程如下：

- 将 `token`、`timestamp`、`nonce` 三个参数进行字典序排序
- 将三个参数字符串拼接成一个字符串进行 `sha1` 加密
- 将获得加密后的字符串与 `signature` 对比，标识该请求来源于微信

若确认此次 GET 请求来自微信服务器，就原样返回 `echostr` 参数内容，则接入生效，成为开发者成功，否则接入失败。

同时，为了方便开发，消息加密方式可以先选择明文模式。选择兼容模式和安全模式需要提前配置好相关加解密代码，详情请参考[消息体签名及加解密部分的文档][third_party_platforms]。

成为开发者后，用户每次向公众号发送消息、或者产生自定义菜单、或产生微信支付订单等情况时，开发者填写的服务器配置 URL 将得到微信服务器推送过来的消息和事件。

开发者可以依据自身业务逻辑进行响应，如回复消息。

## 申请微信公众帐号测试号

微信公众号的注册有一定门槛，某些高级接口的权限需要微信认证后才可以获取。为了快速了解和上手微信公众号开发，可以[前往][sandboxinfo]申请公众平台测试帐号。

对于得到的测试号，在配置接口配置信息时会和上面一样进行认证，你需要在你的服务器上原样返回 `echostr` 参数内容来完成配置。

```javascript
const Koa = require('koa');
const Router = require('@koa/router');
const crypto = require('crypto');

/* 配置 */
const TOKEN = 'TOKEN';

const app = new Koa();
const router = new Router();

function getSignature(nonce, token, timestamp) {
  const srotedStr = [nonce, token, timestamp].sort().join('');
  const _signature = crypto
    .createHash('sha1')
    .update(srotedStr)
    .digest('hex');
  return _signature;
}

router.get('/wechat', async ctx => {
  const { nonce, timestamp, signature, echostr } = ctx.query;
  const _signature = getSignature(nonce, TOKEN, timestamp);
  if (signature === _signature) {
    ctx.body = echostr;
  } else {
    ctx.body = '';
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(80);
```

随后扫描页面下方的测试号二维码，关注公众号，以便后续的测试。

## 接受微信消息

当普通微信用户向公众账号发消息时，微信服务器将 POST 消息的 XML 数据包到开发者填写的 URL。开发者可以在响应包（Get）中返回特定 XML 结构，来对该消息进行响。

```javascript
// ...
const getRawBody = require('raw-body');
const parseString = require('xml2js').parseStringPromise;
const ejs = require('ejs');

const TEMPLATE = `
<xml>
  <ToUserName><![CDATA[<%-toUsername%>]]></ToUserName>
  <FromUserName><![CDATA[<%-fromUsername%>]]></FromUserName>
  <CreateTime><%=createTime%></CreateTime>
  <MsgType><![CDATA[<%=msgType%>]]></MsgType>
  <Content><![CDATA[<%-content%>]]></Content>
</xml>
`;

router.post('/wechat', async ctx => {
  const { nonce, timestamp, signature } = ctx.query;
  const _signature = getSignature(nonce, TOKEN, timestamp);
  if (signature !== _signature) {
    ctx.status = 401;
    ctx.body = 'Invalid signature';
    return;
  }

  const str = await getRawBody(ctx.req, {
    length: ctx.request.headers['content-length'],
    encoding: ctx.request.charset,
  });
  const { xml: params } = await parseString(str, { trim: true });
  const replyXML = ejs.compile(TEMPLATE)({
    toUsername: params.FromUserName[0],
    fromUsername: params.ToUserName[0],
    createTime: new Date().getTime(),
    msgType: 'text',
    content: 'Hello',
  });
  ctx.body = replyXML;
});
```

回复图片（不支持 gif 动图）等多媒体消息时需要预先通过素材管理接口上传临时素材到微信服务器，可以使用素材管理中的临时素材，也可以使用永久素材。

## 获取 Access token

`access_token` 是公众号的全局唯一接口调用凭据，公众号调用各接口时都需使用 `access_token`。

开发者需要妥善保存 `access_token`，它的存储至少要保留 512 个 字符空间，有效期目前为 2 个小时，重复获取将导致上次获取的 `access_token` 失效。

```javascript
// ...
const axios = require('axios').default;
const redis = require('redis');
const { promisify } = require('util');

const HOST = '127.0.0.1';
const PORT = 6379;
const APP_ID = 'APP_ID';
const APP_SECRET = 'APP_SECRET';

const client = redis.createClient(PORT, HOST);
const HGETALL = promisify(client.HGETALL).bind(client);
const hmset = promisify(client.hmset).bind(client);

async function checkAccessToken() {
  const tokenInfo = await HGETALL('tokenCache');
  const { access_token, expires_in, updateTime } = tokenInfo || {};
  if (!access_token) {
    return false;
  }
  if (new Date().getTime() > parseInt(updateTime) + parseInt(expires_in) * 1000) {
    return false;
  }
  return true;
}

async function getAccessToken(appId, appSecret) {
  if (await checkAccessToken()) {
    const tokenInfo = await HGETALL('tokenCache');
    return tokenInfo;
  }
  const url = 'https://api.weixin.qq.com/cgi-bin/token';
  const { data } = await axios.get(url, {
    params: {
      grant_type: 'client_credential',
      appid: appId,
      secret: appSecret,
    },
  });
  const { access_token, expires_in, errmsg } = data;
  if (errmsg) {
    console.log(errmsg);
    return {};
  } else {
    const tokenInfo = {
      access_token,
      expires_in,
      updateTime: new Date().getTime(),
    };
    await hmset('tokenCache', tokenInfo);
    return tokenInfo;
  }
}
```

在这里会先读取 `redis` 中的 `access_token` 信息，如果存在且有效的话，就会直接使用现有的，否则将会通过微信提供的接口获取新的 `access_token`。

## 网页授权

如果用户在微信客户端中访问第三方网页，公众号可以通过微信网页授权机制，来获取用户基本信息，进而实现业务逻辑。

微信网页授权是通过 OAuth2.0 机制实现的，在用户授权给公众号后，公众号可以获取到一个网页授权特有的接口调用凭证（网页授权 access_token）。

通过网页授权 `access_token` 可以进行授权后接口调用，如获取用户基本信息。具体而言，网页授权流程分为四步：

1. 引导用户进入授权页面同意授权，获取 `code`
2. 通过 `code` 换取网页授权 `access_token`
3. 如果需要，开发者可以刷新网页授权 `access_token`，避免过期
4. 通过网页授权 `access_token` 和 `openid` 获取用户基本信息

在微信公众号请求用户网页授权之前，开发者需要先到公众平台官网中的“开发 - 接口权限 - 网页服务 - 网页授权 - 网页授权获取用户基本信息”的配置选项中，修改授权回调域名。

对于我们现在使用的测试账号，可以在测试号管理页面的相应位置进行配置。授权回调域名配置规范为不带 HTTP 协议的全域名（sunny.free.idcfengye.com）。

现在创建一个简单的前台页面（public/index.html）：

```html
<body>
  <div id="root">
    <h1>农府</h1>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js"></script>
  <script>
    new Vue({
      el: '#root',
      methods: {
        auth() {
          location.href = '/auth';
        },
      },
      mounted() {
        const query = Object.create(null);
        location.search
          .slice(1)
          .split('&')
          .forEach(item => {
            const tmpArr = item.split('=');
            query[tmpArr[0]] = decodeURIComponent(tmpArr[1]);
          });
        if (!query.token) {
          return this.auth();
        }
        // 把 Token 保存到 localStorage 中。也可以保存当前时间，发起请求前做一个是否过期的判断
        localStorage.setItem('token', query.token);
        // 使用了 axios 的请求拦截器，每次请求都会把 token 放到 headers 中
        axios.interceptors.request.use(config => {
          const token = localStorage.getItem('token');
          config.headers.common['Authorization'] = 'Bearer ' + token;
          return config;
        });
      },
    });
  </script>
</body>
```

为了让前台可以访问，还需要做一点小小的配置：

```javascript
const serve = require('koa-static');

app.use(serve(__dirname + '/public'));
```

然后，打开微信开发者工具，点击公众号网页。在地址栏访问静态服务器的地址（如上面的 sunny.free.idcfengye.com）。由于没有首次进入没有 Token 就会请求我们的授权接口：

```javascript
const REDIRECT_URI = 'http://sunny.free.idcfengye.com/auth_cb';

/**
 * 获取授权页面的 URL 地址
 * @param {string} redirect 授权后要跳转的地址
 * @param {string} state 开发者可提供的数据
 * @param {string} scope 作用范围
 */
function getAuthURL(appId, redirect, state, scope) {
  const url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  const info = {
    appid: appId,
    redirect_uri: redirect,
    response_type: 'code',
    scope: scope || 'snsapi_userinfo',
    state: state || '',
  };
  return `${url}?${querystring.stringify(info)}#wechat_redirect`;
}

router.get('/auth', async ctx => {
  const redirectURL = getAuthURL(APP_ID, REDIRECT_URI);
  ctx.redirect(redirectURL);
});
```

在上面的代码中，我们根据微信给定的 URL 结构拼接除了授权页面的地址，并重定向到该地址。如果用户同意授权，页面将跳转至我们指定的重定向地址：`REDIRECT_URI/?code=CODE&state=STATE`：

```javascript
// 根据授权获取到的 code 获取 access_token
async function getWEBAccessToken(code, appId, appSecret) {
  if (await checkAccessToken('webTokenCache')) {
    const tokenInfo = await HGETALL('webTokenCache');
    return tokenInfo;
  }
  const info = {
    appid: appId,
    secret: appSecret,
    code,
    grant_type: 'authorization_code',
  };
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?${querystring.stringify(info)}`;
  const { data: webTokenInfo } = await axios.get(url, {
    headers: {
      accept: 'application/json',
    },
  });
  await hmset('webTokenCache', Object.assign({ updateTime: new Date().getTime() }, webTokenInfo));
  return webTokenInfo;
}

router.get('/auth_cb', async ctx => {
  const code = ctx.query.code; // 微信回调此接口时回携带 code 参数
  const webTokenInfo = await getWEBAccessToken(code, APP_ID, APP_SECRET);
  const { openid } = webTokenInfo;
});
```

这里处理的逻辑和之前获取 `access_token` 的逻辑基本一致，首先根据拿到的 CODE 和 APP_ID 等信息获取 `access_token` 并存储在 Redis 中，下次获取前先判断是否过期。

## JWT

由于从微信获取的 `access_token` 的安全级别非常高，所以不能直接传递给客户端。因此我们需要自己维护一套登录机制，JWT 可以做到这一点。

首先，在我们设置的微信回调接口处，我们拿到登录的 `access_token` 后就可以通过调用 `jsonwebtoken` 的 `sign()` 方法来生成 `token`，然后传递给前台：

```javascript
const jwt = require('jsonwebtoken');

const TOKEN_PRIVATE_KEY = 'TOKEN_PRIVATE_KEY';

router.get('/auth_cb', async ctx => {
  // ...
  const { openid } = webTokenInfo;
  const token = jwt.sign(
    {
      openid,
    },
    TOKEN_PRIVATE_KEY,
    { expiresIn: '2h' },
  );
  ctx.redirect(`/?token=${token}`);
});
```

为了完善鉴权，可以引入 `koa-jwt` 中间件来进行验证：

```javascript
const koaJwt = require('koa-jwt');

app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = 'Protected resource, please log in first';
    } else {
      throw err;
    }
  });
});
app.use(
  koaJwt({ secret: TOKEN_PRIVATE_KEY }).unless({
    path: [/^\/$/, /^\/wechat$/, /^\/auth$/, /^\/auth_cb$/],
  }),
);
```

如此，一个简单的 JWT 认证机制就算完成了。

这里演示的只有一个用户，如果是多个用户在存储获取的 Token 信息时可以以对应的 `openid` 作为 `key`。同时用户请求时，我们也可以读取 JWT 中的内容来确认当前请求的用户。

## JSSDK

微信 JS-SDK 是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。

通过使用微信 JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力。

要使用 JS-SDK，你需要：

- 先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS 接口安全域名”
- 在页面引入相应的 JS 文件
- 通过 `config` 接口注入权限验证配置

第三部权限验证必须先通过后台拿到对应的参数，所以在前面 JWT 的基础上，如果前台已经获取到了 Token，那么就直接发送请求获取相应的参数：

```html
<body>
  <!-- .... -->
  <script src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
  <script>
    new Vue({
      el: '#root',
      methods: {
        auth() {
          location.href = '/auth';
        },
        async getJSConfig() {
          const res = await axios.get('/getJSConfig', {
            params: {
              url: location.href,
            },
          });
          console.log(res);
        },
      },
      mounted() {
        // ...
        this.getJSConfig();
      },
    });
  </script>
</body>
```

后台根据[要求][oa_web_apps_js_sdk]获取并回应，其中涉及到了 `jsapi_ticket`，和之前 `access_token` 的处理基本一直：

```javascript
// 排序并返回处理后的字符串
function raw(args) {
  let keys = Object.keys(args);
  const newArgs = {};
  keys = keys.sort();
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    newArgs[key.toLowerCase()] = args[key];
  }

  let string = '';
  const newKeys = Object.keys(newArgs);
  for (let i = 0; i < newKeys.length; i++) {
    let k = newKeys[i];
    string += '&' + k + '=' + newArgs[k];
  }
  return string.substr(1);
}

/*
 * 签名算法
 * @param {string} nonceStr随机字符串
 * @param {string} jsapi_ticket 公众号用于调用微信 JS 接口的临时票据
 * @param {string} timestamp 时间戳
 * @param {string} url 当前网页的 URL，不包含 # 及其后面部分
 */
function sign(nonceStr, jsapi_ticket, timestamp, url) {
  const ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: nonceStr,
    timestamp: timestamp,
    url: url,
  };
  const string = raw(ret);
  const retStr = crypto
    .createHash('sha1')
    .update(string)
    .digest('hex');
  return retStr;
}

// 获取 jsapi_ticket
async function getJsApiTicket() {
  if (await checkAccessToken('ticketCache')) {
    const ticketInfo = await HGETALL('ticketCache');
    return ticketInfo;
  }
  const url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket';
  const tokenInfo = await getAccessToken(APP_ID, APP_SECRET);
  const { data: ticketRet } = await axios.get(url, {
    params: {
      access_token: tokenInfo.access_token,
      type: 'jsapi',
    },
  });
  const ticketInfo = {
    access_token: ticketRet.ticket,
    expires_in: ticketRet.expires_in,
    updateTime: new Date().getTime(),
  };
  await hmset('ticketCache', ticketInfo);
  return ticketInfo;
}

router.get('/getJsConfig', async ctx => {
  // https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62
  const ticketInfo = await getJsApiTicket();
  const nonceStr = Math.random()
    .toString(36)
    .substr(2, 15);
  const jsAPITicket = ticketInfo.access_token;
  const timestamp = Math.floor(Date.now() / 1000) + '';
  const signature = sign(nonceStr, jsAPITicket, timestamp, ctx.query.url);

  ctx.body = {
    debug: false,
    appId: APP_ID,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [],
  };
});
```

前台拿到了关键信息，现在就可以开始通过 `config` 接口注入权限验证配置：

```javascript
// ...
async getJSConfig() {
  const res = await axios.get('/getJSConfig', {
    params: {
      url: location.href,
    },
  })

  wx.config({
    debug: true, // 开启调试模式
    appId: '', // 必填，公众号的唯一标识
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名
    jsApiList: [], // 必填，需要使用的JS接口列表
    ...res.data,
  })
},
```

后续通过 `ready` 接口处理成功验证，也就是说 `config` 信息验证后会自动执行 `ready` 方法。

所有接口调用都必须在 `config` 接口获得结果之后，`config` 是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在 `ready` 函数中调用来确保正确执行。

对于用户触发时才调用的接口，则可以直接调用，不需要放在 `ready` 函数中。

```javascript
wx.ready(function() {});
```

另外，你还可以通过 `error` 接口处理失败验证。

## 参考

- [什么是订阅号？](https://kf.qq.com/faq/120911VrYVrA15091832Qzqq.html?scene_id=kf3384)
- [接入概述 | 微信开放文档](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html)
- [Sunny-Ngrok 使用教程 · Sunny-Ngrok 说明文档](http://www.ngrok.cc/_book/)
- [GitHub - creeperyang/koa-xml-body: koa middleware to parse xml request body](https://github.com/creeperyang/koa-xml-body)
- [GitHub - stream-utils/raw-body: Get and validate the raw body of a readable stream](https://github.com/stream-utils/raw-body)
- [GitHub - Leonidas-from-XIV/node-xml2js: XML to JavaScript object converter.](https://github.com/Leonidas-from-XIV/node-xml2js)
- [文本消息 | 微信开放文档](https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html)
- [回复文本消息 | 微信开放文档](https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Passive_user_reply_message.html)
- [EJS -- 嵌入式 JavaScript 模板引擎 | EJS 中文文档](https://ejs.bootcss.com/)
- [Node.js 应用：Koa2 使用 JWT 进行鉴权 · Issue #28 · lin-xin/blog · GitHub](https://github.com/lin-xin/blog/issues/28)
- [JS - SDK 说明文档 | 微信开放文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

[mp_weixin]: https://mp.weixin.qq.com/
[ngrok]: https://www.ngrok.cc/
[miniprogram_devtools]: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
[ngrok_download]: https://www.ngrok.cc/download.html
[weixin_config]: https://mp.weixin.qq.com/advanced/advanced?action=dev&t=advanced/dev&token=515183795&lang=zh_CN
[third_party_platforms]: https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/Message_Encryption/Message_encryption_and_decryption.html
[sandboxinfo]: http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
[oa_web_apps_js_sdk]: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62
