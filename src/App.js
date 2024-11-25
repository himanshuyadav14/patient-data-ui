import "./index.css";
import Navbar from "../src/components/Navbar";
import Patients from "../src/components/Patients";
function App() {
  return (
    <div className="bg-[#F6F7F8] w-full min-h-screen">
      <div className="bg-[#F6F7F8] w-[1600px] h-[1195px] flex flex-col items-center mx-auto">
        <Navbar />
        <Patients />
      </div>
    </div>
  );
}

export default App;
