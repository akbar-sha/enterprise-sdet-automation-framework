
import { test, expect } from '@playwright/test';

const baseURL = 'https://jsonplaceholder.typicode.com';

test.describe('Posts REST API Tests', () => {

  test('GET - Retrieve a post successfully', async ({ request }) => {

    const response = await request.get(`${baseURL}/posts/1`);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1);
    expect(responseBody.userId).toBe(1);
    expect(responseBody.title).toBeTruthy();
    expect(typeof responseBody.body).toBe('string');

    console.log('GET response:', responseBody);
  });

  test('POST - Create a new post successfully', async ({ request }) => {

    const payload = {
      title: 'Enterprise SDET Automation',
      body: 'API testing using Playwright and TypeScript',
      userId: 1
    };

    const response = await request.post(`${baseURL}/posts`, {
      data: payload
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.title).toBe(payload.title);
    expect(responseBody.body).toBe(payload.body);
    expect(responseBody.userId).toBe(payload.userId);
    expect(responseBody.id).toBeDefined();

    console.log('POST response:', responseBody);
  });

});
