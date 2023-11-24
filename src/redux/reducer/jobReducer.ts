interface Job {
  applications: number;
  currency: string;
  date: string;
  employerId: number;
  employerName: string;
  employerProfileId: number;
  employerProfileName: string;
  expirationDate: string;
  jobDescription: string;
  jobId: number;
  jobTitle: string;
  jobUrl: string;
  locationName: string;
  maximumSalary: number;
  minimumSalary: number;
}

interface AllJob {
  products: Job[];
}

interface Action {
  type: string;
  payload: AllJob;
}

const jobReducer = (
  state: AllJob | null = null,
  { type, payload }: Action
): AllJob | null => {
  switch (type) {
    case "ALL":
      return payload;
    default:
      return state;
  }
};

interface SelectedJob {
  employerId: number;
  employerName: string;
  jobId: number;
  jobTitle: string;
  locationName: string;
  minimumSalary: number;
  maximumSalary: number;
  yearlyMinimumSalary: number;
  yearlyMaximumSalary: number;
  currency: string;
  salaryType: string;
  salary: string;
  datePosted: string;
  expirationDate: string;
  externalUrl: string;
  jobUrl: string;
  partTime: boolean;
  fullTime: boolean;
  contractType: string;
  jobDescription: string;
  applicationCount: number;
}

interface SelectedAction {
  type: string;
  payload: SelectedJob;
}

const selectedJob = (
  state: SelectedJob | null = null,
  { type, payload }: SelectedAction
): SelectedJob | null => {
  switch (type) {
    case "ONE":
      return payload;
    default:
      return state;
  }
};

interface SearchQuery {
  type: string;
  payload: string;
}

const searchQuery = (
  state: string = "Software Developer",
  { type, payload }: SearchQuery
) => {
  switch (type) {
    case "QUERY":
      return payload;
    default:
      return state;
  }
};

export { jobReducer, selectedJob, searchQuery };
