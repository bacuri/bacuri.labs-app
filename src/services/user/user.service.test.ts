import httpClient from '../../lib/httpClient';
import { getUser, createDependentProfile } from './user.service';

jest.mock('../../lib/httpClient', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

const mockGet = httpClient.get as jest.Mock;
const mockPost = httpClient.post as jest.Mock;

describe('user.service', () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
  });

  it('getUser fetches /user', async () => {
    const response = {
      content: {
        dependentProfiles: [{ id: 1, firstName: 'John', lastName: 'Doe' }],
      },
    };
    mockGet.mockResolvedValue({ data: response });

    const result = await getUser();

    expect(mockGet).toHaveBeenCalledWith('/user');
    expect(result).toEqual(response);
  });

  it('createDependentProfile posts the profile data to /dependent-profile', async () => {
    mockPost.mockResolvedValue({ data: { id: 9 } });
    const profileData = { profile: { firstName: 'Jane' } };

    const result = await createDependentProfile(profileData);

    expect(mockPost).toHaveBeenCalledWith('/dependent-profile', profileData);
    expect(result).toEqual({ id: 9 });
  });
});
