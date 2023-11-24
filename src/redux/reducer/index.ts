import { combineReducers } from "redux";
import { jobReducer, selectedJob, searchQuery } from "./jobReducer";

const rootReducer = combineReducers({
  allJobs: jobReducer,
  selectedJob: selectedJob,
  searchQuery: searchQuery,
});

export default rootReducer;
