const setJobs = (payload: any) => {
  return { type: "ALL", payload: payload };
};

const selectedJob = (payload: any) => {
  return { type: "ONE", payload: payload };
};

export { setJobs, selectedJob };
