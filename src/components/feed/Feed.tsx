import React, { useState, useEffect, useRef } from "react";

function Feed(props: any) {
  const { setJobId, jobListings, setJobListings } = props;
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDate] = useState(new Date());
  const searchRef = useRef<HTMLInputElement>(null);

  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    return new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10)
    );
  };

  const listJobs = async (keyword: string) => {
    try {
      const response = await fetch(
        `https://job-board-sable.vercel.app:3001/api/jobs?keyword=${keyword}`
      );
      // const response = await fetch(
      //   `http://localhost:3001/api/jobs?keyword=${keyword}`
      // );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      data.sort((a: any, b: any) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);

        return dateB.getTime() - dateA.getTime();
      });
      setJobListings(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async (e: any) => {
    if (e.keyCode === 13 && searchRef.current === document.activeElement) {
      setJobListings(null);
      setIsLoading(true);
      await listJobs(userInput);
    }
    setIsLoading(false);
  };

  return (
    <div className="p-8">
      <div className="flex gap-2 justify-evenly items-center mb-8">
        <div className="w-1/4 md:w-[150px]">Search by role</div>
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
            value={userInput}
            onKeyDown={handleSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInput(e.target.value)
            }
            className="block w-full p-4 ps-10 text-sm text-gray-900 border-none appearance-none rounded-lg bg-gray-100"
            placeholder="Software Engineer, full stack developer, React, Node"
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </div>
      {isLoading === true ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        ""
      )}

      {jobListings != null && (
        <div className="p-8 bg-gray-100 rounded-xl grid grid-cols-1 gap-4">
          {jobListings != null &&
            jobListings.map((item: any, index: number) => {
              const postedDate = parseDate(item.date);
              const differenceInDays = Math.floor(
                (currentDate.getTime() - postedDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              );

              return (
                <div
                  onClick={() => setJobId(item.jobId)}
                  key={index}
                  className="grid grid-cols-3 bg-gray-50 p-4 rounded cursor-pointer shadow hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  <div className="col-span-2">
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
                  <div>
                    <div className="text-xs flex justify-center items-center">
                      {isNaN(differenceInDays)
                        ? "Posted recently"
                        : `Posted ${differenceInDays} days ago`}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Feed;
