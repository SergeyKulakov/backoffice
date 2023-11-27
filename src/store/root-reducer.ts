import { combineReducers } from "@reduxjs/toolkit";
import { reducer as usersReducer } from "../slices/users";
import { reducer as educationReducer } from "../slices/educationSlice";
import { reducer as degreeReducer } from "../slices/degreeSlice";
import { reducer as countriesReducer } from "../slices/countriesSlice";
import { reducer as companyReducer } from "../slices/companiesSlice";
import { reducer as languageReducer } from "../slices/languageSlice";
import { reducer as strategyReducer } from "../slices/strategySlice";
import { reducer as companyTypeReducer } from "../slices/companyTypesSlice";
import { reducer as geographyReducer } from "../slices/suggestedGeographySlice";
import { reducer as genderTypeReducer } from "../slices/genderSlice";
import { reducer as diversityReducer } from "../slices/diversitySlice";
import { reducer as coverageReducer } from "../slices/suggestedCoverageSlice";
import { reducer as teamReducer } from "../slices/suggestedTeamSlice";
import { reducer as researcherReducer } from "../slices/researcherSlice";
import { reducer as supervisorReducer } from "../slices/supervisorSlice";
import { reducer as counterReducer } from "../slices/counterSlice";

export const rootReducer = combineReducers({
  users: usersReducer,
  education: educationReducer,
  language: languageReducer,
  degree: degreeReducer,
  country: countriesReducer,
  company: companyReducer,
  companyType: companyTypeReducer,
  geography: geographyReducer,
  diversity: diversityReducer,
  gender: genderTypeReducer,
  coverage: coverageReducer,
  suggestedTeam: teamReducer,
  strategy: strategyReducer,
  researcher: researcherReducer,
  supervisor: supervisorReducer,
  counter: counterReducer,
});
