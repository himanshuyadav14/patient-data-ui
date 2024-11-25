import BirthIcon from "../assets/BirthIcon.svg";
import FemaleIcon from "../assets/FemaleIcon.svg";
import PhoneIcon from "../assets/PhoneIcon.svg";
import InsuranceIcon from "../assets/InsuranceIcon.svg";
import jessica from "../assets/jessica.png"

const PatientDetails = ({ data }) => {
  console.log(data);
  return (
    <div className="w-[367px] h-[740px] bg-white rounded-[16px] opacity-100 p-4 flex flex-col items-center">
      {/* Profile picture */}
      <div className="flex flex-col justify-between items-center gap-2">
        <img src={jessica} alt="" className="w-[200px] h-[200px] cursor-pointer" />
        <div className="text-[24px] font-bold">{data.name}</div>
      </div>
      {/* Info */}
      <div className="w-[310px] flex flex-col items-start gap-4 mt-8">
        <div className="flex items-center justify-center gap-4">
          <div>
            <img src={BirthIcon} alt="" />
          </div>
          <div>
            <div className="font-extralight">Date of Birth</div>
            <div>{data?.date_of_birth}</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div>
            <img src={FemaleIcon} alt="" />
          </div>
          <div>
            <div className="font-extralight">Gender</div>
            <div>{data?.gender}</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div>
            <img src={PhoneIcon} alt="" />
          </div>
          <div>
            <div className="font-extralight">Contact Info.</div>
            <div>{data?.phone_number}</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div>
            <img src={PhoneIcon} alt="" />
          </div>
          <div>
            <div className="font-extralight">Emergency Contacts</div>
            <div>{data?.emergency_contact}</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div>
            <img src={InsuranceIcon} alt="" />
          </div>
          <div>
            <div className="font-extralight">Insurance Provider</div>
            <div>{data?.insurance_type}</div>
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="cursor-pointer rounded-[41px] bg-[#01F0D0] text-center w-[220px] h-[42px] flex items-center justify-center font-bold text-[14px] mt-10">
        Show All Information
      </div>
    </div>
  );
};

export default PatientDetails;
