export interface CsvData {
  id: number;
  title: string;
  timestamp: string;
  researcher: string;
  type: string;
}
export type Side = "Buyside" | "Sellside";

export interface SideOption {
  label: Side;
  value: number;
}

export interface IndexOption {
  label: string;
  value: number;
}

export interface ResearcherOption {
  label: string;
  value: string;
}

export interface ResearcherList {
  data: [
    {
      email: string;
      firstName: string;
      lastName: string;
      role: number;
      isActive: boolean;
      created_at: string;
      updated_at: string;
      id: string;
    }
  ];
  meta: {
    count: number;
  };
}
