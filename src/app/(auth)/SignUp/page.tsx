"use client";
import React, { useState } from "react";
import FirstPage from "./_Components/firstpage";
import SecondPage from "./_Components/secondpage";

const Page = () => {
  const [changePage, setChangePage] = useState<number>(0);
  const FormStep = [FirstPage, SecondPage][changePage];
  const [email, setEmail] = useState("");
  const nextPage = () => {
    setChangePage(changePage + 1);
  };
  return (
    <div>
      <FormStep nextPage={nextPage} setEmail={setEmail} email={email} />
    </div>
  );
};
export default Page;
