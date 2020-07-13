# PM2

PM2 是 JavaScript 运行时 Node.js 的进程管理器。

安装：

```bash
npm install pm2@latest -g
# or
yarn global add pm2
```

## 启动程序

启动、守护和监视应用程序的最简单方法是使用以下命令行：

```bash
pm2 start app.js
```

常用选项：

| 选项                            | 描述                                                   |
| :------------------------------ | :----------------------------------------------------- |
| `--name <app_name>`             | 指定名称                                               |
| `--watch`                       | 监听文件的更改，自动重启（默认忽略 node_modules 目录） |
| `--max-memory-restart <200MB>`  | 设置应用程序重新加载的内存阈值                         |
| `--log <log_path>`              | 指定日志存放地址                                       |
| `-- arg1 arg2 arg3`             | 向脚本传递额外的参数                                   |
| `--restart-delay <delay in ms>` | 自动重新启动之间的延迟                                 |
| `--time`                        | 为日志添加时间前缀                                     |
| `--no-autorestart`              | 不自动重新启动应用程序                                 |
| `--cron <cron_pattern>`         | 指定 cron 规律，强制重启                               |
| `--no-daemon`                   | 附加到应用程序日志                                     |

## 列出托管应用程序

列出 PM2 管理的所有应用程序的状态：

```bash
pm2 [list|ls|status]
```

## 获取详细信息

要获取有关特定程序的详细信息，请执行以下操作：

```bash
pm2 show <id>
```

## 管理程序

顾名思义：

```bash
pm2 restart app_name
pm2 stop app_name
pm2 delete app_name
```

## 显示日志

实时显示日志：

```bash
pm2 log
```

常用参数：

| 选项      | 类型                      | 描述 |
| :-------- | :------------------------ | :--- |
| `--lines` | 倒数多少行（--lines 200） |
| `<id>`    | 显示指定（ID）程序的日志  |
| `--json`  | 以 JSON 格式输出日志      |

## 清空日志

清空 PM2 管理的所有当前应用程序日志：

```bash
pm2 flush
```

您可以设置 `/dev/null` 或 `null` 作为日志的输出（不取决于平台）：

```json
{
  "out_file": "/dev/null",
  "error_file": "/dev/null"
}
```

## 基于终端的仪表板

实时仪表板：

```bash
pm2 monit
```

## 集群模式

为 Node.js 应用程序，PM2 包括一个自动负载平衡器，它将在每个派生进程之间共享所有 HTTP[s]/Websocket/TCP/UDP 连接。

要在群集模式下启动应用程序，请执行以下操作：

```bash
pm2 start app.js -i max
```

或则在配置文件中指定：

```js
module.exports = {
  apps: [
    {
      script: 'api.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
}
```

## 重新加载

与 `restart` 相反，`restart` 终止并重新启动进程，而 `reload` 实现了 0 秒的停机重新加载。

```bash
pm2 reload <app_name>
```

如果重新加载系统没有成功地重新加载应用程序，超时将回退到普通的重新启动。

## 生成配置文件

通过配置文件可以很方便的同时管理多个应用程序。要生成配置文件：

```bash
pm2 ecosystem
```

通过配置文件进行操作：

```bash
pm2 [start|restart|stop|delete] ecosystem.config.js
```

[更多配置][pm2_doc_single_page_attributes_available]：

