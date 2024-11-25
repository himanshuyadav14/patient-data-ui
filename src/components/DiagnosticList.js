const DiagnosticList = ({ data }) => {
  return (
    <div className="w-[766px] h-[349px] bg-white rounded-[16px] opacity-100 mt-8">
      <div className="font-bold text-[#072635] text-[24px] p-8">
        Diagnostic List
      </div>
      <div className="overflow-y-auto max-h-[240px]">
        <table className="w-[730px] mx-auto">
          <thead className="sticky top-0 bg-[#F6F7F8] z-10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#072635] rounded-l-3xl">
                Problem/Diagnosis
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#072635]">
                Description
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#072635] rounded-r-3xl">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {item.description}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full
                        ${
                          item.status === "Under Observation"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "Cured"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosticList;
