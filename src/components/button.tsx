
    "use client";


    type Variant = "primary" | "secondary" | "link";

    interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: Variant;
      children: React.ReactNode;
    }

    export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
      const variantStyles: Record<Variant, string> = {
        primary: "bg-red-900 text-white hover:bg-red-800 transition duration-200",
        secondary: "bg-gray-800 text-white hover:bg-gray-700",
        link: "text-[#E3CDA2] hover:text-[#F5D29D] underline hover:no-underline",
      };

      return (
        <button
          className={`${variantStyles[variant]} px-4 py-2 rounded-md font-semibold ${props.className || ""}`}
          {...props}
        >
          {children}
        </button>
      );
    };