```js
module.exports = {
  apps: [
    // First application
    {
      // App 名称
      name: 'app1',
      // 相对于执行 pm2 start 目录的相对路径
      script: './server.js',
      // 应用程序所在目录
      cwd: 'var/www/yourApp/',
      // 分为 cluster 以及 fork 模式
      exec_mode: 'cluster',
      // 只适用于 cluster 模式，程序启动数量
      instances: 0,
      // 启用监视和重新启动功能，如果文件夹或子文件夹中的文件发生更改，则将重新加载应用程序
      watch: false,
      // 如果应用程序占用超过指定的内存量，将重新启动
      max_memory_restart: '500M',
      // 解释器绝对路径（默认为 node），你可以通过此指定要启动服务的 node 版本
      interpreter: '/root/.nvm/versions/node/v8.16.0/bin/node',
      // 传递给解释器的额外的参数
      // 格式可以是 string 也可以是 string[]
      interpreter_args: "port=3001 sitename='first pm2 app'",
      // node_args 是 interpreter_args 的别名
      node_args: "port=3001 sitename='first pm2 app'",
      // 指定 cron 重启 App 的规则，只支持 cluster 模式
      cron_restart: '0 17 * * *',
      // 日志添加事件前缀
      time: true,
      // 包含通过 CLI 传递给脚本的所有参数的字符串
      args: '-a 13 -b 12',
      // 监听模式下忽略匹配正则表达式列表的某些文件或文件夹
      ignore_watch: ['[/\\]./', 'node_modules'],
      // 启用/禁用源映射文件，默认为 true
      // http://pm2.keymetrics.io/docs/usage/source-map-support/
      // https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
      source_map_support: true,
      // instance_var, 詳見以下連結
      // http://pm2.keymetrics.io/docs/usage/environment/#specific-environment-variables
      instance_var: 'NODE_APP_INSTANCE',
      // 设置日志的事件格式
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      // 错误日志的位置，默认 $HOME/.pm2/logs/XXXerr.log
      error_file: '/var/log',
      // 正常日志的位置，默认 $HOME/.pm2/logs/XXXout.log
      out_file: '/var/log',
      // 如果为 true， 同一个 App 的日志将不会根据程序的 ID 分割
      combine_logs: true,
      // merge_logs 是 combine_logs 的别名
      merge_logs: true,
      // pid file 位置, 默认 $HOME/.pm2/pid/app-pm_id.pid
      pid_file: 'user/.pm2/pid/app-pm_id.pid',
      // 要视为已启动的应用程序的最短正常运行时间，Pm2 根据此选项指定的时间来判定程序是否有成功启动
      // 格式可使用 number 或 string, number，数字 3000 代表 3000 ms。也可用 '1h' 代表一小时, '5m' 代表五分钟, '10s' 代表十秒
      min_uptime: '5',
      // 如果应用程序在指定的时间（毫秒）未监听端口的话，将强制重新加载
      listen_timeout: 8000,
      // 当执行 reload 时，因为 graceful reload 会等到服务都没有被存取了才会断开，如果超过这个时间，会强制断开重启
      // 更多信息可參考官方文件 http://pm2.keymetrics.io/docs/usage/signals-clean-restart/
      kill_timeout: 1600,
      // 通常，服务等待 listen 时间触发后，执行 reload，若此选项为 true，则等待 'ready' message
      // 更多信息可參考官方文件 http://pm2.keymetrics.io/docs/usage/signals-clean-restart/
      wait_ready: false,
      // Pm2 具有 crash 自动重启的功能。 但若异常狀況重启超过此选项的指定次数，则停止自动重启功能。
      // 异常与否的判定，默认为 1 秒，也就是说如果服务启动不足一秒又立即重启，则异常重启次数 + 1。
      // 若 min_uptime 选项有指定，则以 min_uptime 指定的最小正常启动时间为标准来判断是否为异常重启
      // 更多信息可參考官方文件 http://pm2.keymetrics.io/docs/usage/signals-clean-restart/
      max_restarts: 10,
      // 单位为 ms, 默认为 0, 若有指定时间，则 app 会等待指定时间过后重启
      restart_delay: 4000,
      // 默认为 true, 若设为 false, Pm2 将会关闭自动重启功能, 也就是说 app crash 之后将不会自动重启
      autorestart: true,
      // 默认为 true, 预设执行 pm2 start app 时，只要 ssh key 没问题， pm2 会自动比较 local 跟 remote, 看是否为最新的 commit，若否，会自动下載更新
      vizion: true,
      // 当使用 Keymetrics 的 dashboard 执行 pull 或 update 操作后，可以触发执行的一系列指令
      post_update: ['npm install', 'echo launching the app'],
      // defaults to false. if true, you can start the same script several times which is usually not allowed by PM2
      // 默认为 false, 如果设定为 true,
      force: false,
      // 当不指定 env 时，会使用此处指定的环境变量
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: '',
        ID: '44',
      },
      // 当有指定 env 为 production 时会使用此处指定的环境变量, 例如 pm2 start ecosystem.js --env production
      env_production: {
        NODE_ENV: 'production',
        ID: '55',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
    // 第二個 app, 很多資訊上面有介紹过的就不再重複
    {
      // Serve 模式, 可服务靜態資料夾
      script: 'serve',
      env: {
        PM2_SERVE_PATH: '.',
        PM2_SERVE_PORT: 8080,
      },
      name: 'app2',
      // 预设模式，可應用在其他語言, cluster 只可用在 node.js
      exec_mode: 'fork',
      interpreter: '/root/.nvm/versions/node/v8.16.0/bin/node',
      time: true,
    },
  ],
  deploy: {
    // production
    production: {
      host: ['host1', 'host2'],
      user: 'root',
      // 要部署到 server 上的位置
      path: '/var/www/yourProjectName',
      key: 'path/to/some.pem',
      // Git 仓库地址
      repo: 'git@gitlab.com:user/yourProject.git',
      // 要部署的分支
      ref: 'origin/master',
      ssh_options: 'StrictHostKeyChecking=no',
      // 在 Pm2 从 Local 端連到 Remote 端之前要执行的指令，可以多個指令，由 ; 分割，也可以指定 shell 脚本所在路径
      'pre-setup': 'apt update -y; apt install git -y',
      // 当 Pm2 在 Remote 机器上将仓库 clone 下来之后会执行的指令
      'post-setup': 'ls -la',
      // 当 Pm2 在 Local 要連上 Remote 部署之前，在 Local 端所要执行的指令
      'pre-deploy-local': "echo 'This is a local executed command'",
      // 部署完成后, 所要执行的指令
      'post-deploy': 'pm2 startOrRestart ecosystem.json --env dev',
      env_production: {
        NODE_ENV: 'production',
      },
    },
    staging: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/development',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      'post-deploy': 'pm2 startOrRestart ecosystem.json --env dev',
      env: {
        NODE_ENV: 'staging',
      },
    },
  },
}
```

## 监测和诊断面

基于 Web 的仪表板，带诊断系统的跨服务器：

```bash
pm2 plus
```

## 参考

- [PM2 - Single Page Doc](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
- [PM2 - Ecosystem File](https://pm2.keymetrics.io/docs/usage/application-declaration/)
- [pm2 - 用法大全 - Ray's Coding Journey](https://tn710617.github.io/zh-tw/pm2/)
- [入门 | PM2](https://wohugb.gitbooks.io/pm2/content/features/quick-start.html)

[pm2_doc_single_page_attributes_available]: https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/#attributes-available
