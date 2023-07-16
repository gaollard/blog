## 1、微信 cgi-bin 和sns目录下的接口什么区别啊？

https://developers.weixin.qq.com/community/develop/doc/483552123f44973079500c2e6d09a18e

## 2、`https://api.weixin.qq.com/sns/userinfo` 和 `https://api.weixin.qq.com/cgi-bin/user/info` 的区别

这两个微信的API有一些区别，以下是它们的主要区别：
1. 接口功能：https://api.weixin.qq.com/sns/userinfo 是微信开发者平台的API，主要用于获取用户的基本信息和授权后的用户信息。https://api.weixin.qq.com/cgi-bin/user/info 是微信公众平台的API，主要用于获取公众号用户的信息。

2. 接口地址：https://api.weixin.qq.com/sns/userinfo 的路径中包含了"sns"，表示该接口主要用于处理基于OAuth2.0的用户授权流程。https://api.weixin.qq.com/cgi-bin/user/info 的路径中没有"sns"，表示该接口主要用于公众号用户信息的获取。

3. 接口调用方式：https://api.weixin.qq.com/sns/userinfo 需要通过OAuth2.0的用户授权流程获得用户的access_token，然后再通过该接口获取用户信息。https://api.weixin.qq.com/cgi-bin/user/info 则需要使用公众号的access_token直接调用该接口获取用户信息。

4. 返回的数据：https://api.weixin.qq.com/sns/userinfo 返回的是JSON格式的数据，包含用户的基本信息和授权后的用户信息。https://api.weixin.qq.com/cgi-bin/user/info 返回的也是JSON格式的数据，包含公众号用户的信息。

总结来说，https://api.weixin.qq.com/sns/userinfo 主要用于处理用户授权流程，获取用户基本信息和授权信息；https://api.weixin.qq.com/cgi-bin/user/info 主要用于公众号用户信息的获取。