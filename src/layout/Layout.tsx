import React, { useState, useEffect } from "react";
import Form from "../components/form/Form";
import Feed from "../components/feed/Feed";
import JobDetails from "../components/jobDetail/JobDetails";

function Layout(props: any) {
  const [jobId, setJobId] = useState<number | null>(null);
  const [jobTitle, setJobTitle] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  return (
    <>
      {!isApplying ? (
        jobId === null ? (
          <Feed setJobId={setJobId} {...props} />
        ) : (
          <JobDetails
            jobId={jobId}
            setIsApplying={setIsApplying}
            setJobTitle={setJobTitle}
            setJobId={setJobId}
          />
        )
      ) : (
        <Form jobTitle={jobTitle} setIsApplying={setIsApplying} />
      )}
    </>
  );
}

export default Layout;
