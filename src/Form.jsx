import React, { useState, useRef } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    github: "",
  });
  const fileRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [number, setNumber] = useState("");

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const randomNumber = () => {
    let generatedNumber = "#";

    for (let i = 0; i < 5; i++) {
      generatedNumber += Math.floor(Math.random() * 9);
    }

    setNumber(generatedNumber);
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file) {
      const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowedFileTypes.includes(file.type)) {
        setFileError("Invalid file type. Please upload an image.");
        return;
      }

      if (file.size > maxSizeBytes) {
        setFileError("File too large. Please upload a photo under 500KB");
        return;
      }

      setFile(URL.createObjectURL(file));
      setFileError("");
    }
  };

  const removeFile = () => {
    setFile("");
    setFileError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = { name: "", email: "", github: "" };

    if (!name || name.length < 3) {
      errors.name = "Please enter your full name.";
    }

    if (!email) {
      errors.email = "Please enter a valid email address.";
    }

    if (!github || github.length < 2) {
      errors.github = "Please enter your GitHub username.";
    }

    if (errors.name || errors.email || errors.github) {
      setFormErrors(errors);
    }

    if (name && email && github && file) {
      setIsSubmitted(true);
      randomNumber();
      setFormErrors({ name: "", email: "", github: "" });
    }
  };

  return (
    <>
      <div className="font-primary text-neutral-3 pt-8  px-5 pb-10">
        <div className="flex justify-center">
          <img className="w-44" src="/logo/logo-full.svg" alt="Coding Conf" />
        </div>
        <div className="flex items-center flex-col gap-10">
          <div className="flex flex-col items-center justify-center text-center mt-10 gap-5">
            <h1 className="text-3xl md:text-5xl font-bold max-w-md md:max-w-2xl text-neutral-0">
              {isSubmitted ? (
                <>
                  Congrats{" "}
                  {name
                    .split(" ")
                    .map((n) => (
                      <span className="text-gradient text-3xl md:text-5xl">
                        {n}
                      </span>
                    ))
                    .reduce((prev, curr) => [prev, " ", curr])}
                  !, Your ticket is ready.
                </>
              ) : (
                "Your Journey To Coding Conf 2025 Starts Here!"
              )}
            </h1>
            <p className="text-lg md:text-xl lg:max-w-[400px]">
              {isSubmitted ? (
                <>
                  We've emailed your ticket to{" "}
                  <span className="text-orange-5 opacity-90">{email}</span> and
                  will send updates in the run up to the event.
                </>
              ) : (
                "Secure your spot at next year's biggest coding conference."
              )}
            </p>
          </div>

          <div className="w-full flex justify-center pb-12 z-50">
            {!isSubmitted ? (
              <>
                <form
                  className="flex flex-col gap-5 w-full max-w-md md:max-w-sm"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="img">Upload Avatar</label>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-center">
                        <input
                          type="file"
                          name="img"
                          accept=".png, .jpg, .jpeg"
                          ref={fileRef}
                          onChange={handleFile}
                          className="hidden"
                        />
                        <button
                          className="input-field flex flex-col items-center w-full p-4 border-dashed"
                          type="button"
                          onClick={() => fileRef.current.click()}
                        >
                          <img
                            className={`bg-neutral-7 bg-opacity-55 border-neutral-5 border-opacity-70 border rounded-lg w-[35px] h-[35px] mb-5 ${
                              file ? "w-[45px] h-[45px] mb-3" : "p-1"
                            }`}
                            src={file ? file : "/icon/icon-upload.svg"}
                          />
                          {file ? (
                            <div className="flex gap-3 text-xs">
                              <button
                                type="button"
                                className="bg-neutral-7 bg-opacity-60 underline p-1 rounded-sm"
                                onClick={() => {
                                  removeFile();
                                }}
                              >
                                Remove Image
                              </button>
                              <button
                                type="button"
                                className="bg-neutral-7 bg-opacity-60 p-1 rounded-sm"
                              >
                                Change Image
                              </button>
                            </div>
                          ) : (
                            <p>Drag and drop or click to upload</p>
                          )}
                        </button>
                      </div>

                      {fileError ? (
                        <div className="error">{fileError}</div>
                      ) : (
                        <div className="text-xs" id="upload-info">
                          Upload your photo (JPG or PNG, max size: 500KB).
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Full Name</label>
                    <input
                      className="input-field"
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {formErrors.name && (
                      <div className="error">{formErrors.name}</div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email Address</label>
                    <input
                      className="input-field"
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {formErrors.email && (
                      <div className="error">{formErrors.email}</div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="github">GitHub Username</label>
                    <input
                      className="input-field"
                      type="text"
                      name="github"
                      id="github"
                      autoComplete="off"
                      placeholder="@yourusername"
                      value={github}
                      onChange={(e) =>
                        !e.target.value.startsWith("@")
                          ? setGithub("@" + e.target.value)
                          : setGithub(e.target.value)
                      }
                    />
                    {formErrors.github && (
                      <div className="error">{formErrors.github}</div>
                    )}
                  </div>

                  <button
                    className="bg-orange-5 rounded-lg py-2 text-base text-neutral-9 font-extrabold hover:shadow-orange-5 hover:custom-shadow-inner hover:bg-orange-7"
                    type="submit"
                  >
                    Generate My Ticket
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="relative w-[500px]">
                  <img
                    className="w-full"
                    src="/pattern-ticket.svg"
                    alt="Ticket"
                  />

                  <div className="absolute top-1/2 right-0 md:right-3 transform -translate-y-1/2 rotate-90 text-2xl text-neutral-5">
                    {number}
                  </div>

                  <div className="absolute top-5 left-5">
                    <img
                      className="w-44 md:w-60"
                      src="/logo/logo-full.svg"
                      alt=""
                    />
                    <p className="ml-10 md:ml-14 text-sm md:text-base text-neutral-3 text-opacity-80">
                      {currentDate} / Austin, TX
                    </p>
                  </div>

                  <div className="absolute bottom-5 left-5 flex items-end">
                    <div className="bg-red-500 w-[45px] md:w-[60px] h-[45px] md:h-[60px] rounded-lg">
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={file}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <h2 className="text-neutral-0 text-lg md:text-2xl">
                        {name}
                      </h2>
                      <p className="text-sm" id="github-username">
                        {github}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* bg patterns */}
      <div>
        <img
          className="absolute top-[-50px] md:top-[-70px] left-[-30px] md:left-10 w-36 md:w-44 z-0"
          src="/pattern-circle.svg"
        />
        <img
          className="absolute bottom-[225px] right-[-80px] lg:right-80 w-36 md:w-44 z-0"
          src="/pattern-circle.svg"
        />
        <img
          className="absolute top-[-30px] h-screen w-full object-cover z-0"
          src="/pattern-lines.svg"
        />
        <img
          className="absolute top-4 right-0 w-24 md:w-72 lg:w-96 z-0"
          src="pattern-squiggly-line-top.svg"
        />
        <img
          className="absolute bottom-0  w-56 md:w-2/6 z-0"
          src="pattern-squiggly-line-bottom.svg"
        />
      </div>
    </>
  );
};

export default Form;
