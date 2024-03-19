import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

const filename = (req: any, file: any, callback: any) => {
  const fileExtName = extname(file.originalname);

  callback(null, `${uuid()}${fileExtName}`);
};

export { filename };