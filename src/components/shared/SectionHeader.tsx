import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = "center",
}) => {
  const alignmentClass =
    align === "left"
      ? "text-left"
      : align === "center"
      ? "text-center"
      : "text-right";

  return (
    <div className={`py-12 ${alignmentClass}`}>
      {subtitle && (
        <h3 className="text-xl font-semibold text-secondary mb-2">{subtitle}</h3>
      )}
      <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">{title}</h2>
      <div className="w-12 h-1 bg-red-500 mt-4 mx-auto" />
    </div>
  );
};

export default SectionHeader;
