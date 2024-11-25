import React from "react";
import TestLogo from "../assets/TestLogo.svg";
import OverviewIcon from "../assets/OverviewIcon.svg";
import PatientsIcon from "../assets/PatientsIcon.svg";
import ScheduleIcon from "../assets/ScheduleIcon.svg";
import MessageIcon from "../assets/MessageIcon.svg";
import TransactionIcon from "../assets/TransactionIcon.svg";
import SettingsIcon from "../assets/SettingsIcon.svg";
import VerticalThreeDots from "../assets/VerticalThreeDots.svg";
import Doctor from "../assets/Doctor.png";

// Reusable NavItem Component
const NavItem = ({ icon, label, isActive }) => (
    <li
      className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-[41px] 
      ${isActive ? "bg-[#01F0D0]" : "hover:bg-[#01F0D0]"} transition-all duration-300`}
      aria-current={isActive ? "page" : undefined}
    >
      <img src={icon} alt={`${label} Icon`} className="w-auto h-5" />
      <span className="text-[14px] text-[#072635] font-medium">{label}</span>
    </li>
  );

const Navbar = () => {
  return (
    <div className="w-[1564px] h-[72px] mx-auto bg-[#ffffff] rounded-[70px] opacity-100 flex items-center justify-between px-6 mt-[18px] ml-[18px]">
      {/* Logo */}
      <div>
        <img src={TestLogo} alt="Test Logo" className="cursor-pointer" />
      </div>

      {/* Navigation */}
      <nav aria-label="Main Navigation">
        <ul className="flex items-center gap-4">
          <NavItem icon={OverviewIcon} label="Overview" />
          <NavItem icon={PatientsIcon} label="Patients" isActive />
          <NavItem icon={ScheduleIcon} label="Schedule" />
          <NavItem icon={MessageIcon} label="Message" />
          <NavItem icon={TransactionIcon} label="Transaction" />
        </ul>
      </nav>

      {/* Actions */}
      <div className="flex justify-between items-center gap-4">
        {/* Doctor Info */}
        <div className="flex items-center gap-2 border-r-2 pr-4">
          <img src={Doctor} alt="Doctor" className="w-[44px] h-[44px] rounded-full cursor-pointer hover:opacity-80" />
          <div>
            <div className="text-[14px] text-[#072635] font-bold">Dr. Jose Simmons</div>
            <div className="text-[14px] text-[#707070]">General Practitioner</div>
          </div>
        </div>

        {/* Settings and More Options */}
        <div className="flex items-center gap-3">
          <img src={SettingsIcon} alt="Settings Icon" className="w-5 h-5 cursor-pointer hover:opacity-80" />
          <img src={VerticalThreeDots} alt="More Options Icon" className="w-5 h-5 cursor-pointer hover:opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
