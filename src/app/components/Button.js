// Custom Button Component
const Button = ({ children, onClick, disabled, variant, className }) => {
  const baseStyles = "py-2 px-4 rounded transition";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-200",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;