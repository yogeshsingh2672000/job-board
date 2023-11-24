import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectedJob } from "../../redux/action/jobAction";
import { getJobDetail } from "../../apiHelper";

function JobDetails() {
  const JobDetails = useSelector((state: any) => state.selectedJob);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const data = await getJobDetail(id ? id : "");
        dispatch(selectedJob(data));
      } catch (error) {
        console.log("Error while fetching single job detail", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!JobDetails) {
      fetch();
    }
  }, []);

  return (
    <div>
      <Link
        to={"/"}
        onClick={() => {
          // setJobId(null);
          dispatch(selectedJob(null));
        }}
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
          {`<-`}Back
        </span>
      </Link>
      {isLoading ? (
        <div className="flex justify-center items-center text-black">
          Loading...
        </div>
      ) : (
        JobDetails && (
          <div className="flex flex-col items-center gap-4 pb-12 px-8 p-6 bg-gray-100 rounded-xl">
            <div className="text-3xl">{JobDetails.jobTitle}</div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center">
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
              <Link
                to={`/job/${id}/apply`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Apply
              </Link>
            </div>
            <div>
              <div
                dangerouslySetInnerHTML={{ __html: JobDetails.jobDescription }}
              />
            </div>
            <Link
              to={`/job/${id}/apply`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Apply
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default JobDetails;
