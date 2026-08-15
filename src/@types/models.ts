export interface Vaccine {
  name: string;
  preventedDiseases: string;
  initialRange: number;
  finalRange: number;
  observation: string;
  dosage: string;
  range: string;
  requirement: string | null;
  applied?: boolean;
  nextVaccine: Vaccine | null;
}

export interface VaccineTimelineItem {
  vaccine: Vaccine;
  applied: boolean;
}

export interface DependentProfile {
  id: number;
  firstName: string;
  lastName: string;
}

export interface CampaignPlace {
  id?: number;
  name: string;
  applied: number;
  amount: number;
  latitude: number;
  longitude: number;
}

export interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string | null;
  places: CampaignPlace[];
}
