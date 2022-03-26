# 从输入 URL 到页面展示，你都知道些什么

如果要说从输入 URL 到页面渲染完成都发生了什么？较起真来，估计少有人能说的明白。因此，不妨先说说这其中你都知道些什么，你又应该知道些什么。

## 前置知识

在开始之前先来了解一点基础知识。

### 互联网是如何工作的

当两台电脑需要通信的时候，你必须要连接他们，无论通过有线方式还是无线方式。

电脑之间不能两两之间直接互联，否则电脑的数量增加时会变得极其复杂，所以网络上的每台电脑需要链接到一个叫做路由器的特殊小电脑。

互联网之大，非一两个路由器接得下。因此，我们把电脑连接到路由器， 接着路由器连接路由器，我们就会有无穷的规模。

当然，要真正的在互联网中穿梭还需要利用通信设备和线路将地理位置不同的、功能独立的多个计算机系统连接起来，以功能完善的网络软件实现网络的硬件、软件及资源共享和信息传递。

这里的这些通讯设备通常都由一些 ISP 来提供。

### 浏览器是什么

网页浏览器（英语：Web Browser，常简称为浏览器）是一种用于检索并展示万维网信息资源的应用程序。

目前，网页浏览器主要用于使用万维网，但也可用于获取专用网络中网页服务器之信息或文件系统内之文件。

## URL 的处理

当我们在浏览器的地址栏中输入网址时，浏览器就开始在智能地匹配可能的 URL 了。

通常，浏览器会从历史记录，书签等地方，找到与已经输入的字符串匹配的 URL，然后列出提示，让你可以快速补全 URL 地址。

当你回车确认的时候，浏览器会先判断你输入的是一个合法的 URL 还是一个待搜索的关键词，并根据你输入的内容进行自动完成（比如：添加协议）、字符编码等操作。

针对一个合法的 URL，接着会检查其是否命中强缓存或是像 [ServiceWorker][serviceworker] 等无需发送请求的缓存。

如果命中则直接使用本地资源，否则就准备发送请求获取网络资源。

### URL 是什么

通常，我们使用一个字符串来标识某一互联网的资源，该字符串也就是统一资源标识符（英语：Uniform Resource Identifier，缩写：URI），它允许用户对网络中（一般指万维网）的资源通过特定的协议进行交互操作。

URI 的最常见的形式是统一资源定位符（URL）和统一资源名称（URN），其中统一资源名（URN）如同一个人的名称，而统一资源定位符（URL）代表一个人的住址。

所以说，URL 其实是一种 URI，它标识一个互联网资源，并指定对其进行操作或获取该资源的方法。

### URL 的结构

统一资源定位符（英语：Uniform Resource Locator，缩写：URL）的语法是一般的，可扩展的，它使用 ASCII 的一部分来表示因特网的地址。

通常，以一个计算机网络所使用的网络协议开始，其标准格式如下：

`[协议类型]://[服务器地址]:[端口号]/[资源层级UNIX文件路径][文件名]?[查询]#[片段ID]`

完整格式如下：

`[协议类型]://[访问资源需要的凭证信息]@[服务器地址]:[端口号]/[资源层级UNIX文件路径][文件名]?[查询]#[片段ID]`

其中访问凭证信息、端口号、查询、片段 ID 都属于选填项。

对于我们常见的网址而言，由于绝大多数网页内容都是超文本传输协议文件，所以网页中 `https://` 的部分可以省略。同时，**“80”** 作为超文本传输协议文件的常用端口号，因此一般也不必写明。

## 检查 HSTS 预加载列表

HSTS（ HTTP Strict Transport Security ）是国际互联网工程组织 IETE 正在推行一种新的 Web 安全协议，作用是强制客户端（如浏览器）使用 HTTPS 与服务器创建连接。

支持此协议的浏览器，在输入 URL 后会检查自带的 HSTS 预加载列表，若网站在这个列表里，浏览器会返回码为 307，并自动跳转使用 HTTPS 协议进行访问。

比如，输入 <http://baidu.com/> 将会跳转到 <https://baidu.com/>。

而不支持 HSTS 的浏览器会照常访问我们的网站，不会产生跳转。

对于谷歌浏览器，你可以在 `chrome://net-internals/#hsts` 检查对应的主机是否在这个列表中。

### HSTS 有什么作用

HSTS 可以用来抵御 SSL 剥离攻击。

