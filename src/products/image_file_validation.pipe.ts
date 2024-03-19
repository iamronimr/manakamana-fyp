// image-file-validation.pipe.ts

import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ImageFileValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

  transform(file: Express.Multer.File): Express.Multer.File {
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file format. Only JPEG, PNG, and WebP images are allowed.');
    }
    return file;
  }
}
