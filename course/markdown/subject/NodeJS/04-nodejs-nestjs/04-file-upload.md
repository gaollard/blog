---
tags: nodejs-nestjs
categories: NodeJS
---

---
title: 04 文件上传
---

## 1、基本用法

```typescript
import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Render, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';

import { join } from 'path';
import { createWriteStream } from 'fs';

@Controller('upload')
export class UploadController {
  // 上传单个文件
  @Post('single')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file, @Body() body) {
    console.log(file)
    console.log(body)
    const rstream = createWriteStream(
      join(__dirname, '../../public/upload', `${Date.now()}-${file.originalname}`)
    )
    rstream.write(file.buffer)
    return file.size
  }

  // 上传一个文件
  @Post('array')
  @UseInterceptors(FilesInterceptor('avatars'))
  uploadFileList(@UploadedFiles() files, @Body() body) {
    console.log(files)
    return files.map(elment => elment.originalname)
  }

  // 上传多个文件
  @Post('many')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 2 },
    { name: 'background', maxCount: 1 },
  ]))
  uploadFiles(@UploadedFiles() files) {
    console.log(files.avatar)
    console.log(files.background)
    return files.size
  }
}
```

## 2、配置路径 & 参数

```typescript
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}

```
```typescript
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';

// export const imageFileFilter = (req, file, callback) => {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return callback(new Error('Only image files are allowed!'), false);
//   }
//   callback(null, true);
// };

// export const editFileName = (req, file, callback) => {
//   const name = file.originalname.split('.')[0];
//   const fileExtName = extname(file.originalname);
//   const randomName = Array(4)
//     .fill(null)
//     .map(() => Math.round(Math.random() * 16).toString(16))
//     .join('');
//   callback(null, `${name}-${randomName}${fileExtName}`);
// };

@Controller('upload')
export class UploadController {
  constructor(
    private uploadService: UploadService
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.upload(file.path, file.originalname)
  }
}

```