import React, { useState, useEffect } from "react";
import axios from "axios";

function Feed() {
  const [jobs, setJobs] = useState(null);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const getJobDetail = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/jobs?keyword=software"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
            value={userInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInput(e.target.value)
            }
            className="block w-full p-4 ps-10 text-sm text-gray-900 border-none appearance-none rounded-lg bg-gray-100"
            placeholder="Software Engineer, full stack developer"
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
