---
tags: nodejs-nestjs
categories: NodeJS
---

## 1、ArgumentsHost
```typescript
export interface ArgumentsHost {
  /**
   * Returns the array of arguments being passed to the handler.
   */
  getArgs<T extends Array<any> = any[]>(): T;
  /**
   * Returns a particular argument by index.
   * @param index index of argument to retrieve
   */
  getArgByIndex<T = any>(index: number): T;
  /**
   * Switch context to RPC.
   * @returns interface with methods to retrieve RPC arguments
   */
  switchToRpc(): RpcArgumentsHost;
  /**
   * Switch context to HTTP.
   * @returns interface with methods to retrieve HTTP arguments
   */
  switchToHttp(): HttpArgumentsHost;
  /**
   * Switch context to WebSockets.
   * @returns interface with methods to retrieve WebSockets arguments
   */
  switchToWs(): WsArgumentsHost;
  /**
   * Returns the current execution context type (string)
   */
  getType<TContext extends string = ContextType>(): TContext;
}
```

```typescript
export interface RpcArgumentsHost {
  /**
   * Returns the data object.
   */
  getData<T = any>(): T;
  /**
   * Returns the context object.
   */
  getContext<T = any>(): T;
}
```

```typescript
export interface HttpArgumentsHost {
  /**
   * Returns the in-flight `request` object.
   */
  getRequest<T = any>(): T;
  /**
   * Returns the in-flight `response` object.
   */
  getResponse<T = any>(): T;
  getNext<T = any>(): T;
}
```

```typescript
export interface WsArgumentsHost {
    /**
     * Returns the data object.
     */
    getData<T = any>(): T;
    /**
     * Returns the client object.
     */
    getClient<T = any>(): T;
}
```

## 2、ExecutionContext
```typescript
const ctx = host.switchToHttp();
const request = ctx.getRequest<Request>();
const response = ctx.getResponse<Response>();
```

### 获取当前 controller
```typescript
export interface ExecutionContext extends ArgumentsHost {
  /**
   * Returns the *type* of the controller class which the current handler belongs to.
   */
  getClass<T = any>(): Type<T>;
  /**
   * Returns a reference to the handler (method) that will be invoked next in the
   * request pipeline.
   */
  getHandler(): Function;
}
```

### 获取当前 getHandler
```typescript
export interface ExecutionContext extends ArgumentsHost {
  /**
   * Returns the *type* of the controller class which the current handler belongs to.
   */
  getClass<T = any>(): Type<T>;
  /**
   * Returns a reference to the handler (method) that will be invoked next in the
   * request pipeline.
   */
  getHandler(): Function;
}
```
