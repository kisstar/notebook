# Error

- 推送直接报 403 错误而没有提示输入账户和密码

如果指定的远程是 HTTP 协议的，则可能是代理导致的，解决方案就是取消代理：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```
