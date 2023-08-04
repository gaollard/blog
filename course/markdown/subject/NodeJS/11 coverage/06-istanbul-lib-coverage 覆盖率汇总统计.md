```js
const lib = require('istanbul-lib-coverage');
var globalCoverageVar = require('./data.json');

const map = lib.createCoverageMap();
var summary = lib.createCoverageSummary();

console.log(map);

map.merge(globalCoverageVar);

// inspect and summarize all file coverage objects in the map
map.files().forEach(function (f) {
  console.log(f);
  if (
    f ===
    '/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.controller.ts'
  ) {
    var fc = map.fileCoverageFor(f),
      s = fc.toSummary();
    console.log(s)
    summary.merge(s);
  }
});

console.log('Global summary', summary);

// console.log(map)
```

```json
{
  "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/main.ts": {
    "path": "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/main.ts",
    "statementMap": {
      "0": {
        "start": { "line": 4, "column": 21 },
        "end": { "line": 4, "column": 25 }
      },
      "1": {
        "start": { "line": 7, "column": 14 },
        "end": { "line": 7, "column": 49 }
      },
      "2": {
        "start": { "line": 8, "column": 2 },
        "end": { "line": 8, "column": 25 }
      },
      "3": {
        "start": { "line": 11, "column": 0 },
        "end": { "line": 11, "column": 12 }
      }
    },
    "fnMap": {
      "0": {
        "name": "bootstrap",
        "decl": {
          "start": { "line": 6, "column": 15 },
          "end": { "line": 6, "column": 24 }
        },
        "loc": {
          "start": { "line": 6, "column": 27 },
          "end": { "line": 9, "column": 1 }
        },
        "line": 6
      }
    },
    "branchMap": {},
    "s": { "0": 1, "1": 1, "2": 1, "3": 1 },
    "f": { "0": 1 },
    "b": {},
    "_coverageSchema": "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    "hash": "472718326fc5322e49d43d2c3b98f9a39ed47cf8"
  },
  "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.module.ts": {
    "path": "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.module.ts",
    "statementMap": {},
    "fnMap": {},
    "branchMap": {},
    "s": {},
    "f": {},
    "b": {},
    "_coverageSchema": "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    "hash": "04c0bceb2cd600ef37753765082be61eafbfec80"
  },
  "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.controller.ts": {
    "path": "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.controller.ts",
    "statementMap": {
      "0": {
        "start": { "line": 4, "column": 13 },
        "end": { "line": 4, "column": 18 }
      },
      "1": {
        "start": { "line": 12, "column": 4 },
        "end": { "line": 16, "column": 5 }
      },
      "2": {
        "start": { "line": 13, "column": 6 },
        "end": { "line": 13, "column": 40 }
      },
      "3": {
        "start": { "line": 15, "column": 6 },
        "end": { "line": 15, "column": 20 }
      },
      "4": {
        "start": { "line": 21, "column": 4 },
        "end": { "line": 21, "column": 31 }
      }
    },
    "fnMap": {
      "0": {
        "name": "(anonymous_0)",
        "decl": {
          "start": { "line": 8, "column": 2 },
          "end": { "line": 8, "column": 3 }
        },
        "loc": {
          "start": { "line": 8, "column": 55 },
          "end": { "line": 8, "column": 57 }
        },
        "line": 8
      },
      "1": {
        "name": "(anonymous_1)",
        "decl": {
          "start": { "line": 10, "column": 2 },
          "end": { "line": 10, "column": 3 }
        },
        "loc": {
          "start": { "line": 11, "column": 21 },
          "end": { "line": 17, "column": 3 }
        },
        "line": 11
      },
      "2": {
        "name": "(anonymous_2)",
        "decl": {
          "start": { "line": 19, "column": 2 },
          "end": { "line": 19, "column": 3 }
        },
        "loc": {
          "start": { "line": 20, "column": 17 },
          "end": { "line": 22, "column": 3 }
        },
        "line": 20
      }
    },
    "branchMap": {
      "0": {
        "loc": {
          "start": { "line": 12, "column": 4 },
          "end": { "line": 16, "column": 5 }
        },
        "type": "if",
        "locations": [
          {
            "start": { "line": 12, "column": 4 },
            "end": { "line": 16, "column": 5 }
          },
          {
            "start": { "line": 12, "column": 4 },
            "end": { "line": 16, "column": 5 }
          }
        ],
        "line": 12
      }
    },
    "s": { "0": 1, "1": 1, "2": 0, "3": 1, "4": 1 },
    "f": { "0": 1, "1": 1, "2": 1 },
    "b": { "0": [0, 1] },
    "_coverageSchema": "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    "hash": "0b26da660683c2d07ef512cf6e4f064c27d36f10"
  },
  "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.service.ts": {
    "path": "/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.service.ts",
    "statementMap": {
      "0": {
        "start": { "line": 6, "column": 4 },
        "end": { "line": 6, "column": 26 }
      }
    },
    "fnMap": {
      "0": {
        "name": "(anonymous_0)",
        "decl": {
          "start": { "line": 5, "column": 2 },
          "end": { "line": 5, "column": 3 }
        },
        "loc": {
          "start": { "line": 5, "column": 13 },
          "end": { "line": 7, "column": 3 }
        },
        "line": 5
      }
    },
    "branchMap": {},
    "s": { "0": 0 },
    "f": { "0": 0 },
    "b": {},
    "_coverageSchema": "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    "hash": "fcb686300dd345b57630c8e123d42c6bfbb86264"
  }
}
```