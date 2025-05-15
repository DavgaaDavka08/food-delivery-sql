"use client";

import React, { useState } from "react";
import { StepOne } from "./_Components/steptwo";
import StepTwo from "./_Components/stepone";

const Page = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  console.log("setEmail :>> ", setEmail);
  const next = () => {
    setStep((prev) => prev + 1);
  };

  const steps = [
    <StepOne key="step1" email={email} next={next} />,
    <StepTwo key="step2" email={email} next={next} />,
  ];

  return <div>{steps[step]}</div>;
};

export default Page;
