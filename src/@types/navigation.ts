import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

import type { Campaign, CampaignPlace } from './models';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ProfileList: undefined;
  Dependent: { id: number; name: string };
  AddDependent: undefined;
  MyVaccines: { id: number };
  ApplyVaccine: { id: number };
  Campaigns: { id: number };
  CampaignDetail: Campaign;
  CampaignMap: { places: CampaignPlace[] };
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;

export type RouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
