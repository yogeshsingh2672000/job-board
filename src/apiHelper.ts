import { parseDate } from "./utilsFunctions";

const listJobs = async (keyword: string) => {
  try {
    const response = await fetch(
      `https://job-board-server-5fn4.onrender.com/api/jobs?keyword=${keyword}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    data.sort((a: any, b: any) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      return dateB.getTime() - dateA.getTime();
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getJobDetail = async (id: number) => {
  try {
    const response = await fetch(
      `https://job-board-server-5fn4.onrender.com/api/job/${id}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { listJobs, getJobDetail, parseDate };
