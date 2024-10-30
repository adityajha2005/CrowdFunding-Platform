import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./CustomButton.jsx";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const address = "0x34..."; // This should be replaced with actual wallet address

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for Campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} className="w-[15px] h-[15px] object-contain" alt="Search" />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a Campaign" : "Connect Wallet"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect(); // Call the connect function here
          }}
        />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={thirdweb} alt="User profile" className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="Logo" className="w-[60%] h-[60%] object-contain" />
        </div>

        <img
          src={menu}
          alt="Menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDropdown(prev => !prev)} // Use the state variable directly
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 transition-all duration-700 ${!toggleDropdown ? '-translate-y-[100vh]' : 'translate-y-0'}`}>
          <ul className="mb-4">
            {navlinks.map(link => ( // Use link instead of Link to avoid confusion
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDropdown(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name? 'grayscale-0':'grayscale'}`}
                />
                <p className={`ml-[20px] font-epilogue pt-3px font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4">
          <CustomButton 
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(address) navigate('create-campaign')
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
 