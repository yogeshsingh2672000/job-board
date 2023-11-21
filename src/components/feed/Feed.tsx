import React, { useState, useEffect } from "react";

function Feed() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const getJobDetail = async () => {
      const apiUrl = "https://www.reed.co.uk/api/1.0/search?keywords=software";
      const username = "ca04fb35-9dae-499a-805f-f35d79495551";
      const password = "";
      const base64Credentials = btoa(`${username}:${password}`);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${base64Credentials}`,
          "Content-Type": "application/json",
          // Add any other headers your API may require
        },
      });
      const data = await response.json();
      console.log(data.results);
    };
    getJobDetail();
  }, []);
  return (
    <div className="p-8">
      <div className="flex gap-2 justify-evenly items-center mb-8">
        <div className="w-1/4 md:w-[150px]">Search by language</div>
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
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border-none appearance-none rounded-lg bg-gray-100"
            placeholder="Search Mockups, Logos..."
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </div>
      <div className="p-8">Feed</div>
    </div>
  );
}

export default Feed;
