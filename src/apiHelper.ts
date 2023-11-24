import axios from "axios";
import { parseDate } from "./utilsFunctions";

const baseURL = "https://job-board-server-5fn4.onrender.com/api/";

const listJobs = async (keyword: string) => {
  try {
    const response = await axios.get(`${baseURL}jobs`, {
      params: {
        keyword: keyword,
      },
    });

    const data = response.data;
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

const getJobDetail = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}job/${id}`);

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { listJobs, getJobDetail, parseDate };
