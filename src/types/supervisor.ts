export interface ButtonsData {
  title: string;
  id: number;
}
export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  supervisorBuyside: ValuesSupervisiorBuysideNew[] | null;
  supervisorSellside: ValuesSupervisiorBuysideNew[] | null;
  errorMessage: any | null;
}

export interface NotificationData {
  id: number;
  title: string;
  blockInfo: BlockInfoData[];
}

interface CheckboxData {
  id: number;
  name: string;
}
interface BlockInfoData {
  id: number;
  name: string;
  description: string;
  checkbox?: CheckboxData[];
}
export interface DataSupervisor {
  id: number;
  title: string;
  description: string;
}
export interface DataCarrier {
  id: number;
  title: string;
  description: string;
}

export interface Education {
  university: {
    moveId: string;
    value: string;
    status: number;
    isMarked?: boolean;
  };
  degreeType: {
    moveId: string;
    value: string;
    status: number;
    isMarked?: boolean;
  };
  subject: {
    moveId: string;
    value: string;
    isMarked?: boolean;
  };
  isHidden: boolean;
  startDate: {
    moveId: string;
    value: {
      month: number | null;
      year: number | null;
    };
    isMarked: boolean;
  };
  endDate: {
    moveId: string;
    value: {
      month: number | null;
      year: number | null;
    };
    isMarked: boolean;
  };
  [key: string]: any;
}

type Roles = {
  roleTitle?: string;
  startDate?: string;
  endDate?: string;
  location: string;
};
export interface Сareer {
  companyName: {
    moveId: string;
    value: string;
    status: number;
    isMarked?: boolean;
  };
  startDate: {
    moveId: string;
    value: {
      month: number;
      year: number;
    };
    isMarked: boolean;
  };
  endDate: {
    moveId: string;
    value: {
      month: number | null;
      year: number | null;
    };
    isMarked: boolean;
  };
  isPrimarySelected: boolean;
  title: {
    moveId: string;
    value: string;
    isMarked?: boolean;
  };
  location: {
    moveId: string;
    value: string;
    status: number;
    isMarked?: boolean;
  };
  [key: string]: any;
}

type SuggestedTeamPrimary = {
  values: {
    value: string;
    label: string;
  }[];
  isMarked: boolean;
};

export interface ValuesSupervisiorBuysideNew {
  joinedCurrentEmployerDate?: string;
  startedFirstSellsideRoleDate?: string;
  startedFirstInvestmentRoleDate?: string;
  isArchived: boolean;
  dictionaries: {
    diversity: [
      {
        dictionaryId: string;
        name: string;
      }
    ];
    gender: [
      {
        dictionaryId: string;
        name: string;
      }
    ];
    suggestedStrategy: any;
    suggestedCoverage: [
      {
        dictionaryId: string;
        name: string;
      }
    ];
    suggestedGeography: [
      {
        dictionaryId: string;
        name: string;
      }
    ];
    suggestedTeam: [
      {
        dictionaryId: string;
        name: string;
      }
    ];
  };
  profileId: string;
  profileImage: string;
  profileType: string;
  linkedinUrl: string;
  info: {
    suggestedTeam?: any;
    isNoSellsideMarked?: boolean;
    firstName: { isMarked: boolean; moveId: string; value: string };
    websiteLink: { isMarked: boolean; moveId: string; value: string };
    lastName: { isMarked: boolean; moveId: string; value: string };
    startCurrentEmployeer: {
      moveId: string | null;
      value: string | null;
      isMarked: boolean;
    };
    startFirstBuyside: {
      moveId: string | null;
      value: string | null;
      isMarked: boolean;
    };
    gender: {
      value?: string;
      dictionaryId: string | null;
      isMarked: boolean;
    };
    diversity: {
      dictionaryId: string | null;
      isMarked: boolean;
      value?: string;
    };
    // suggestedTeamPrimary: SuggestedTeamPrimary;
    // suggestedTeamSecondary: any;
    suggestedCoverage: {
      value?: string;
      dictionaryId: string | null;
      isMarked: boolean;
    };
    suggestedGeography: {
      value?: string;
      dictionaryId: string | null;
      isMarked: boolean;
    };
    // startedFirstSellsideRoleDate?: any;
    // joinedCurrentEmployerDate?: any;
    // startedFirstInvestmentRoleDate?: any;
    // isNoSellsideMarked?: any;
    // suggestedSellsideTeam?: any;
    languages: {
      native: {
        IsMarked: boolean;
        moveId: string;
        value: string;
      };
      others: [
        {
          IsMarked: boolean;
          moveId: string;
          value: string;
        }
      ];
    };
    suggestedTeams: [
      {
        dictionaryId: string;
        suggestedTeam?: string;
      }
    ];
    education: Education[];
    suggestedStrategy: any;
    startFirstSellside: {
      moveId?: string | null;
      value?: string | null;
      isMarked?: boolean;
    };

    subtitle: {
      isMarked: boolean;
      moveId: string | null;
      value: string | null;
    };
    summary: { isMarked: boolean; moveId: string | null; value: string | null };
    currentEmployment: Сareer[];
  };
}

export interface IndexQueueData {
  university: {
    moveId: string;
    value: string;
    status: number;
  };
  degreeType: {
    moveId: string;
    value: string;
    status: number;
  };
  subject: {
    moveId: string;
    value: string;
    isMarked: boolean;
  } | null;
  isHidden: boolean;
  startDate: {
    moveId: string;
    value: {
      month: number | null;
      year: number;
    };
    isMarked: boolean;
  };
  endDate: {
    moveId: string;
    value: {
      month: number | null;
      year: number;
    };
    isMarked: boolean;
  };
}

interface IUniversity {
  moveId: string;
  value: string;
  status: number;
}

interface ISubject {
  moveId: string;
  value: string | null;
  isMarked: boolean;
}

interface IDate {
  moveId: string;
  value: {
    month: number | null;
    year: number | null;
  };
  isMarked: boolean;
}

export interface IJob {
  companyName: {
    moveId: string;
    value: string;
    status: number;
  };
  startDate: IDate;
  endDate: IDate;
  isPrimarySelected?: boolean;
  title?: {
    moveId: string;
    value: string;
    isMarked: boolean;
  };
  location?: {
    moveId: string;
    value: string;
    isMarked: boolean;
  };
}

export interface IEducation {
  university: IUniversity;
  degreeType: {
    moveId: string;
    value: string;
    status: number;
  };
  subject: ISubject | null;
  isHidden: boolean;
  startDate: IDate;
  endDate: IDate;
}

export type IDataIndex = (IJob | IEducation)[];
