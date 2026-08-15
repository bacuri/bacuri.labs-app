import httpClient from '../../lib/httpClient';
import type { DependentProfile } from '../../@types/models';

export interface UserResponse {
  content: {
    dependentProfiles: DependentProfile[];
  };
}

export async function getUser(): Promise<UserResponse> {
  const response = await httpClient.get<UserResponse>('/user');
  return response.data;
}

export async function createDependentProfile(
  profileData: any,
): Promise<unknown> {
  const response = await httpClient.post('/dependent-profile', profileData);
  return response.data;
}
