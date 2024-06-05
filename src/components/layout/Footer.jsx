import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = ({ loading }) => {
  const date = new Date();
  const years = date.getFullYear();
  const [marginTop, setMarginTop] = useState("mt-96");
  useEffect(() => {
    // Update marginTop to mt-10 after component mounts
    const timer = setTimeout(() => {
      setMarginTop("mt-9");
    }, 5); // Adjust the timeout duration as needed

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  return (
    <footer
      className={`w-full ${loading ? "mt-9" : marginTop} p-6 bg-primary `}
    >
      <div className="container max-w-7xl mx-auto   px-5 sm:px-6 ">
        <p className="text-white text-center font-medium text-sm">
          Copyright &copy; {years} <span className="text-blue-500">VShop</span>{" "}
          . Made with <span className="text-red-600">❤</span> by{" "}
          <Link
            to={"https://github.com/anwarhakim31"}
            target="_blank"
            className="text-blue-500"
          >
            {" "}
            Anwar Hakim
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
