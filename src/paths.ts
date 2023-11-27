export const paths = {
  index: "/",
  resetPassword: "/reset-password",
  forgotPassword: "/forgot-password",
  users: {
    index: "/users",
    create: "/users/create",
  },
  activeProfiles: {
    index: "/active-profiles",
  },
  csv: {
    upload: "/csv/upload",
    create: "/csv/create",
    update: "/csv/index-update",
  },
  dictionary: {
    index: "/dictionary",
    degreeTypes: "/dictionary/degree-types",
    degreeMain: "/dictionary/degree-types-main",
    createDegreeTypes: "/dictionary/create-degree-types",
    createCountry: "/dictionary/create-country",
    createCity: "/dictionary/cities-create",
    countriesDictionary: "/dictionary/countries",
    degree: {
      index: "/dictionary/degree",
    },
    companies: "/dictionary/companies",
    companiesMain: "/dictionary/companies-main",
    company: { index: "/dictionary/companies" },
    createCompanies: "/dictionary/create-company",
    countries: {
      cities: {
        index: "/dictionary/countries/cities",
      },
      index: "/dictionary/countries",
      countryMain: "/dictionary/countries/countries-main",
    },
    education: {
      index: "/dictionary/education",
      create: "/dictionary/education/create",
      educationMain: "/dictionary/education/education-main",
    },
    suggestedGeography: {
      index: "/dictionary/suggested-geography",
      create: "/dictionary/suggested-geography/create",
    },
    language: {
      index: "/dictionary/languages",
      create: "/dictionary/languages/create",
      languageMain: "/dictionary/languages/language-main",
    },
    gender: {
      index: "/dictionary/gender",
      create: "/dictionary/gender/create",
    },
    diversity: {
      index: "/dictionary/diversity",
      create: "/dictionary/diversity/create",
    },
    companyType: {
      index: "/dictionary/company-type",
      create: "/dictionary/company-type/create",
    },
    suggestedCoverage: {
      index: "/dictionary/suggested-coverage",
      create: "/dictionary/suggested-coverage/create",
    },
    suggestedTeam: {
      index: "/dictionary/suggested-team",
      create: "/dictionary/suggested-team/create",
    },
    suggestedStrategy: {
      index: "/dictionary/suggested-strategy",
      create: "/dictionary/suggested-strategy/create",
    },
  },
  401: "/401",
  404: "/404",
  500: "/500",
};
