import React from 'react';

interface TextSectionProps {
  mainHeading: string;
  subHeading?: string;
}

const TextSection: React.FC<TextSectionProps> = ({ mainHeading, subHeading }) => {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-wide animate-fade-in-up">
          {mainHeading}
        </h2>
        {subHeading && (
          <h3 className="text-2xl md:text-3xl font-bold mb-16 tracking-wide animate-fade-in-up">
            {subHeading}
          </h3>
        )}
      </div>
    </section>
  );
};

export default TextSection; 