SSL 剥离攻击是中间人攻击的一种，主要做法是阻止浏览器与服务器创建 HTTPS 连接。它的前提是用户很少直接在地址栏输入 `https://`，而总是通过点击链接或 `3xx` 重定向，从 HTTP 页面进入 HTTPS 页面。

这样，攻击者就可以在用户访问 HTTP 页面时替换所有 `https://` 开头的链接为 `http://`，达到阻止使用 HTTPS 的目的。

HSTS 可以很大程度上解决 SSL 剥离攻击，因为只要浏览器曾经与服务器创建过一次安全连接，之后浏览器会强制使用 HTTPS，即使链接被换成了 HTTP。

另外，如果中间人使用自己的自签名证书来进行攻击，浏览器会给出警告，但是许多用户会忽略警告。HSTS 解决了这一问题，一旦服务器发送了 HSTS 字段，将不再允许用户忽略警告。

### 如何开启 HSTS

服务器开启 HSTS 的方法是，当客户端通过 HTTPS 发出请求时，在服务器返回的超文本传输协议（HTTP）响应头中包含 `Strict-Transport-Security` 字段（非加密传输时设置的 HSTS 字段无效）。

比如，当请求一个网址时的返回头部中包含以下信息：

`Strict-Transport-Security: max-age=31536000; includeSubDomains`

这意味着：

- 在接下来的 31536000 秒（即一年）中，浏览器向该网站或其子域名发送 HTTP 请求时，必须采用 HTTPS 来发起连接。
- 在接下来的一年中，如果该网站发送的 TLS 证书无效，用户不能忽略浏览器警告继续访问网站。

### HSTS 有什么缺点

用户首次访问某网站是不受 HSTS 保护的。这是因为首次访问时，浏览器还未收到 HSTS，所以仍有可能通过明文 HTTP 来访问。

目前，解决这个不足当前有两种方：

- 浏览器预置 HSTS 域名列表，Google Chrome、Firefox、Internet Explorer 和 Microsoft Edge 实现了这一方案。
- 将 HSTS 信息加入到域名系统记录中。但这需要保证 DNS 的安全性，也就是需要部署域名系统安全扩展。

另外，由于 HSTS 会在一定时间后失效（有效期由 max-age 指定），所以浏览器是否强制 HSTS 策略取决于当前系统时间。

部分操作系统经常通过网络时间协议更新系统时间，如 `Ubuntu` 每次连接网络时、`OS X Lion` 每隔 9 分钟会自动连接时间服务器。攻击者可以通过伪造 NTP 信息，设置错误时间来绕过 HSTS。

解决方法是认证 NTP 信息，或者禁止 NTP 大 幅度增减时间。比如 `Windows 8` 每 7 天更新一次时间，并且要求每次 NTP 设置的时间与当前时间不得超过 15 小时。

## DNS 解析

前面，URL 中的服务器地址部分已经标注了网络资源所在的位置，通常这部分都是被指定为能被人们容易记住的域名。

然而，在互联网上的每一个网络和每一台主机被分配实际是一个数字的 IP 地址，以屏蔽物理地址的差异。

所以，现在要正确的获取到网络中的资源，我们需要完成从域名到 IP 地址的转换。通常，这部分工作由 DNS（Domain Name System， 域名系统）来完成。

也许，之前已经做过这样的事情了，存在一些缓存信息。

### 查找顺序

通常的查找顺序为： 浏览器缓存 --> 操作系统缓存 --> 本地 host 文件 --> 路由器缓存 --> ISP DNS 缓存 --> 顶级 DNS 服务器/根 DNS 服务器。

- 浏览器首先检查自己的缓存。

浏览器缓存域名对大小和时间都是有限制的，通常情况下为几分钟到几小时不等。

如果缓存时间太长，缓存的域名对应的 IP 发生变化后不能及时获取，导致无法访问。如果时间设置太短，会导致用户每次访问网站都要重新解析一次域名。

