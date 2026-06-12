// GuildPass SDK: Pull in package or module bindings.
import { describe, it, expect, vi, beforeEach } from 'vitest';
// GuildPass SDK: Import external module dependencies.
import { HttpClient } from '../src/http/httpClient';
// GuildPass SDK: Pull in package or module bindings.
import { GuildPassErrorCode } from '../src/errors/errorCodes';

// GuildPass SDK: Test suite container block.
describe('HttpClient', () => {
  // GuildPass SDK: Variable binding initialization.
  const baseUrl = 'https://api.test.com';
  // GuildPass SDK: Local block-scoped constant reference.
  let client: HttpClient;

  // GuildPass SDK: Execution block boundary initialization.
  beforeEach(() => {
    client = new HttpClient(baseUrl);
    vi.stubGlobal('fetch', vi.fn());
    // GuildPass SDK: End of logic containment structure block.
  });

  // GuildPass SDK: Validate unit assertion test case.
  it('should make GET request with correct URL and headers', async () => {
    // GuildPass SDK: Define internal reference identifier.
    const mockResponse = { data: 'test' };
    // GuildPass SDK: Execution block boundary initialization.
    (fetch as any).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
      headers: new Headers(),
      // GuildPass SDK: End of logic containment structure block.
    });

    // GuildPass SDK: Variable binding initialization.
    const result = await client.get('/test-path', { params: { foo: 'bar' } });

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/test-path?foo=bar'),
      // GuildPass SDK: Execution block boundary initialization.
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('should include API key in headers if provided', async () => {
    const clientWithKey = new HttpClient(baseUrl, 'secret-key');
    (fetch as any).mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
      headers: new Headers(),
    });

    await clientWithKey.get('/test');

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-API-Key': 'secret-key',
        }),
      }),
    );
  });

  it('should throw GuildPassError on non-ok response', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not Found' }),
    });

    try {
      await client.get('/not-found');
    } catch (error: any) {
      expect(error.code).toBe(GuildPassErrorCode.NOT_FOUND);
      expect(error.status).toBe(404);
    }
  });

  it('should throw TIMEOUT error on abort', async () => {
    (fetch as any).mockImplementation(() => {
      const error = new Error('AbortError');
      error.name = 'AbortError';
      return Promise.reject(error);
    });

    try {
      await client.get('/timeout');
    } catch (error: any) {
      expect(error.code).toBe(GuildPassErrorCode.TIMEOUT);
    }
  });
});
