import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { DataSource } from 'typeorm';

@Injectable()
export class BookService {
  constructor(private readonly dataSource: DataSource) {}

  async checkOut(customer_id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const res = await axios.post(
            `https://a.khalti.com/api/v2/epayment/initiate/`,
            {
              return_url: `http://localhost:3000/`,
              website_url: 'http://localhost:3000',
              amount: 10000,
              purchase_order_id: customer_id,
              purchase_order_name: 'Test',
              customer_info: {
                name: 'Test User',
                email: 'test@khalti.com',
                phone: '9800000001',
              },
            },
            {
              headers: {
                Authorization: 'key ecac19a435264f7f9653d389c4f5196a',
                'Content-Type': 'application/json',
              },
            },
          );
          console.log(res)

          return res.data.payment_url;

    } catch (error) {
        console.log(error)
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message);
    } finally {
      queryRunner.release;
    }
  }
}
