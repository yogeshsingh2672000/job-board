const setJobs = (payload: any) => {
  return { type: "ALL", payload: payload };
};

const selectedJob = (payload: any) => {
  return { type: "ONE", payload: payload };
};

const setSearchQuery = (payload: string) => {
  return { type: "QUERY", payload: payload };
};

export { setJobs, selectedJob, setSearchQuery };
