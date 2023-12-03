import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setSearchQuery } from "../../redux/action/jobAction";
import { listJobs, parseDate } from "../../apiHelper";

function Feed() {
  const { allJobs, searchQuery } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState<string>(searchQuery);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDate] = useState(new Date());
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const data = await listJobs(userInput);
      dispatch(setJobs(data));
    } catch (error) {
      console.log("error in search api", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!allJobs) {
      handleSearch();
    }
  }, []);

  const handleEnter = async (e: any) => {
    if (e.keyCode === 13 && searchRef.current === document.activeElement) {
      handleSearch();
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserInput(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <div className="md:p-8">
      <div className="flex flex-col md:flex-row gap-2 justify-evenly items-center mb-8">
        <div className="w-full text-center md:w-[150px]">Search by role</div>
        <div className="relative w-3/4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            ref={searchRef}
            type="search"
            value={searchQuery}
            onKeyDown={handleEnter}
            onChange={handleUserInput}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border-none appearance-none rounded-lg bg-gray-100"
            placeholder="Software Engineer, full stack developer, React, Node"
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="hidden text-white md:block absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
        <button
          onClick={handleSearch}
          type="submit"
          className="md:hidden text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        allJobs != null && (
          <div className="p-8 bg-gray-100 rounded-xl grid grid-cols-1 gap-4">
            {allJobs != null &&
              allJobs.map((item: any, index: number) => {
                const postedDate = parseDate(item.date);
                const differenceInDays = Math.floor(
                  (currentDate.getTime() - postedDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                );

                return (
                  <Link
                    to={`/job/${item.jobId}`}
                    key={index}
                    className="grid grid-cols-3 bg-gray-50 p-4 rounded cursor-pointer shadow hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    <div className="col-span-3 md:col-span-2">
                      <div className="">
                        <span className="text-gray-600 text-sm">
                          Company Name:
                        </span>{" "}
                        {item.employerName}
                      </div>
                      <div className="">
                        <span className="text-gray-600 text-sm">Position:</span>{" "}
                        {item.jobTitle}
                      </div>
                      <div className="">
                        <span className="text-gray-600 text-sm">Location:</span>{" "}
                        {item.locationName}
                      </div>
                    </div>
                    <div className="pt-4 w-[98px] md:pt-0 md:w-full">
                      <div className="text-xs flex justify-center items-center">
                        {isNaN(differenceInDays)
                          ? "Posted recently"
                          : `Posted ${differenceInDays} days ago`}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        )
      )}
    </div>
  );
}

export default Feed;
