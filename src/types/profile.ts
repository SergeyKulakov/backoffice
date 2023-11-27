export interface UploadCsvData extends FormData {
  type: number;
  researcher: string;
  file: File | null;
}

export interface Location {
  country: string;
  short: string;
  city: string;
  state: string;
  default: string;
}

export interface profileState {
  isSuccess: boolean;
  errorMessage: any | null;
  profile: Profile[];
  profileItem: any;
}

export interface Location {
  country: string;
  short: string;
  city: string;
  state: string;
  default: string;
}

export interface PrimaryLocale {
  country: string;
  language: string;
}

export interface SupportedLocale {
  country: string;
  language: string;
}

export interface ProfileLanguage {
  name: string;
  proficiency: string;
}

export interface Languages {
  primaryLocale: PrimaryLocale;
  supportedLocales: SupportedLocale[];
  profileLanguages: ProfileLanguage[];
}

export interface Start {
  month: number;
  year: number;
}

export interface End {
  month: number;
  year: number;
}

export interface Date {
  start: Start;
  end: End;
}

export interface School {
  name: string;
  logo: string;
}

export interface Education {
  date: Date;
  school: School;
  degreeName: string;
  fieldOfStudy: string;
}

export interface Start2 {
  month: number;
  year: number;
}

export interface End2 {
  month: number;
  year: number;
}

export interface Employees {
  start: Start2;
  end: End2;
}

export interface Company {
  name: string;
  logo: string;
  url: string;
  employees: Employees;
}

export interface Start3 {
  month: number;
  year: number;
}

export interface End3 {
  month: number;
  year: number;
}

export interface Date2 {
  start: Start3;
  end: End3;
}

export interface Start4 {
  month: number;
  year: number;
}

export interface End4 {
  month: number;
  year: number;
}

export interface Date3 {
  start: Start4;
  end: End4;
}

export interface ProfilePosition {
  location: string;
  date: Date3;
  company: string;
  description: string;
  title: string;
}

export interface PositionGroup {
  company: Company;
  companyUrl: string;
  date: Date2;
  profilePositions: ProfilePosition[];
}

export interface Profile {
  profileId: string;
  firstName: string;
  lastName: string;
  subTitle: string;
  birthDate: string;
  profilePicture: string;
  summary: string;
  location: Location;
  premium: boolean;
  influencer: boolean;
  treasuryMedia: any[];
  languages: Languages;
  industry: string;
  education: Education[];
  patents: any[];
  awards: any[];
  certifications: any[];
  organizations: any[];
  projects: any[];
  publications: any[];
  courses: any[];
  testScores: any[];
  positionGroups: PositionGroup[];
  volunteerExperiences: any[];
  skills: string[];
}
