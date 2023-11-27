export type Gender = "Male" | "Female";

export interface AuthState {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  researcherBuyside: ValuesResearcherBuysideNew[] | null;
  researcherSellside: ValuesResearcherBuysideNew[] | null;
  researcherLists: IResearcherList | null;
  errorMessage: any | null;
}

export interface GenderOption {
  label: Gender;
  value: number;
}

export interface MockOption {
  label: string;
  value: number;
}

export interface Values {
  type: number;
  firstName: string;
  lastName: string;
  gender: string;
  joined: any;
}
export interface ValuesResearcherBuyside extends Values {
  diversity: string;
}

export interface DataResearcher {
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

export interface CurrentEmployment {
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

interface Role {
  location: string | null;
  roleTitle: string;
  startDate: string;
  endDate: string;
}
export interface ISecondaryTeam {
  dictionaryId: string;
  isMarked: boolean;
}

export interface ISecondaryStrategy {
  dictionaryId: string;
  isMarked: boolean;
  sub?: ISecondaryTeam[];
}

type SuggestedTeamPrimary = {
  value: {
    value: string;
    label: string;
  }[];
  isMarked: boolean;
};

export interface ValuesResearcherBuysideNew {
  linkedinUrl: string;
  profileImage: string;
  profileType: string;
  isArchived: boolean;
  info: {
    firstName: {
      value: string;
      isMarked: boolean;
    };
    lastName: {
      value: string;
      isMarked: boolean;
    };
    gender: any;
    diversity: any;
    suggestedTeamPrimary: SuggestedTeamPrimary;
    suggestedTeamSecondary: any;
    suggestedStrategy: any;
    suggestedCoverage: any;
    suggestedGeography: any;
    startedFirstSellsideRoleDate: any;
    joinedCurrentEmployerDate: any;
    startedFirstInvestmentRoleDate: any;
    isNoSellsideMarked: any;
    suggestedSellsideTeam: any;
    currentEmployment: CurrentEmployment[];
    education: Education[];
  };
}

export interface IResearcherSellside {
  isArchived: boolean;
  profileId: string;
  profileImage?: string;
  profileType: string;
  info: {
    firstName: {
      moveId: string;
      value: string;
      isMarked: boolean;
    };
    gender: {
      dictionaryId: string | null;
      isMarked: boolean;
    };
    diversity: {
      dictionaryId: string | null;
      isMarked: boolean;
    };
    suggestedTeams: any;
    lastName: {
      moveId: string;
      value: string;
      isMarked: boolean;
    };
    startFirstSellside: {
      moveId?: string;
      value?: string;
      isMarked?: boolean;
    };
    websiteLink: {
      value: string;
      isMarked: boolean;
    };
    startCurrentEmployeer: {
      moveId: string;
      value: string;
      isMarked: boolean;
    };
    education: {
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
      };
      isHidden: boolean;
      startDate: {
        moveId: string;
        value: {
          month: null | number;
          year: null | number;
        };
        isMarked: boolean;
      };
      endDate: {
        moveId: string;
        value: {
          month: null | number;
          year: number;
        };
        isMarked: boolean;
      };
    }[];
  };
}
export interface IResearcherList {
  data: [
    {
      id: string;
      value: string;
    }
  ];
  meta: {
    count: number;
  };
}
