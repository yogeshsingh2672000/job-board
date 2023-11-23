import { combineReducers } from "redux";
import { jobReducer, selectedJob } from "./jobReducer";

const rootReducer = combineReducers({
  allJob: jobReducer,
  selectedJob: selectedJob,
});

export default rootReducer;
