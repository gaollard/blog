## 1、prisma 用法

- quick-start https://www.prisma.io/docs/getting-started/quickstart
- https://dev.to/inezabonte/setting-up-a-mysql-database-using-prisma-2869
- 《面向 Node.js 和 TypeScript 的下一代 ORM 工具 Prisma》 https://www.justsoso.tech/default/prisma-without-foreignKey.html

## 2、prisma 工程初始化

假设已经存在一个目录，确保安装了 `typescript ts-node @types/node prisma`

**初始化**

```
npx prisma init --datasource-provider mysql
```

## 3、prisma schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model user {
  id   Int     @id @default(autoincrement()) @db.UnsignedInt
  name String? @default("") @db.VarChar(255)
}

model post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  uid       Int
}
```

## 4、增删改查

### 1) create

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

### 2) findMany
```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// query
async function main() {
  const users = await prisma.user.findMany({})
  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

```

### 3) create  with relation

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Bob',
      post: {
        create: {
          title: 'Hello World',
        },
      },
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

```

### 4) query with relation
```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// query
async function main() {
  const users = await prisma.user.findMany({
    take: 10,
    skip: 1,
    include: {
      post: true
    },
  })
  console.dir(users, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

### 5) logger

```ts
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'info', 'warn']
});


// query
async function main() {
  const res = await prisma.$queryRaw(Prisma.sql`select * from user`);
  console.log(res)

  const users = await prisma.user.findMany({
    take: 10,
    skip: 1,
    include: {
      post: true
    },
  })
  console.dir(users, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

```

### 6) $queryRaw

```ts
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'info', 'warn']
});

// query
async function main() {
  const res = await prisma.$queryRaw(Prisma.sql`select * from user`);
  console.log(res)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

## 5、prisma 命令

**创建 diff 并且同步到远程 db**

```
npx prisma migrate dev
```

**将远程 db 的结构同步到本地，这可能会导致本地一些 relation 丢失**

```
npx prisma db pull
```

**ddl diff**

```
npx prisma migrate diff \
  --from-url "mysql://root:123456@localhost:3306/test"  \
  --to-url "mysql://root:123456@localhost:3306/test_2" \
  --script
```