对于谷歌浏览器，你可以在 [chrome://net-internals/#dns][flush-dns] 处清除 DNS 缓存。

- 如果在用户的浏览器缓存中没有找到，浏览器会查找操作系统中的 DNS 缓存。

对于 `Windows` 而言，你可以通过下面的命令清除 DNS 解析程序缓存。

```bash
ipconfig /flushdns
```

或者使用下面的命令显示 DNS 解析程序缓存的内容。

```bash
ipconfig /displaydns
```

- 接着，会搜索操作系统的 `hosts` 文件。

在 `Windows` 系统中，对应文件存在于 `C:\Windows\System32\drivers\etc\hosts`。

按照文件中的格式，你可以将任何域名解析到任何能够访问的 IP 地址。

- 然后是检查路由器缓存。

- ISP DNS 缓存。

如果前面的搜索都没有命中，操作系统就会把域名发送给我们在网络配置中设置的"DNS 服务器地址"，也就是本地区的域名服务器，通常是提供给你接入互联网的应用提供商。

这个专门的域名解析服务器性能很好，一般都会缓存域名解析结果。当然缓存时间是受域名的失效时间控制的，一般缓存空间不是影响域名失效的主要因素。

- LDNS 从询问根 DNS 服务器开始一波迭代查询，直到获取到最终的结果。

### 迭代查询和递归查询

假如我们需要访问 <www.google.com/>，在第六步中：

1. LDNS 将请求转发到互联网上的根域（即一个完整域名最后面的点，通常省略不写）。根域只知道顶级域（com）的存在，所以会返回顶级域的服务器 IP 地址。
2. LDNS 根据返回的 IP 地址，再向顶级域发送请求。而顶级域只知道二级域（google）的存在，所以会返回二级域服务器的 IP 地址。
3. LDNS 再向二级域发送请求进行查询。。。
4. 不断重复这样的过程，直到 LDNS 得到最终的查询结果，并返回到主机。

其中 LDNS 询问各级域的过程被称为迭代查询，而主机选问 LDNS 的方式被称为递归查询。

下面这张图很好的描述了这个过程：

<img :src="$withBase('/images/web/dns-parse.png')" alt="DNS resolution process">

## 建立 TCP 连接

拿到域名对应的 IP 地址之后，浏览器会以一个随机端口向服务器的对应端口（缺省值：80）发起 TCP 的连接请求，也就是开始经常所说的 TCP 三次握手。

### 基础知识

常见标识符：

- **ACK** — 为 1 表示确认号字段有效；
- **SYN** — 为 1 表示这是连接请求或是连接接受请求，用于创建连接和使顺序号同步；
- **FIN** — 为 1 表示发送方没有数据要传输了，要求释放连接。

状态编码：

| 状态编码 | 描述 | 客户端/服务端 |
| :-- | :-- | :-- |
| LISTEN | 侦听状态。服务器等待从任意远程 TCP 端口的连接请求。 | S |
| SYN-SENT | 客户在发送连接请求后等待匹配的连接请求。通过 connect()函数向服务器发出一个同步（SYNC）信号后进入此状态。 | C |
| SYN-RECEIVED | 服务器已经收到并发送同步（SYNC）信号之后等待确认（ACK）请求。 | S |
| ESTABLISHED | 服务器与客户的连接已经打开，收到的数据可以发送给用户。数据传输步骤的正常情况。此时连接两端是平等的。这称作全连接。 | S&C |
| FIN-WAIT-1 | （服务器或客户）主动关闭端调用 close（）函数发出 FIN 请求包，表示本方的数据发送全部结束，等待 TCP 连接另一端的 ACK 确认包或 FIN&ACK 请求包。 | S&C |
| FIN-WAIT-2 | 主动关闭端在 FIN-WAIT-1 状态下收到 ACK 确认包，进入等待远程 TCP 的连接终止请求的半关闭状态。这时可以接收数据，但不再发送数据。 | S&C |
| CLOSE-WAIT | 被动关闭端接到 FIN 后，就发出 ACK 以回应 FIN 请求，并进入等待本地用户的连接终止请求的半关闭状态。这时可以发送数据，但不再接收数据。 | S&C |
| CLOSING | 在发出 FIN 后，又收到对方发来的 FIN 后，进入等待对方对己方的连接终止（FIN）的确认（ACK）的状态。少见。 | S&C |
| LAST-ACK | 被动关闭端全部数据发送完成之后，向主动关闭端发送 FIN，进入等待确认包的状态。 | S&C |
| TIME-WAIT | 主动关闭端接收到 FIN 后，就发送 ACK 包，等待足够时间以确保被动关闭端收到了终止请求的确认包。【按照 RFC 793，一个连接可以在 TIME-WAIT 保证最大四分钟，即最大分段寿命（maximum segment lifetime）的 2 倍】 | S/C |
| CLOSED | 完全没有连接。 | S&C |

### 三次握手

最开始，服务器 TCP 进程创建传输控制块 TCB，此时服务器就进入了 LISTEN（监听）状态，等待从任意远程 TCP 端口到来的连接请求；

第一次握手：

客户端 TCP 进程同样先创建传输控制块 TCB，然后向服务器发出连接请求报文。此时报文首部中的同部位 `SYN=1`，同时选择一个初始序列号 `seq=x`。

此后 TCP 客户端进程进入了 SYN-SENT（同步已发送状态）状态。TCP 规定，SYN 报文段（SYN=1 的报文段）不能携带数据，但需要消耗掉一个序号。

第二次握手：

TCP 服务器收到请求报文后，如果同意连接，则发出确认报文。确认报文中应该包含标志符 `ACK=1，SYN=1`，确认号是 `ack=x+1`，同时也要为自己初始化一个序列号 `seq=y`。

此后，TCP 服务器进程进入了 SYN-RCVD（同步收到）状态。这个报文也不能携带数据，但是同样要消耗一个序号。

第三次握手：

客户端 TCP 进程收到确认后，还需要向服务器给出确认。确认报文的包含 `ACK=1，ack=y+1`，以及自己的序列号 `seq=x+1`。

此时，TCP 连接建立，客户端进入 ESTABLISHED（已建立连接）状态。TCP 规定，ACK 报文段可以携带数据，但是如果不携带数据则不消耗序号。

当服务器收到客户端的确认后也进入 ESTABLISHED 状态，此后双方就可以开始通信了。

<img :src="$withBase('/images/web/tcp-connection.jpg')" alt="TCP connection">

### 为什么 TCP 客户端最后还要发送一次确认呢

换句话说，为什么需要第三次握手？

**防止已经失效的连接请求报文突然又传送到了服务器，从而产生错误。**

如果使用的是两次握手建立连接，假设有这样一种场景：

客户端项服务端发送了第一个连接请求，由于种种原因，该请求滞留在了网络结点中。此时，客户端迟迟没有收到确认报文，以为请求已经丢失了，就会重新向服务器发送这条报文。

第二次连接请求很顺利，很快客户端和服务器就经过第二次请求完成了连接、传输数据，然后关闭连接。

此时此前滞留的那一次请求连接，网络通畅后到达了服务器。本来，这个报文已经不需要了，因为所有的事情已经在发送的第二次连接中完成了。但是，两次握手的机制将会让客户端和服务器再次建立连接，这将导致不必要的错误和资源的浪费。

如果采用的是三次握手，就算是第一次失效的报文传送过来了，服务端接收到了那条失效报文并做了回复，但是客户端不会再次发出确认。由于服务器收不到确认，就知道客户端并没有请求连接。

### 四次挥手

假设，这里由客户端主动发起关闭连接的请求。

第一次挥手：

客户端进程发出连接释放报文，并且停止发送数据。释放数据报文首部包含标识符 `FIN=1`，其序列号为 `seq=u`（因为连接期间通讯多次，序列号进行了累加，这里假设累加到了 u）。

此时，客户端进入 FIN-WAIT-1（终止等待 1）状态。TCP 规定，FIN 报文段即使不携带数据，也要消耗一个序号。

第二次挥手：

服务器收到连接释放报文，发出确认报文包含：`ACK=1，ack=u+1`，并且带上自己的序列号 `seq=v`（同客户端的序列号一样，连接期间进行了累加，这里假设累加到了 v）。

此时，服务端就进入了 CLOSE-WAIT（关闭等待）状态。

客户端收到服务器的确认请求后将进入 FIN-WAIT-2（终止等待 2）状态，等待服务器发送连接释放报文（在这之前还需要接受服务器发送的最后的数据）。

期间，服务器若发送数据，客户端依然要接受。这个状态还要持续一段时间，也就是整个 CLOSE-WAIT 状态持续的时间。

第三次挥手：

服务器将最后的数据发送完毕后，就向客户端发送连接释放报文包含：`FIN=1，ack=u+1`，由于在半关闭状态，服务器很可能又发送了一些数据，假定此时的序列号为 `seq=w`。

此时，服务器就进入了 LAST-ACK（最后确认）状态，等待客户端的确认。

第四次挥手：

客户端收到服务器的连接释放报文后，必须发出确认报文：`ACK=1，ack=w+1`，而自己的序列号是 `seq=u+1`。

此时，客户端就进入了 TIME-WAIT（时间等待）状态。注意此时 TCP 连接还没有释放，必须经过 2MSL（最长报文段寿命）的时间后，当客户端撤销相应的 TCB 后，才进入 CLOSED 状态。

服务器只要收到了客户端发出的确认，立即进入 CLOSED 状态。同样，撤销 TCB 后，就结束了这次的 TCP 连接。可以看到，服务器结束 TCP 连接的时间要比客户端早一些。

<img :src="$withBase('/images/web/tcp-disconnect.jpg')" alt="TCP disconnect">

### 为什么客户端最后还要等待 2MSL

MSL（Maximum Segment Lifetime），TCP 允许不同的实现可以设置不同的 MSL 值。

第一，保证客户端发送的最后一个 ACK 报文能够到达服务器，因为这个 ACK 报文可能丢失。

站在服务器的角度看来，我已经发送了 FIN + ACK 报文请求断开请求了，客户端还没有给我回应，应该是我发送的请求断开报文它没有收到，于是服务器又会重新发送一次。

等待 2MSL，客户端就能在这个时间段内收到这个重传的报文，接着给出回应报文，并且会重启 2MSL 计时器。

第二，防止类似与“三次握手”中提到了的“已经失效的连接请求报文段”出现在本连接中。

客户端发送完最后一个确认报文后，在这个 2MSL 时间中，就可以使本连接持续的时间内所产生的所有报文段都从网络中消失。这样新的连接中不会出现旧连接的请求报文。

### 为什么建立连接是三次握手，关闭连接确是四次挥手呢

建立连接的时候， 服务器在 LISTEN 状态下，收到建立连接请求的 SYN 报文后，把 ACK 和 SYN 放在一个报文里发送给客户端。

而关闭连接时，服务器收到对方的 FIN 报文时，仅仅表示对方不再发送数据了，但是还能接收数据。而自己也未必全部数据都发送给对方了。

因此，己方可以立即关闭，也可以发送一些数据给对方后，再发送 FIN 报文给对方来表示同意现在关闭连接，因此，己方 AC K 和 FIN 一般都会分开发送，从而导致多了一次。

## HTTP 请求

HTTP 协议（超文本传输协议，英文：Hyper Text Transfer Protocol），是用于从万维网（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。

通常，由浏览器作为 HTTP 客户端通过 URL 向 HTTP 服务端即 Web 服务器发送所有请求。Web 服务器根据接收到的请求后，向客户端发送响应信息。

假如服务器配置了 HTTP 重定向，就会返回一个重定向响应，浏览器就会根据响应，重新发送 HTTP 请求。

### 消息结构

客户端发送一个 HTTP 请求到服务器的请求消息包括以下格式：请求行（request line）、请求头部（header）、空行和请求数据四个部分组成。

<img :src="$withBase('/images/web/request-message.png')" alt="Request message">

对应的，HTTP 响应也由四个部分组成，分别是：状态行、消息报头、空行和响应正文。

<img :src="$withBase('/images/web/response-message.png')" alt="Response message">

### HTTP 的特点

- 无连接：限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
- 媒体独立的：只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过 HTTP 发送。客户端以及服务器指定使用适合的 `MIME-type` 内容类型。
- 无状态：指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

### Get 和 Post 的区别

- GET 请求中 URL 长度是有有限制的，大概在 2k-4k，不同浏览器的限制不一样，而 POST 请求参数没有限制。
- 由于 GET 请求的参数都被放置到 URL 上，所以不能用来传递敏感信息，相对来说 POST 请求更加请求。
- Get 请求的参数会被完整的保存在浏览器的历史记录中，而 POST 请求中的参数不会被保留。
- 在浏览器回退时 GET 是无害的，而 POST 会重新提交请求。
- GET 产生的 URL 可以被收藏，而 POST 的则不行。
- GET 请求通常会被浏览器缓存，而 POST 请求不会，除非手动设置。
- GET 只能支持 URL 编码，而 POST 可以支持多种编码。
- 对于参数的数据类型，GET 请求值接受 ASCII 字符，而 POST 请求没有限制。

### 301 和 302 的区别

为什么要重定向？

- 网站调整（如改变网页目录结构）；
- 网页被移到一个新地址；
- 网页扩展名改变。

究竟有什么差异？

301 和 302 状态码都表示重定向，浏览器在拿到服务器返回的这个状态码后，将自动跳转到由 `Location` 字段指定的新的 URL 地址。

用户看到的效果就是他输入的地址 A 瞬间变成了另一个地址 B。目前，两者的表现都是一致的。

不同的是，301 的重定向是永久性的，搜索引擎在抓取新内容的同时也将旧的网址替换为重定向之后的网址。对于 SEO 来说，A 链接的权重会直接传递给 B 链接。

302 的重定向是临时的重定向，搜索引擎会抓取新的内容而保留旧的网址。因为服务器返回 302 代码，搜索引擎认为新的网址只是暂时的，所以不会对重定向做缓存。

301 有什么弊端？

301 重定向有一个很重要的特性就是缓存，也就是为什么 301 叫永久重定向的原因。

举个例子，假设您通过 301 将 `me.com` 到 `you.com`。一段时间之后又决定要将 `me.com` 重定向到 `us.com`。那么后来的这个操作可能要花很长时间才能生效，因为搜索引擎会缓存原始重定向相当长的一段时间。

所以，当你要创建重定向的时候，要从长远的角度考虑，未来是否会修改这个重定向。如果不会修改，那么直接使用 301 就行。如果有可能需要修改的话，那么使用 301 重定向时，请禁止对其进行缓存。

303 和 307 有何意义？

规范中规定 302 重定向不允许修改请求方式。也就是当一个 POST 请求返回了 302 时，按照规范仍然应该使用 POST 请求打开响应头中 `Location` 中的 URI。

但各家浏览器厂商在实现的时候并没有遵守这个规范，而是使用 GET 方式访问服务端响应头中的 `Location` 中的 URI。因此，HTTP 1.1 标准规范中推出了 303 和 307。

303 规定无论原请求是 GET 还是 POST，客户端收到服务端的响应后，必须使用 GET 方法重定向到新地址。

而 307 和 302 重定向区别在于，307 约定客户端重定向之后不能改变原先的请求方法。

## 服务器处理

终于，HTTP 请求发送到了服务器。常见的 Web 服务器包括：[Apache HTTP Server][apache http server]、[Internet Information Server][iis] 以及 [NGINX][nginx]。

由于 `Nginx` 具有在高并发下保持低资源低消耗高性能和高度模块化的设计，模块编写简单，以及配置文件简洁等优点。一大部分 Web 服务器都会使用 `Nginx`，通常作为负载均衡器。

<!-- nginx 四大特点介绍和配置 -->

处理完成后，服务器将返回一个 HTTP 响应。

## 浏览器渲染

浏览器得到 HTML 后，大致会经历以下几个步骤：

1. 解析 HTML(HTML Parser)；
2. 构建 DOM 树(DOM Tree)；
3. 构建 CSS 规则树。
4. 构建渲染树(Render Tree)；
5. 根据渲染树计算每个节点的信息，进行布局。
6. 绘制渲染树(Painting)。

<img :src="$withBase('/images/web/browser-render.png')" alt="Browser render pass">

### HTML 解析

HTML 的解析不能使用常见的自顶向下或自底向上方法来进行分析。主要原因有以下几点:

- 语言本身的“宽容”特性；
- HTML 本身可能是残缺的，对于常见的残缺，浏览器需要有传统的容错机制来支持它们；
- 解析过程需要反复。比如一些如 `document.write` 这样的脚本命令会改变最终的内容。

由于不能使用常用的解析技术，浏览器创造了专门用于解析 HTML 的解析器。解析算法在 HTML5 标准规范中有详细介绍，算法主要包含了两个阶段：标记化（tokenization）和树的构建。

标记化和构建树是并行操作的，也就是说只要解析到一个开始标签，就会创建一个 DOM 节点。

<img :src="$withBase('/images/web/htmltree.gif')" alt="HTML tree">

### CSS 解析

- 根据 [CSS 词法和句法](http://www.w3.org/TR/CSS2/grammar.html) 分析 CSS 文件和 `<style>` 标签包含的内容以及属性的值；
- 每个 CSS 文件都被解析成一个样式表对象（StyleSheet object），这个对象里包含了带有选择器的 CSS 规则，和对应 CSS 语法的对象；
- CSS 解析器可能是自顶向下的，也可能是使用解析器生成器生成的自底向上的解析器。

接着，就是页面的渲染。通过遍历 DOM 节点树创建一个“渲染树”，并计算每个节点的各个 CSS 样式值。

最后，传至 GPU 进行异步渲染。

渲染树会忽略那些不需要渲染的节点，比如设置了 `display:none` 的节点。

### 渲染阻塞

当遇到一个 `script` 标签时，DOM 构建会被暂停，直至脚本加载并执行完成，然后继续构建 DOM 树。

这样做的原因是因为 JS 有可能会修改 DOM，最为经典的就是 `document.write`，这可能导致，在 JS 执行完成前，后续所有构建或资源的下载是没有必要的。

但如果 JS 依赖 CSS 样式，而它还没有被下载和构建时，浏览器就会延迟脚本执行，直至 `CSS Rules` 被构建。所以：

- CSS 会阻塞 JS 执行；
- JS 会阻塞后面的 DOM 解析。

为了避免这种情况，应该以下原则：

- CSS 资源排在 JavaScript 资源前面；
- JS 放在 HTML 最底部，也就是 `</body>` 前。

另外，如果要改变阻塞模式，可以使用 `script` 标签的 `defer` 与 `async` 属性。

### 回流

创建渲染树后，下一步就是布局（Layout），或者叫回流（Reflow）。

浏览器为了渲染部分或整个页面，计算页面元素位置和几何结构的过程就叫做回流。

什么时候会导致回流发生呢？

- 改变窗口大小；
- 改变文字大小；
- 添加/删除样式表；
- 内容的改变(用户在输入框中写入内容也会)；
- 激活伪类，如 `:hover`；
- 操作 `class` 属性；
- 脚本操作 DOM；
- 计算 `offsetWidth` 和 `offsetHeight`；
- 设置 `style` 属性。

页面上任何一个节点触发了回流，会导致它的子节点及祖先节点重新渲染。因此，回流是导致 DOM 脚本执行效率低的关键因素之一，我们需要避免产生回流。

减少回流的措施？

- 不要一条一条地修改 DOM 的样式，可以使用 `class` 或 `style.cssText`。
- 为动画的元素使用绝对定位。
- 把 DOM 离线后修改，比如：先把 DOM 给 `display:none` (有一次 Reflow)，然后你修改 100 次，然后再把它显示出来。
- 不要在循环体中反复读取元素 DOM 结点的属性。
- 避免使用 `table` 布局，可能很小的一个小改动会造成整个 `table` 的重新布局。
- 尽可能不要修改影响范围比较大的 DOM。
- 如果 CSS 里面有计算表达式，每次都会重新计算一遍，出发一次回流。

### 重绘

当盒模型的位置，大小以及其他属性，如颜色，字体等确定下来之后，浏览器便开始绘制内容，就是在重绘。

换言之，当元素改变的时候，将不会影响元素在页面当中的位置，浏览器仅仅会应用新的样式重绘此元素，此过程称为重绘。

常见的会导致重绘的属性有：

- visibility
- color
- text-decoration
- background
- background-image
- background-position
- background-repeat
- background-size
- outline
- outline-color
- outline-style
- outline-width
- border-style
- border-radius
- box-shadow

页面在首次加载时必然会经历一次回流和重绘。后续，回流一定会导致重绘，而重绘不一定会伴随回流。

## 总结

可能涉及的其它问题：

- 命中缓存的处理过程？
- 强缓存和协商缓存的区别和实现？
- DNS 的优化？
- DNS 污染？
- DNS 的预解析？
- DNS 负载均衡？
- DNS 劫持？
- 说一下超文本传输协议（HTTP）？
- 常见 HTTP 请求方法和状态码及其意义？ 200 301 302 304 401 403 404 408 500
- HTTP 和 HTTPS 有什么区别？
- `DOMContentLoaded` 事件和 `load` 事件触发的时间？

整个介绍并非严格按照流程书写，比如 HTTP 响应头本应在服务器处理部分、TCP 挥手本应在最后断开连接的部分等，或许后续会做出调整。

## 参考

- [互联网是如何工作的 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/learn/How_the_Internet_works)
- [网页浏览器 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E6%B5%8F%E8%A7%88%E5%99%A8)
- [浏览器的工作原理：现代网络浏览器幕后揭秘 - HTML5 Rocks](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
- [史上最全！图解浏览器的工作原理 - InfoQ](https://www.infoq.cn/article/CS9-WZQlNR5h05HHDo1b)
- [react-article-bucket/webkit-render-process.md at master · liangklfangl/react-article-bucket · GitHub](https://github.com/liangklfangl/react-article-bucket/blob/master/chrome-core/webCore/webkit-render-process.md)
- [从输入 URL 到页面加载的过程？如何由一道题完善自己的前端知识体系！ | Dailc 的个人主页](https://dailc.github.io/2018/03/12/whenyouenteraurl.html)
- [从输入 URL 到页面展示，你想知道些什么？ - 掘金](https://juejin.im/post/5b148a2ce51d4506965908d2)
- [[译] Google 图解：输入 URL 按下 “Enter”，Chrome 干了什么？ - 开发者头条](https://toutiao.io/posts/rxj8np/preview)
- [什么是 URL？ - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL)
- [统一资源标志符 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E6%A0%87%E5%BF%97%E7%AC%A6)
- [统一资源定位符 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E5%AE%9A%E4%BD%8D%E7%AC%A6)
- [HTTP Strict Transport Security - 安全 | MDN](https://developer.mozilla.org/zh-CN/docs/Security/HTTP_Strict_Transport_Security)
- [HTTP 严格传输安全 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/HTTP%E4%B8%A5%E6%A0%BC%E4%BC%A0%E8%BE%93%E5%AE%89%E5%85%A8)
- [网络 | Microsoft Docs](https://docs.microsoft.com/zh-cn/windows-server/networking/networking)
- [【前端词典】输入 URL 到展现涉及的缓存环节](https://mp.weixin.qq.com/s/zmUYi1IL_ZJy3t8brHtI-A)
- [DNS 解析 - 腾讯 Web 前端 IMWeb 团队社区 | blog | 团队博客](https://imweb.io/topic/55e3ba46771670e207a16bc8)
- [传输控制协议 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E4%BC%A0%E8%BE%93%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE)
- [TCP/IP 之 大明王朝邮差](https://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665513094&idx=1&sn=a2accfc41107ac08d74ec3317995955e)
- [TCP 的三次握手与四次挥手（详解+动图）\_网络\_qzcsu 的博客-CSDN 博客](https://blog.csdn.net/qzcsu/article/details/72861891)
- [HTTP 简介 | 菜鸟教程](https://www.runoob.com/http/http-intro.html)
- [我给女朋友讲编程网络系列(3)—网页重定向，301 重定向，302 重定向 - 唐沙僧 - 博客园](https://www.cnblogs.com/workest/p/3891321.html)
- [HTTP 状态码 301、302、307 的区别以及对 SEO 的影响 - 王会的博客](https://www.wanghuiblog.com/post/301-302-307-redirection/#307_Temporary_Redirect)
- [Nginx - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Nginx)
- [nginx 这一篇就够了 - 掘金](https://juejin.im/post/5d81906c518825300a3ec7ca)
- [在浏览器输入 URL 回车之后发生了什么（超详细版） - 知乎](https://zhuanlan.zhihu.com/p/80551769)
- [GitHub - skyline75489/what-happens-when-zh_CN: What-happens-when 的中文翻译，原仓库 https://github.com/alex/what-happens-when](https://github.com/skyline75489/what-happens-when-zh_CN)
- [彻底理解浏览器的缓存机制 | Heying Ye's Personal Website](https://heyingye.github.io/2018/04/16/%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/)
- [浏览器缓存机制总结 · Issue #2 · Ray1993/MyBlog · GitHub](https://github.com/Ray1993/MyBlog/issues/2)
- [渲染性能  |  Web  |  Google Developers](https://developers.google.com/web/fundamentals/performance/rendering/)
- [优化 CSS 重排重绘与浏览器性能-前端开发博客](http://caibaojian.com/css-reflow-repaint.html)
- [彻底搞懂 async & defer · Issue #8 · xiaoyu2er/blog · GitHub](https://github.com/xiaoyu2er/blog/issues/8)

[serviceworker]: https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers
[flush-dns]: chrome://net-internals/#dns
[apache http server]: https://zh.wikipedia.org/wiki/Apache_HTTP_Server
[iis]: https://zh.wikipedia.org/wiki/Internet_Information_Server
[nginx]: https://zh.wikipedia.org/wiki/NGINX
