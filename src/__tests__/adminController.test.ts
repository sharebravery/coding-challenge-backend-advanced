import request from 'supertest';
import app from '../index';
import { AirdropJobStore } from '../models/airdropJob';

const API_KEY = process.env.AUTHORIZATION || 'MOCK_JWT_AUTH';
const code = 'test-code-555';

const adminUser = {
    role: 'admin',
};

beforeEach(() => {
    const testData = {
        contractAddress: 'test-address',
        quantity: 10,
        redeemed: false,
    };
    AirdropJobStore.generateAirdropJob(code, testData.contractAddress, testData.quantity);
});

afterEach(() => {
    AirdropJobStore.deleteAirdropJob(code);
});

describe('Admin Controller', () => {
    it('should list airdrop jobs', async () => {
        const response = await request(app)
            .get('/api/admin/airdrop-jobs')
            .set('authorization', API_KEY)
            .set('user', JSON.stringify(adminUser));
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.jobs.length).toBeGreaterThan(0);
    });

    it('should retrieve airdrop job by code', async () => {
        const response = await request(app)
            .get(`/api/admin/airdrop-jobs/${code}`)
            .set('authorization', API_KEY)
            .set('user', JSON.stringify(adminUser));
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.job.code).toBe(code);
    });

    it('should update airdrop job', async () => {
        const newData = {
            quantity: 20,
        };
        const response = await request(app)
            .put(`/api/admin/airdrop-jobs/${code}`)
            .set('authorization', API_KEY)
            .set('user', JSON.stringify(adminUser))
            .send(newData);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.message).toBe('Airdrop job updated successfully');
        const updatedJob = AirdropJobStore.getAirdropJobByCode(code);
        expect(updatedJob?.quantity).toBe(newData.quantity);
    });

    it('should delete airdrop job', async () => {
        const response = await request(app)
            .delete(`/api/admin/airdrop-jobs/${code}`)
            .set('authorization', API_KEY)
            .set('user', JSON.stringify(adminUser));
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.message).toBe('Airdrop job deleted successfully');
        const deletedJob = AirdropJobStore.getAirdropJobByCode(code);
        expect(deletedJob).toBeUndefined();
    });
});
