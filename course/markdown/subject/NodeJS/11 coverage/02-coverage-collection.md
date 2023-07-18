```ts
import * as fs from 'fs';
import * as types from '@babel/types';
import * as babel from '@babel/core';
import generate from '@babel/generator';

const code = fs.readFileSync('code.ts', 'utf-8');

const ast = babel.parse(code, {
  presets: ['@babel/preset-typescript'],
  filename: 'code.ts',
});

var fnCount = 0;
var statementCount = 0;
var branchCount = 0;

function uni() {
  return {
    execStatement(index: number) {
      
    }
  }
}

var callbackName = 'context';
var callback = uni();

var stateMap: any = {
  
}

babel.traverse(ast!, {
  // Program (path) {
  //   path.scope.push({
  //     id: types.identifier('myScope')
  //   })
  // },
  FunctionDeclaration(path) {
    fnCount++;
  },
  ArrowFunctionExpression() {
    fnCount++;
  },
  Expression(t) {},

  CallExpression(path) {
    statementCount++;
    debugger

    stateMap[statementCount] = {
      loc: {
        start: path.node.loc!.start,
        end: path.node.loc!.end,
      }
    }

    const i = types.sequenceExpression([
      types.callExpression(
        types.memberExpression(
          types.identifier(callbackName),
          types.identifier('execStatement'),
        ),
        [types.numericLiteral(statementCount)],
      ),
      path.node,
    ]);
    path.skip();
    path.replaceWith(i);
  },

  BinaryExpression(path) {
    statementCount++;

    stateMap[statementCount] = {
      loc: {
        start: path.node.loc!.start,
        end: path.node.loc!.end,
      }
    }
  
    const i = types.sequenceExpression([
      types.callExpression(
        types.memberExpression(
          types.identifier(callbackName),
          types.identifier('execStatement'),
        ),
        [types.numericLiteral(statementCount)],
      ),
      path.node,
    ]);
    path.skip();
    path.replaceWith(i);
  },
});

const output = generate(
  ast!,
  {
    /* options */
  },
  code,
);

console.log(output.code);
console.log(JSON.stringify(stateMap))
```