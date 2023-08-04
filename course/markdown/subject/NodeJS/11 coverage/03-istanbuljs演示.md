- @istanbuljs/nyc-config-typescript
- source-map-support

**package.json**

```json
  "nyc": {
    "extends": "./nyc-config.js",
    "all": true,
    "require": [
      "ts-node/register/transpile-only",
      "source-map-support/register"
    ]
  },
```

**nyc-config.js**

```js
const { parserPlugins } = require('@istanbuljs/schema').defaults.nyc;

module.exports = {
  cache: false,
  parserPlugins: parserPlugins.concat('typescript', 'jsx', 'decorators-legacy'),
};
```

## 2、插桩

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

const bool = false;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    if (bool) {
      return this.appService.getHello();
    } else {
      return 'hello';
    }
  }

  @Get('coverage')
  coverageData() {
    return global.__coverage__;
  }
}
```

```js
function cov_s0t1xtp2e() {
  var path = 'app.controller.ts';
  var hash = 'd1ab3cf10fe95bb683cc2f63d090695750c72e09';
  var global = new Function('return this')();
  var gcv = '__coverage__';
  var coverageData = {
    path: 'app.controller.ts',
    statementMap: {
      0: { start: { line: 4, column: 13 }, end: { line: 4, column: 18 } },
      1: { start: { line: 12, column: 4 }, end: { line: 16, column: 5 } },
      2: { start: { line: 13, column: 6 }, end: { line: 13, column: 40 } },
      3: { start: { line: 15, column: 6 }, end: { line: 15, column: 20 } },
      4: { start: { line: 21, column: 4 }, end: { line: 21, column: 31 } },
    },
    fnMap: {
      0: {
        name: '(anonymous_0)',
        decl: { start: { line: 8, column: 2 }, end: { line: 8, column: 3 } },
        loc: { start: { line: 8, column: 55 }, end: { line: 8, column: 57 } },
        line: 8,
      },
      1: {
        name: '(anonymous_1)',
        decl: { start: { line: 10, column: 2 }, end: { line: 10, column: 3 } },
        loc: { start: { line: 11, column: 21 }, end: { line: 17, column: 3 } },
        line: 11,
      },
      2: {
        name: '(anonymous_2)',
        decl: { start: { line: 19, column: 2 }, end: { line: 19, column: 3 } },
        loc: { start: { line: 20, column: 17 }, end: { line: 22, column: 3 } },
        line: 20,
      },
    },
    branchMap: {
      0: {
        loc: { start: { line: 12, column: 4 }, end: { line: 16, column: 5 } },
        type: 'if',
        locations: [
          { start: { line: 12, column: 4 }, end: { line: 16, column: 5 } },
          { start: { line: 12, column: 4 }, end: { line: 16, column: 5 } },
        ],
        line: 12,
      },
    },
    s: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
    f: { 0: 0, 1: 0, 2: 0 },
    b: { 0: [0, 0] },
    _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
    hash: 'd1ab3cf10fe95bb683cc2f63d090695750c72e09',
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    cov_s0t1xtp2e = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_s0t1xtp2e();
const bool = (cov_s0t1xtp2e().s[0]++, false);
let AppController = class AppController {
  constructor(appService) {
    this.appService = appService;
    cov_s0t1xtp2e().f[0]++;
  }
  getHello() {
    cov_s0t1xtp2e().f[1]++;
    cov_s0t1xtp2e().s[1]++;
    if (bool) {
      cov_s0t1xtp2e().b[0][0]++;
      cov_s0t1xtp2e().s[2]++;
      return this.appService.getHello();
    } else {
      cov_s0t1xtp2e().b[0][1]++;
      cov_s0t1xtp2e().s[3]++;
      return 'hello';
    }
  }
  coverageData() {
    cov_s0t1xtp2e().f[2]++;
    cov_s0t1xtp2e().s[4]++;
    return global.__coverage__;
  }
};
```

## 2、数据结构

```json
{
  "path": "app.controller.ts",
  "statementMap": {
    "0": {
      "start": { "line": 10, "column": 4 },
      "end": { "line": 10, "column": 38 }
    },
    "1": {
      "start": { "line": 15, "column": 4 },
      "end": { "line": 15, "column": 31 }
    }
  },
  "fnMap": {
    "0": {
      "name": "(anonymous_0)",
      "decl": {
        "start": { "line": 6, "column": 2 },
        "end": { "line": 6, "column": 3 }
      },
      "loc": {
        "start": { "line": 6, "column": 55 },
        "end": { "line": 6, "column": 57 }
      },
      "line": 6
    },
    "1": {
      "name": "(anonymous_1)",
      "decl": {
        "start": { "line": 8, "column": 2 },
        "end": { "line": 8, "column": 3 }
      },
      "loc": {
        "start": { "line": 9, "column": 21 },
        "end": { "line": 11, "column": 3 }
      },
      "line": 9
    },
    "2": {
      "name": "(anonymous_2)",
      "decl": {
        "start": { "line": 13, "column": 2 },
        "end": { "line": 13, "column": 3 }
      },
      "loc": {
        "start": { "line": 14, "column": 17 },
        "end": { "line": 16, "column": 3 }
      },
      "line": 14
    }
  },
  "branchMap": {},
  "s": { "0": 3, "1": 11 },
  "f": { "0": 1, "1": 3, "2": 11 },
  "b": {},
  "_coverageSchema": "1a1c01bbd47fc00a2c39e90264f33305004495a9",
  "hash": "4ca2bfe3281e37824b063daa0c37f084ca573ddf"
}
```

- fnMap 对象用于维护函数信息，key 为函数索引(从 0 开始)，loc 表示函数体的位置
- branchMap 对象用于维护分支信息，key 为分支索引(从 0 开始)，loc 表示函数体的位置
- s 对象用于维护 statement 执行信息，key 为 statement 索引(从 0 开始)，value 为执行次数
- f 对象用于维护 function 执行信息，key 为 function 索引(从 0 开始)，value 为执行次数

### function

### statement

### branch

### 可视化

![20230706115628](http://s3.airtlab.com/blog/20230706115628.png)

## 核心部件
- istanbul-lib-coverage 分析覆盖率元数据 (例如：哪些行被执行，哪些行没有被执行)
- istanbul-lib-instrument
- istanbul-lib-report
- istanbul-lib-source-maps
- istanbul-reports 
- istanbul-middleware https://github.com/gotwarlost/istanbul-middleware/blob/master/README.md
