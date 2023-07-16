---
title: 01 the-super-tiny-compiler 源码分析
tags: acornjs
---

<https://github.com/jamiebuilds/the-super-tiny-compiler>，这个设计库实在太过简单（比如：不支持取反操作），只能用作学习 compiler 的流程设计。

- tokenizer(词法分析器)：划分 token，产生一个 token 数组
- parser(语法分析器)：接受 token 数组，然后把它转化为 AST <a name="bsEHt"></a>

### 1. 测试 the-super-tiny-compiler

    (add 21 (subtract 4 2))

- (op v1 v2) 括号表示一个 CallExpression 调用表达式
- add +
- subtract -
- token 只包含
  - NumberLiteral 数字字面量
  - StringLiteral 字符串字面量
  - CallExpression 调用表达式
    - add
    - subtract

#### 1.1 tokens

```json
[
  {
    "type": "paren",
    "value": "("
  },
  {
    "type": "name",
    "value": "add"
  },
  {
    "type": "number",
    "value": "21"
  },
  {
    "type": "paren",
    "value": "("
  },
  {
    "type": "name",
    "value": "subtract"
  },
  {
    "type": "number",
    "value": "4"
  },
  {
    "type": "number",
    "value": "2"
  },
  {
    "type": "paren",
    "value": ")"
  },
  {
    "type": "paren",
    "value": ")"
  }
]
```

#### 1.2 AST

```json
{
  "type": "Program",
  "body": [
    {
      "type": "CallExpression",
      "name": "add",
      "params": [
        {
          "type": "NumberLiteral",
          "value": "21"
        },
        {
          "type": "CallExpression",
          "name": "subtract",
          "params": [
            {
              "type": "NumberLiteral",
              "value": "4"
            },
            {
              "type": "NumberLiteral",
              "value": "2"
            }
          ]
        }
      ]
    }
  ]
}
```

<a name="RKRFw"></a>

### 2. 自己实现

<a name="fQ8XC"></a>

#### 2.1 tokenizer

```javascript
/**
 * @param {string} input 
 */
function tokenizer(input) {
  let current = 0;
  let tokens = [];

  const lt_parent_l = '(';
  const lt_parent_r = ')';

  const type_paren = 'paren';
  const type_number = 'number';
  const type_string = 'string';
  const type_name = 'name';

  const reg_whitespcae = /\s/;
  const reg_numbers = /[0-9]/;
  const reg_letters = /[a-z]/i;

  const isEof = () => current >= input.length;

  const genToken = (type, value, start) => {
    const token = {
      type,
      value
    }
    token.loc = {
      start,
      end: token.value.length + start
    }
    tokens.push(token)
  } 

  while(!isEof()) {
    let c_char = input[current];

    if (c_char === lt_parent_l) {
      genToken(type_paren, c_char, current)
      current++;
      continue;
    }

    if (c_char === lt_parent_r) {
      genToken(type_paren, c_char, current)
      current++;
      continue;
    }

    if (reg_whitespcae.test(c_char)) {
      current++;
      continue;
    }

    if (reg_numbers.test(c_char)) {
      // 解析出当前的整型字面量

      let value = '';
      let start = current;

      while(reg_numbers.test(c_char)) {
        value += c_char;
        c_char = input[++current];
      }

      genToken(type_number, value, start)
      continue;
    }

    if (c_char === '"') {
      // 找出完整的字符串

      let start = current
      let value = '';
      c_char = input[current++]; 

      while(c_char !== '"') {
        value += c_char;
        c_char = input[++current];
      }

      // 跳过闭合的双引号
      c_char = input[++current];

      genToken(type_string, value, start)
      continue;
    }

    if (reg_letters.test(c_char)) {
      // 找出完整的关键字
      let start = current;
      let value = '';
      while(reg_letters.test(c_char)) {
        value += c_char;
        c_char = input[++current];
      }

      genToken(type_name, value, start)
      continue;
    }

    // 如果还剩一些字符，说明表达式语法有错误
    throw new TypeError('I dont know what this character is: ' + char);
  }

  return tokens;
}
```

```javascript
// (add 21 (subtract 4 2))
[
  { type: 'paren', value: '(', loc: { start: 0, end: 1 } },
  { type: 'name', value: 'add', loc: { start: 1, end: 4 } },
  { type: 'number', value: '21', loc: { start: 5, end: 7 } },
  { type: 'paren', value: '(', loc: { start: 8, end: 9 } },
  { type: 'name', value: 'subtract', loc: { start: 9, end: 17 } },
  { type: 'number', value: '4', loc: { start: 18, end: 19 } },
  { type: 'number', value: '2', loc: { start: 20, end: 21 } },
  { type: 'paren', value: ')', loc: { start: 21, end: 22 } },
  { type: 'paren', value: ')', loc: { start: 22, end: 23 } }
]
```

#### 2.2 parser