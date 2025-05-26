import React from "react";

interface ProgramProp {
  title: string;
  description: string;
  video: string;
}

const Page: React.FC<ProgramProp> = ({ title, description, video }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Page;
