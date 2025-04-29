import React from "react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customClass?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children = "Ripple Fill",
  customClass = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={`relative overflow-hidden bg-primary text-white cursor-pointer rounded px-3 py-2 md:px-6 md:py-3 group text-center ${customClass}`}
    >
      {/* Top-right ripple */}
      <span className="absolute top-0 right-0 w-full h-full bg-secondary scale-0 group-hover:scale-125 transition-transform duration-500 ease-in-out z-0 origin-top-right"></span>

      {/* Bottom-left ripple */}
      <span className="absolute bottom-0 left-0 w-full h-full bg-secondary scale-0 group-hover:scale-125 transition-transform duration-500 ease-in-out z-0 origin-bottom-left"></span>

      {/* Button content */}
      <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
    </button>
  );
};

export default PrimaryButton;
