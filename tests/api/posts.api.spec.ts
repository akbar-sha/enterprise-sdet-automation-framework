
import { test, expect } from '@playwright/test';
import { ApiClient } from '../../api/ApiClient';

const baseURL = 'https://jsonplaceholder.typicode.com';

test.describe('Posts REST API Tests', () => {
  let apiClient: ApiClient;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request, baseURL);
  });

  test('GET - Retrieve a post successfully', async () => {
    const response = await apiClient.get('/posts/1');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.id).toBe(1);
    expect(responseBody.userId).toBe(1);
    expect(responseBody.title).toBeTruthy();
    expect(typeof responseBody.body).toBe('string');

    console.log('GET response:', responseBody);
  });

  test('POST - Create a new post successfully', async () => {
    const payload = {
      title: 'Enterprise SDET Automation',
      body: 'API testing using Playwright and TypeScript',
      userId: 1
    };

    const response = await apiClient.post('/posts', payload);

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.title).toBe(payload.title);
    expect(responseBody.body).toBe(payload.body);
    expect(responseBody.userId).toBe(payload.userId);
    expect(responseBody.id).toBeDefined();

    console.log('POST response:', responseBody);
  });

  test('PUT - Update an existing post', async () => {
    const payload = {
      id: 1,
      title: 'Updated Enterprise SDET Post',
      body: 'Testing PUT requests with Playwright',
      userId: 1
    };

    const response = await apiClient.put('/posts/1', payload);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated Enterprise SDET Post');
  });

  test('PATCH - Partially update a post', async () => {
    const response = await apiClient.patch('/posts/1', {
      title: 'Updated Using PATCH'
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated Using PATCH');
  });

  test('DELETE - Delete an existing post', async () => {
    const response = await apiClient.delete('/posts/1');

    expect(response.status()).toBe(200);
  });

  test('GET - Return 404 for nonexistent post', async () => {
    const response = await apiClient.get('/posts/999999');

    expect(response.status()).toBe(404);
  });
});




 
