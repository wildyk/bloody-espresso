import React from "react";

interface CardComponentProps {
  title: string;
  description: string;
  link: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, description, link }) => {
  return (
    <div className="bg-[#592424] text-[#E3CDA2] p-8 rounded-[35px] shadow-lg w-full max-w-sm transition-transform duration-300 hover:-translate-y-4">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[#F7E5DA] leading-relaxed mb-4">{description}</p>
      <a href={link} className="text-[#F8E4BE] hover:underline">
        Read More
      </a>
    </div>
  );
};

export default CardComponent;