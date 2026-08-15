import httpClient from '../../lib/httpClient';
import { getVaccineTimeline, applyVaccine } from './vaccine.service';

import type { VaccineTimelineItem } from '../../@types/models';

jest.mock('../../lib/httpClient', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

const mockGet = httpClient.get as jest.Mock;
const mockPost = httpClient.post as jest.Mock;

describe('vaccine.service', () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockPost.mockReset();
  });

  it('getVaccineTimeline fetches the timeline for a profile and unwraps content', async () => {
    const content = [{ vaccine: {} }] as VaccineTimelineItem[];
    mockGet.mockResolvedValue({ data: { content } });

    const result = await getVaccineTimeline(42);

    expect(mockGet).toHaveBeenCalledWith('/vaccine/timeline?profileId=42');
    expect(result).toEqual(content);
  });

  it('applyVaccine posts the QR data to the apply endpoint', async () => {
    mockPost.mockResolvedValue({ data: { ok: true } });
    const qrData = 'encoded-qr';

    const result = await applyVaccine(7, qrData);

    expect(mockPost).toHaveBeenCalledWith(
      '/vaccine/apply?profileId=7&encoded-qr',
      qrData,
    );
    expect(result).toEqual({ ok: true });
  });
});
