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
      return 'hello'
    }
  }

  @Get('coverage')
  coverageData() {
    return global.__coverage__;
  }
}
```

插桩后:

```ts
function cov_2hfyi6yc4b() {
  var path =
    '/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.controller.ts';
  var hash = '0b26da660683c2d07ef512cf6e4f064c27d36f10';
  var global = new Function('return this')();
  var gcv = '__coverage__';
  var coverageData = {
    path: '/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.controller.ts',
    statementMap: {
      '0': { start: { line: 4, column: 13 }, end: { line: 4, column: 18 } },
      '1': { start: { line: 12, column: 4 }, end: { line: 16, column: 5 } },
      '2': { start: { line: 13, column: 6 }, end: { line: 13, column: 40 } },
      '3': { start: { line: 15, column: 6 }, end: { line: 15, column: 20 } },
      '4': { start: { line: 21, column: 4 }, end: { line: 21, column: 31 } },
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: { start: { line: 8, column: 2 }, end: { line: 8, column: 3 } },
        loc: { start: { line: 8, column: 55 }, end: { line: 8, column: 57 } },
        line: 8,
      },
      '1': {
        name: '(anonymous_1)',
        decl: { start: { line: 10, column: 2 }, end: { line: 10, column: 3 } },
        loc: { start: { line: 11, column: 21 }, end: { line: 17, column: 3 } },
        line: 11,
      },
      '2': {
        name: '(anonymous_2)',
        decl: { start: { line: 19, column: 2 }, end: { line: 19, column: 3 } },
        loc: { start: { line: 20, column: 17 }, end: { line: 22, column: 3 } },
        line: 20,
      },
    },
    branchMap: {
      '0': {
        loc: { start: { line: 12, column: 4 }, end: { line: 16, column: 5 } },
        type: 'if',
        locations: [
          { start: { line: 12, column: 4 }, end: { line: 16, column: 5 } },
          { start: { line: 12, column: 4 }, end: { line: 16, column: 5 } },
        ],
        line: 12,
      },
    },
    s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0 },
    f: { '0': 0, '1': 0, '2': 0 },
    b: { '0': [0, 0] },
    _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
    hash: '0b26da660683c2d07ef512cf6e4f064c27d36f10',
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2hfyi6yc4b = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2hfyi6yc4b();
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
const bool = (cov_2hfyi6yc4b().s[0]++, false);
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    cov_2hfyi6yc4b().f[0]++;
  }
  @Get() getHello(): string {
    cov_2hfyi6yc4b().f[1]++;
    cov_2hfyi6yc4b().s[1]++;
    if (bool) {
      cov_2hfyi6yc4b().b[0][0]++;
      cov_2hfyi6yc4b().s[2]++;
      return this.appService.getHello();
    } else {
      cov_2hfyi6yc4b().b[0][1]++;
      cov_2hfyi6yc4b().s[3]++;
      return 'hello';
    }
  }
  @Get('coverage') coverageData() {
    cov_2hfyi6yc4b().f[2]++;
    cov_2hfyi6yc4b().s[4]++;
    return global.__coverage__;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmhmeWk2eWM0YiIsImFjdHVhbENvdmVyYWdlIiwiQ29udHJvbGxlciIsIkdldCIsIkFwcFNlcnZpY2UiLCJib29sIiwicyIsIkFwcENvbnRyb2xsZXIiLCJjb25zdHJ1Y3RvciIsImFwcFNlcnZpY2UiLCJmIiwiZ2V0SGVsbG8iLCJiIiwiY292ZXJhZ2VEYXRhIiwiZ2xvYmFsIiwiX19jb3ZlcmFnZV9fIl0sInNvdXJjZXMiOlsiYXBwLmNvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbGxlciwgR2V0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXBwU2VydmljZSB9IGZyb20gJy4vYXBwLnNlcnZpY2UnO1xuXG5jb25zdCBib29sID0gZmFsc2U7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBBcHBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlKSB7fVxuXG4gIEBHZXQoKVxuICBnZXRIZWxsbygpOiBzdHJpbmcge1xuICAgIGlmIChib29sKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcHBTZXJ2aWNlLmdldEhlbGxvKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnaGVsbG8nXG4gICAgfVxuICB9XG5cbiAgQEdldCgnY292ZXJhZ2UnKVxuICBjb3ZlcmFnZURhdGEoKSB7XG4gICAgcmV0dXJuIGdsb2JhbC5fX2NvdmVyYWdlX187XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Im9rREFlWTtBQUFBQSxjQUFBLFNBQUFBLENBQUEsU0FBQUMsY0FBQSxXQUFBQSxjQUFBLEVBQUFELGNBQUEsR0FmWixPQUFTRSxVQUFVLENBQUVDLEdBQUcsS0FBUSxnQkFBZ0IsQ0FDaEQsT0FBU0MsVUFBVSxLQUFRLGVBQWUsQ0FFMUMsS0FBTSxDQUFBQyxJQUFJLEVBQUFMLGNBQUEsR0FBQU0sQ0FBQSxNQUFHLEtBQUssRUFFbEIsQ0FBQ0osVUFBVSxDQUFDLENBQUMsTUFBYixNQUNhLENBQUFLLGFBQWMsQ0FDekJDLFdBQVdBLENBQUMsZ0JBQWlCLENBQUFDLFVBQVUsQ0FBRUwsVUFBVSxDQUFFLENBQUFKLGNBQUEsR0FBQVUsQ0FBQSxNQUFDLENBRXRELENBQUNQLEdBQUcsQ0FBQyxDQUNMUSxRQUFRQSxDQUFBLENBQUUsQ0FBRSxNQUFPLENBQUFYLGNBQUEsR0FBQVUsQ0FBQSxNQUFBVixjQUFBLEdBQUFNLENBQUEsTUFDakIsR0FBSUQsSUFBSSxDQUFFLENBQUFMLGNBQUEsR0FBQVksQ0FBQSxTQUFBWixjQUFBLEdBQUFNLENBQUEsTUFDUixNQUFPLEtBQUksQ0FBQ0csVUFBVSxDQUFDRSxRQUFRLENBQUMsQ0FBQyxDQUNuQyxDQUFDLElBQU0sQ0FBQVgsY0FBQSxHQUFBWSxDQUFBLFNBQUFaLGNBQUEsR0FBQU0sQ0FBQSxNQUNMLE1BQU8sT0FBTyxDQUNoQixDQUNGLENBRUEsQ0FBQ0gsR0FBRyxDQUFDLFVBQVUsQ0FDZlUsWUFBWUEsQ0FBQSxDQUFHLENBQUFiLGNBQUEsR0FBQVUsQ0FBQSxNQUFBVixjQUFBLEdBQUFNLENBQUEsTUFDYixNQUFPLENBQUFRLE1BQU0sQ0FBQ0MsWUFBWSxDQUM1QixDQUNGIn0=
```

为什么 import 语句没有被插桩呢

```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
```

我以为的：
```ts
import { Controller, Get } from '@nestjs/common';
cov_2hfyi6yc4b().s[0]++;
import { AppService } from './app.service';
cov_2hfyi6yc4b().s[1]++;
```

用 `npm run test:cov` 和 自定义的插桩结果不一致

但是报告上却显示这两个语句已经执行，怎么做到的呢

![20230707170338](http://s3.airtlab.com/blog/20230707170338.png)

可以看看它的数据统计：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<coverage generated="1688720531034" clover="3.2.0">
  <project timestamp="1688720531034" name="All files">
    <metrics statements="24" coveredstatements="15" conditionals="2" coveredconditionals="1" methods="5" coveredmethods="2" elements="31" coveredelements="18" complexity="0" loc="24" ncloc="24" packages="1" files="4" classes="4"/>
    <file name="app.controller.ts" path="/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.controller.ts">
      <metrics statements="11" coveredstatements="9" conditionals="2" coveredconditionals="1" methods="3" coveredmethods="2"/>
      <line num="1" count="1" type="stmt"/>
      <line num="2" count="1" type="stmt"/>
      <line num="4" count="1" type="stmt"/>
      <line num="7" count="1" type="stmt"/>
      <line num="8" count="1" type="stmt"/>
      <line num="10" count="1" type="stmt"/>
      <line num="12" count="1" type="cond" truecount="1" falsecount="1"/>
      <line num="13" count="0" type="stmt"/>
      <line num="15" count="1" type="stmt"/>
      <line num="19" count="1" type="stmt"/>
      <line num="21" count="0" type="stmt"/>
    </file>
    <file name="app.module.ts" path="/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.module.ts">
      <metrics statements="4" coveredstatements="4" conditionals="0" coveredconditionals="0" methods="0" coveredmethods="0"/>
      <line num="1" count="1" type="stmt"/>
      <line num="2" count="1" type="stmt"/>
      <line num="3" count="1" type="stmt"/>
      <line num="10" count="1" type="stmt"/>
    </file>
    <file name="app.service.ts" path="/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/app.service.ts">
      <metrics statements="3" coveredstatements="2" conditionals="0" coveredconditionals="0" methods="1" coveredmethods="0"/>
      <line num="1" count="1" type="stmt"/>
      <line num="4" count="1" type="stmt"/>
      <line num="6" count="0" type="stmt"/>
    </file>
    <file name="main.ts" path="/Users/xiong.gao/code/learn-books/demos/nyc-demo/nyc-nestjs/src/main.ts">
      <metrics statements="6" coveredstatements="0" conditionals="0" coveredconditionals="0" methods="1" coveredmethods="0"/>
      <line num="1" count="0" type="stmt"/>
      <line num="2" count="0" type="stmt"/>
      <line num="4" count="0" type="stmt"/>
      <line num="7" count="0" type="stmt"/>
      <line num="8" count="0" type="stmt"/>
      <line num="11" count="0" type="stmt"/>
    </file>
  </project>
</coverage>
```

我们需要看看他的源码是如何生成这个数据的