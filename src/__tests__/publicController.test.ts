import request from 'supertest';
import app from '../index';
import { AirdropJobStore } from '../models/airdropJob';

const API_KEY = process.env.AUTHORIZATION || 'MOCK_JWT_AUTH';

describe('Public Controller', () => {
  const code = 'A1B2C3';

  it('should generate redeem code', async () => {
    const data = {
      contractAddress: 'test-address',
      quantity: 10,
    };
    const response = await request(app)
      .post('/api/public/generate-redeem-code')
      .set('authorization', API_KEY)
      .send(data);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.code).toBeTruthy();
  });

  // it('should redeem NFT', async () => {
  //   const testData = {
  //     contractAddress: 'test-address',
  //     quantity: 10,
  //   };
  //   AirdropJobStore.generateAirdropJob(code, testData.contractAddress, testData.quantity);
  //   const redeemData = {
  //     code: code,
  //     recipient: 'test-recipient',
  //   };
  //   const response = await request(app)
  //     .post('/api/public/redeem-nft')
  //     .set('authorization', API_KEY)
  //     .send(redeemData);
  //   expect(response.status).toBe(200);
  //   expect(response.body.success).toBe(true);
  //   expect(response.body.data.message).toBe('NFT redeemed successfully');
  //   const redeemedJob = AirdropJobStore.getAirdropJobByCode(code);
  //   expect(redeemedJob?.redeemed).toBe(true);
  // });
});
