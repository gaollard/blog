---
tags: 测试方法论
---

在 JavaScript 中，Jest 是一个流行的测试框架，用于编写和运行单元测试和集成测试。Jest 提供了一种方便的方式来编写、运行和报告测试结果。
`jest --coverage`命令用于生成代码覆盖率报告。代码覆盖率是衡量测试代码对应用程序代码的覆盖程度的指标。它告诉您测试案例是否足够全面，以验证应用程序的各个部分。

当您在运行`jest`命令时添加`--coverage`选项，Jest将执行测试案例并收集有关每个测试文件中每个函数、分支和语句的覆盖信息。它会生成一个代码覆盖率报告，其中包含以下内容：
- 行覆盖率：每个文件中执行的测试行数与总行数的比例。
- 分支覆盖率：每个条件/分支中执行的测试比例。
- 函数覆盖率：每个函数中执行的测试比例。
- 语句覆盖率：每个语句中执行的测试比例。

覆盖率报告可以帮助您确定测试的质量和完整性。通过查看哪些部分缺乏足够的测试，您可以增加测试案例以提高代码覆盖率。此外，您还可以使用覆盖率报告来检查不常用的代码分支和功能，以确保它们也得到了适当的测试覆盖。

## 可视化生成

覆盖率可视化报告 = 据原代码 + coverage data
![20230706115121](http://s3.airtlab.com/blog/20230706115121.png)

## 参考

- [Jest | 测试框架实战之-coverage命令实现原理](https://juejin.cn/post/7035139783911276551)
- [Nest的test中的best是Jest框架](https://justin3go.com/%E5%8D%9A%E5%AE%A2/2023/05/01Nest%E7%9A%84test%E4%B8%AD%E7%9A%84best%E6%98%AFJest%E6%A1%86%E6%9E%B6.html#jest%E7%BC%96%E5%86%99%E5%8D%95%E6%B5%8B%E7%94%A8%E4%BE%8B)


```js
"use strict";

/* istanbul ignore next */
function cov_1i38u7idc3() {
  var path = "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.service.ts";
  var hash = "25afe50c22c12ffc15e6f7fe8099588dd5984899";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.service.ts",
    statementMap: {
      "0": {
        start: {
          line: 2,
          column: 17
        },
        end: {
          line: 7,
          column: 1
        }
      },
      "1": {
        start: {
          line: 3,
          column: 12
        },
        end: {
          line: 3,
          column: 28
        }
      },
      "2": {
        start: {
          line: 3,
          column: 34
        },
        end: {
          line: 3,
          column: 125
        }
      },
      "3": {
        start: {
          line: 4,
          column: 4
        },
        end: {
          line: 5,
          column: 150
        }
      },
      "4": {
        start: {
          line: 4,
          column: 79
        },
        end: {
          line: 4,
          column: 131
        }
      },
      "5": {
        start: {
          line: 5,
          column: 9
        },
        end: {
          line: 5,
          column: 150
        }
      },
      "6": {
        start: {
          line: 5,
          column: 22
        },
        end: {
          line: 5,
          column: 43
        }
      },
      "7": {
        start: {
          line: 5,
          column: 58
        },
        end: {
          line: 5,
          column: 150
        }
      },
      "8": {
        start: {
          line: 5,
          column: 81
        },
        end: {
          line: 5,
          column: 150
        }
      },
      "9": {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 6,
          column: 66
        }
      },
      "10": {
        start: {
          line: 8,
          column: 0
        },
        end: {
          line: 8,
          column: 62
        }
      },
      "11": {
        start: {
          line: 9,
          column: 0
        },
        end: {
          line: 9,
          column: 28
        }
      },
      "12": {
        start: {
          line: 10,
          column: 17
        },
        end: {
          line: 10,
          column: 42
        }
      },
      "13": {
        start: {
          line: 11,
          column: 17
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "14": {
        start: {
          line: 13,
          column: 8
        },
        end: {
          line: 13,
          column: 30
        }
      },
      "15": {
        start: {
          line: 16,
          column: 0
        },
        end: {
          line: 18,
          column: 15
        }
      },
      "16": {
        start: {
          line: 19,
          column: 0
        },
        end: {
          line: 19,
          column: 32
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 2,
            column: 46
          },
          end: {
            line: 2,
            column: 47
          }
        },
        loc: {
          start: {
            line: 2,
            column: 87
          },
          end: {
            line: 7,
            column: 1
          }
        },
        line: 2
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 12,
            column: 4
          },
          end: {
            line: 12,
            column: 5
          }
        },
        loc: {
          start: {
            line: 12,
            column: 15
          },
          end: {
            line: 14,
            column: 5
          }
        },
        line: 12
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 2,
            column: 17
          },
          end: {
            line: 7,
            column: 1
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 2,
            column: 18
          },
          end: {
            line: 2,
            column: 22
          }
        }, {
          start: {
            line: 2,
            column: 26
          },
          end: {
            line: 2,
            column: 41
          }
        }, {
          start: {
            line: 2,
            column: 46
          },
          end: {
            line: 7,
            column: 1
          }
        }],
        line: 2
      },
      "1": {
        loc: {
          start: {
            line: 3,
            column: 34
          },
          end: {
            line: 3,
            column: 125
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 3,
            column: 42
          },
          end: {
            line: 3,
            column: 48
          }
        }, {
          start: {
            line: 3,
            column: 51
          },
          end: {
            line: 3,
            column: 125
          }
        }],
        line: 3
      },
      "2": {
        loc: {
          start: {
            line: 3,
            column: 51
          },
          end: {
            line: 3,
            column: 125
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 3,
            column: 67
          },
          end: {
            line: 3,
            column: 118
          }
        }, {
          start: {
            line: 3,
            column: 121
          },
          end: {
            line: 3,
            column: 125
          }
        }],
        line: 3
      },
      "3": {
        loc: {
          start: {
            line: 4,
            column: 4
          },
          end: {
            line: 5,
            column: 150
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 4,
            column: 4
          },
          end: {
            line: 5,
            column: 150
          }
        }, {
          start: {
            line: 5,
            column: 9
          },
          end: {
            line: 5,
            column: 150
          }
        }],
        line: 4
      },
      "4": {
        loc: {
          start: {
            line: 4,
            column: 8
          },
          end: {
            line: 4,
            column: 77
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 4,
            column: 8
          },
          end: {
            line: 4,
            column: 35
          }
        }, {
          start: {
            line: 4,
            column: 39
          },
          end: {
            line: 4,
            column: 77
          }
        }],
        line: 4
      },
      "5": {
        loc: {
          start: {
            line: 5,
            column: 58
          },
          end: {
            line: 5,
            column: 150
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 5,
            column: 58
          },
          end: {
            line: 5,
            column: 150
          }
        }, {
          start: {
            line: undefined,
            column: undefined
          },
          end: {
            line: undefined,
            column: undefined
          }
        }],
        line: 5
      },
      "6": {
        loc: {
          start: {
            line: 5,
            column: 85
          },
          end: {
            line: 5,
            column: 149
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 5,
            column: 86
          },
          end: {
            line: 5,
            column: 143
          }
        }, {
          start: {
            line: 5,
            column: 148
          },
          end: {
            line: 5,
            column: 149
          }
        }],
        line: 5
      },
      "7": {
        loc: {
          start: {
            line: 5,
            column: 86
          },
          end: {
            line: 5,
            column: 143
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 5,
            column: 94
          },
          end: {
            line: 5,
            column: 98
          }
        }, {
          start: {
            line: 5,
            column: 101
          },
          end: {
            line: 5,
            column: 143
          }
        }],
        line: 5
      },
      "8": {
        loc: {
          start: {
            line: 5,
            column: 101
          },
          end: {
            line: 5,
            column: 143
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 5,
            column: 109
          },
          end: {
            line: 5,
            column: 126
          }
        }, {
          start: {
            line: 5,
            column: 129
          },
          end: {
            line: 5,
            column: 143
          }
        }],
        line: 5
      },
      "9": {
        loc: {
          start: {
            line: 6,
            column: 11
          },
          end: {
            line: 6,
            column: 62
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 6,
            column: 11
          },
          end: {
            line: 6,
            column: 16
          }
        }, {
          start: {
            line: 6,
            column: 20
          },
          end: {
            line: 6,
            column: 21
          }
        }, {
          start: {
            line: 6,
            column: 25
          },
          end: {
            line: 6,
            column: 62
          }
        }],
        line: 6
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0,
      "14": 0,
      "15": 0,
      "16": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {
      "0": [0, 0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0],
      "4": [0, 0],
      "5": [0, 0],
      "6": [0, 0],
      "7": [0, 0],
      "8": [0, 0],
      "9": [0, 0, 0]
    },
    inputSourceMap: {
      file: "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.service.ts",
      mappings: ";;;;;;;;;AAAA,2CAA4C;AAGrC,IAAM,UAAU,GAAhB,MAAM,UAAU;IACrB,QAAQ;QACN,OAAO,cAAc,CAAC;IACxB,CAAC;CACF,CAAA;AAJY,UAAU;IADtB,IAAA,mBAAU,GAAE;GACA,UAAU,CAItB;AAJY,gCAAU",
      names: [],
      sources: ["/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.service.ts"],
      sourcesContent: ["import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class AppService {\n  getHello() {\n    return 'Hello World!';\n  }\n}\n"],
      version: 3
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "25afe50c22c12ffc15e6f7fe8099588dd5984899"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1i38u7idc3 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1i38u7idc3();
var __decorate =
/* istanbul ignore next */
(cov_1i38u7idc3().s[0]++,
/* istanbul ignore next */
(cov_1i38u7idc3().b[0][0]++, this) &&
/* istanbul ignore next */
(cov_1i38u7idc3().b[0][1]++, this.__decorate) ||
/* istanbul ignore next */
(cov_1i38u7idc3().b[0][2]++, function (decorators, target, key, desc) {
  /* istanbul ignore next */
  cov_1i38u7idc3().f[0]++;
  var c =
    /* istanbul ignore next */
    (cov_1i38u7idc3().s[1]++, arguments.length),
    r =
    /* istanbul ignore next */
    (cov_1i38u7idc3().s[2]++, c < 3 ?
    /* istanbul ignore next */
    (cov_1i38u7idc3().b[1][0]++, target) :
    /* istanbul ignore next */
    (cov_1i38u7idc3().b[1][1]++, desc === null ?
    /* istanbul ignore next */
    (cov_1i38u7idc3().b[2][0]++, desc = Object.getOwnPropertyDescriptor(target, key)) :
    /* istanbul ignore next */
    (cov_1i38u7idc3().b[2][1]++, desc))),
    d;
  /* istanbul ignore next */
  cov_1i38u7idc3().s[3]++;
  if (
  /* istanbul ignore next */
  (cov_1i38u7idc3().b[4][0]++, typeof Reflect === "object") &&
  /* istanbul ignore next */
  (cov_1i38u7idc3().b[4][1]++, typeof Reflect.decorate === "function")) {
    /* istanbul ignore next */
    cov_1i38u7idc3().b[3][0]++;
    cov_1i38u7idc3().s[4]++;
    r = Reflect.decorate(decorators, target, key, desc);
  } else {
    /* istanbul ignore next */
    cov_1i38u7idc3().b[3][1]++;
    cov_1i38u7idc3().s[5]++;
    for (var i =
    /* istanbul ignore next */
    (cov_1i38u7idc3().s[6]++, decorators.length - 1); i >= 0; i--) {
      /* istanbul ignore next */
      cov_1i38u7idc3().s[7]++;
      if (d = decorators[i]) {
        /* istanbul ignore next */
        cov_1i38u7idc3().b[5][0]++;
        cov_1i38u7idc3().s[8]++;
        r =
        /* istanbul ignore next */
        (cov_1i38u7idc3().b[6][0]++, c < 3 ?
        /* istanbul ignore next */
        (cov_1i38u7idc3().b[7][0]++, d(r)) :
        /* istanbul ignore next */
        (cov_1i38u7idc3().b[7][1]++, c > 3 ?
        /* istanbul ignore next */
        (cov_1i38u7idc3().b[8][0]++, d(target, key, r)) :
        /* istanbul ignore next */
        (cov_1i38u7idc3().b[8][1]++, d(target, key)))) ||
        /* istanbul ignore next */
        (cov_1i38u7idc3().b[6][1]++, r);
      } else
      /* istanbul ignore next */
      {
        cov_1i38u7idc3().b[5][1]++;
      }
    }
  }
  /* istanbul ignore next */
  cov_1i38u7idc3().s[9]++;
  return (
    /* istanbul ignore next */
    (cov_1i38u7idc3().b[9][0]++, c > 3) &&
    /* istanbul ignore next */
    (cov_1i38u7idc3().b[9][1]++, r) &&
    /* istanbul ignore next */
    (cov_1i38u7idc3().b[9][2]++, Object.defineProperty(target, key, r)), r
  );
}));
/* istanbul ignore next */
cov_1i38u7idc3().s[10]++;
Object.defineProperty(exports, "__esModule", {
  value: true
});
/* istanbul ignore next */
cov_1i38u7idc3().s[11]++;
exports.AppService = void 0;
const common_1 =
/* istanbul ignore next */
(cov_1i38u7idc3().s[12]++, require("@nestjs/common"));
/* istanbul ignore next */
cov_1i38u7idc3().s[13]++;
let AppService = class AppService {
  getHello() {
    /* istanbul ignore next */
    cov_1i38u7idc3().f[1]++;
    cov_1i38u7idc3().s[14]++;
    return 'Hello World!';
  }
};
/* istanbul ignore next */
cov_1i38u7idc3().s[15]++;
AppService = __decorate([(0, common_1.Injectable)()], AppService);
/* istanbul ignore next */
cov_1i38u7idc3().s[16]++;
exports.AppService = AppService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMWkzOHU3aWRjMyIsImFjdHVhbENvdmVyYWdlIiwiY29tbW9uXzEiLCJzIiwicmVxdWlyZSIsIkFwcFNlcnZpY2UiLCJnZXRIZWxsbyIsImYiLCJfX2RlY29yYXRlIiwiSW5qZWN0YWJsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIvVXNlcnMveGlvbmcuZ2FvL2NvZGUvbGVhcm4tYm9va3MvZGVtb3MvbnljLWRlbW8vbnljLW5lc3Rqcy9zcmMvYXBwLnNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwcFNlcnZpY2Uge1xuICBnZXRIZWxsbygpIHtcbiAgICByZXR1cm4gJ0hlbGxvIFdvcmxkISc7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUd1QjtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFIdkIsTUFBQUUsUUFBQTtBQUFBO0FBQUEsQ0FBQUYsY0FBQSxHQUFBRyxDQUFBLFFBQUFDLE9BQUE7QUFBNEM7QUFBQUosY0FBQSxHQUFBRyxDQUFBO0FBR3JDLElBQU1FLFVBQVUsR0FBaEIsTUFBTUEsVUFBVTtFQUNyQkMsUUFBUUEsQ0FBQTtJQUFBO0lBQUFOLGNBQUEsR0FBQU8sQ0FBQTtJQUFBUCxjQUFBLEdBQUFHLENBQUE7SUFDTixPQUFPLGNBQWM7RUFDdkI7Q0FDRDtBQUFBO0FBQUFILGNBQUEsR0FBQUcsQ0FBQTtBQUpZRSxVQUFVLEdBQUFHLFVBQUEsRUFEdEIsSUFBQU4sUUFBQSxDQUFBTyxVQUFVLEdBQUUsQyxFQUNBSixVQUFVLENBSXRCO0FBQUE7QUFBQUwsY0FBQSxHQUFBRyxDQUFBO0FBSllPLE9BQUEsQ0FBQUwsVUFBQSxHQUFBQSxVQUFBIn0=
```