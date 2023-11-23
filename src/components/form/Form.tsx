import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { validateEmail, validateMobile } from "../../utilsFunctions";

interface jobProp {
  jobTitle: string | null;
}

function Form(props: jobProp | any) {
  const jobDetails = useSelector((state: any) => state.selectedJob);
  const { setIsApplying } = props;
  const [formData, setFormData] = useState({
    jobId: jobDetails.jobId,
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    cover: "",
    file: null as File | null,
    jobTitle: jobDetails.jobTitle,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    file: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, file });
  };

  const handleSubmit = () => {
    let isValid = true;
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      file: "",
    };

    if (formData.firstName === "") {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (formData.lastName === "") {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (formData.email === "") {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (formData.mobile === "") {
      errors.mobile = "Mobile is required";
      isValid = false;
    } else if (!validateMobile(formData.mobile)) {
      errors.mobile = "Invalid mobile number format";
      isValid = false;
    }

    if (formData.file === null) {
      errors.file = "Resume is required";
      isValid = false;
    }

    setValidationErrors(errors);

    if (isValid) {
      setIsSubmit(true);
      console.log("Hi console, Application details are: ", formData);
    }
  };

  return (
    <>
      <div className="h-full flex justify-center items-center">
        <div className="max-w-md mx-auto bg-gray-100 p-8 rounded-xl">
          <button
            onClick={() => {
              setIsApplying(false);
            }}
            className="relative inline-flex items-center justify-center p-0.5 mb-8 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              {`<-`}Back
            </span>
          </button>
          <div className="mb-5 text-gray-500">
            <div>
              Applying to:{" "}
              <span className="text-black">{jobDetails.jobTitle}</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
                disabled={isSubmit}
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                value={formData.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled={isSubmit}
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              disabled={isSubmit}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                disabled={isSubmit}
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mobile
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="file"
                onChange={handleFileChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                accept=".pdf"
                disabled={isSubmit}
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Resume
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              rows={3}
              value={formData.cover}
              onChange={(e: any) =>
                setFormData({ ...formData, cover: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              disabled={isSubmit}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Cover letter (optional)
            </label>
          </div>
          <div className="py-4">
            {validationErrors.firstName != "" ||
            validationErrors.lastName != "" ||
            validationErrors.email ||
            validationErrors.mobile != ""
              ? "Fill all the details properly"
              : ""}
          </div>
          {isSubmit === false ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          ) : (
            <div className="flex justify-center items-center">
              {isSubmit && <div>✅Submited</div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;
