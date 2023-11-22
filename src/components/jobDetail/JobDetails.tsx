import React, { useEffect, useState } from "react";

function JobDetails(props: any) {
  const { jobId, setIsApplying, setJobTitle } = props;
  const [JobDetails, setJobDetails] = useState<any>(null);

  const getJobDetail = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/job/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setJobDetails(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getJobDetail(jobId);
    console.log(JobDetails);
  }, []);

  const handleApply = () => {
    setIsApplying(true);
    setJobTitle(JobDetails.jobTitle);
  };

  return (
    <>
      {JobDetails && (
        <div className="flex flex-col items-center gap-4 py-12 px-8">
          <div className="text-3xl">{JobDetails.jobTitle}</div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
            <div>
              <span className="text-gray-400 font-bold">Company: </span>
              {JobDetails.employerName}
            </div>
            <div>
              <span className="text-gray-400 font-bold">Type: </span>
              {JobDetails.contractType}
            </div>
            <div>
              <span className="text-gray-400 font-bold">Location: </span>
              {JobDetails.locationName}
            </div>
            <button
              onClick={handleApply}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Apply
            </button>
          </div>
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: JobDetails.jobDescription }}
            />
          </div>
          <button
            onClick={handleApply}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Apply
          </button>
        </div>
      )}
    </>
  );
}

export default JobDetails;
