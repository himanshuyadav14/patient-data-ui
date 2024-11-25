import download from "../assets/download.svg";

const LabResult = ({ data }) => {
  console.log(data);
  return (
    <div className="w-[367px] h-[296px] bg-white rounded-[16px] opacity-100 mt-8">
      <div className="text-[#072635] font-bold p-8 text-[24px]">
        Lab Results
      </div>
      <div className="h-[180px] overflow-y-auto"> {/* Set fixed height and enable vertical scroll */}
        {data?.map((entry, index) => (
          <div
            key={index}
            className="w-[300px] h-[40px] mx-auto text-sm text-gray-700 py-1 cursor-pointer flex items-center justify-between hover:bg-[#F6F7F8] transition-colors duration-200"
          >
            <div className="text-[13px]">{entry}</div>
            <div><img src={download} alt="Download" /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResult;
