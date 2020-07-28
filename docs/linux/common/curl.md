# curl

cURL 是一个利用 URL 语法在命令行下工作的文件传输工具，可以用来直接请求 Web 服务器，其名字就是客户端（client）的 URL 工具的意思。

`curl` 命令可以直接放到 `postman` 使用，`postman` 也支持 `curl` 的请求方式。

## 请求方法

默认的请求方法为 GET，你可以通过 `-X` 参数指定 HTTP 请求的方法。

```bash
curl -X POST https://www.example.com
```

## 请求参数

对于 GET 方法，想要传递参数的话可以直接添加在 URL 上面。另外，我们也可以使用 `-d` 参数来发送 POST 请求的数据体。

使用 `-d` 参数以后，HTTP 请求会自动加上标头 `Content-Type : application/x-www-form-urlencoded`，并且会自动将请求转为 POST 方法。

```bash
curl -d 'user=account＆password=123' https://example.com/login
# 或者
curl -d 'user=account' -d 'password=123' https://example.com/login
# 或者读取本地文本文件（data.txt）的数据发送给服务器
curl -d '@data.txt' https://example.com/login
```

与 `-d` 参数类似的还有 `--data-urlencode` 参数，区别在于后者会自动将发送的数据进行 URL 编码。

需要注意的是，如果再加上 `-G` 参数，那么会取消上面的默认行为，所有的参数会自动拼接在 URL 上，然后发送一个 GET 请求。

## 设置请求头

结合 -H 参数可以添加 HTTP 请求的标头。

```bash
curl -d '{"login": "emma", "pass": "123"}' -H 'Content-Type: application/json' https://example.com/login
```

在上面的示例中添加 HTTP 请求的标头是 `Content-Type: application/json`，并用 `-d` 参数发送 JSON 数据。

如果想要设置多个标头信息可以多次使用 `-H` 参数。

## 操作 Cookie

使用 `-c` 参数可以将服务器设置的 Cookie 写入一个文件。

```bash
curl -c cookies.txt https://www.example.com
```

同时，也使用 `-b` 参数向服务器发送 Cookie。

```bash
curl -b 'foo1=bar;foo2=bar2' https://example.com
# 或者读取本地文件（cookies.txt， 其中是通过 -c 写入的服务器设置的 Cookie）里面的内容将其发送到服务器
curl -b cookies.txt https://www.example.com
```

## 上传二进制文件

通过 `-F` 参数可以向服务器上传二进制文件。

```bash
curl -F 'file=@photo.png' https://example.com/profile
```

在上面的示例中会自动给 HTTP 请求加上标头 `Content-Type: multipart/form-data`，然后将文件 `photo.png` 作为 `file` 字段上传。

你可以手动以指定 MIME 类型，否则默认为 `application/octet-stream`。

```bash
curl -F 'file=@photo.png;type=image/png' https://example.com/profile
```

## 常用参数

| 选项 | 说明 | 案例 |
| :-- | :-- | :-- |
| -O | 将服务器回应保存成文件，并将 URL 的最后部分当作文件名 | `curl -O <url>` |
| -I | 发出 HEAD 请求，并打印返回的 HTTP 标头 | `curl -I <url>` |
| -A | 指定客户端的用户代理标头 | `curl -A <user_agent> <url>` |
| -S | 只输出错误信息 | `curl -S <url>` |
| -L | 跟随服务器的重定向 | `curl -L <url>` |
| -o | 将服务器的回应保存成文件 | `curl -o <file_name> <url>` |
| -i | 打印出服务器回应的 HTTP 标头 | `curl -i <url>` |
| --limit-rate | 限制 HTTP 请求和回应的带宽 | `curl --limit-rate 200k <url>` |
| -x | 指定 HTTP 请求的代理 | `curl -x <proxy_url> <url>` |
| -k | 跳过 SSL 检测 | `curl -k <url>` |
| -e | 设置 HTTP 头的 Referer | `curl -e <referer_url> <url>` |
| -s | 不输出错误和进度信息 | `curl -s <url>` |
| -u | 设置服务器认证的用户名和密码 | `curl -u '<usr>:<password>' <url>` |
| -v | 输出通信的整个过程 | `curl -v <url>` |

## 获取命令

使用下面封装的方法，你可以很快的根据自己的需要获得相应的 cURL 命令。

```js
const _ = require('lodash')

/**
 * Constructs a body string for use inside --data
 * @param  {object} options Object with headers, etc. (fetch format)
 * @return {string} cURL command data string
 */
function bodyToDataString(options) {
  let parsedData
  try {
    parsedData = JSON.parse(options.body)
  } catch (e) {
    // fall back to original body if it could not be parsed as JSON
    parsedData = options.body
  }

  // return an ampersand delimited string
  const headers = _.get(options, 'headers')
  const contentType = _.toLower(_.get(headers, 'content-type') || _.get(headers, 'Content-Type'))
  if (contentType === 'application/x-www-form-urlencoded') {
    if (typeof parsedData === 'string') {
      return parsedData
    } else {
      return Object.entries(parsedData)
        .map(([key, val]) => `${key}=${val}`)
        .join('&')
    }
  } else {
    return JSON.stringify(parsedData)
  }
}

/**
 * Builds a curl command and returns the string.
 * @param  {string} url  Endpoint
 * @param  {object} options bject with headers, etc. (fetch format)
 * @return {string} cURL command
 */
function curlString(url, options) {
  const method =
    options && options.method && typeof options.method === 'string'
      ? options.method.toUpperCase()
      : 'GET'

  const hasHeaders = options && options.headers && typeof options.headers === 'object'
  const hasBody = options && options.body

  let curl = `\ncurl --request ${method} \\\n--url '${url}'`

  if (hasHeaders) {
    curl +=
      ' \\\n' +
      Object.entries(options.headers)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `--header '${key}: ${value}'`)
        .join(' \\\n')
  }

  if (hasBody) {
    curl += ` \\\n--data '${bodyToDataString(options)}'`
  }

  return curl
}

function getCommandStr(url, method, headers, body) {
  const str =
    curlString(url, {
      method,
      headers,
      body,
    }) + '\n'

  return str
}
```

之后，就可以将得到的命令交给 `sh` 执行了。

## 参考

- [curl 的用法指南 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/09/curl-reference.html)
- [整理几个超实用的前端提效 shell 命令](https://mp.weixin.qq.com/s/YIpdCXMOwge_0N9prJr5ZA)
