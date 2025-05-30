import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import InfoCard from "./components/InfoCard";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark text-white">
      <div className="grid grid-cols-6 grid-rows-5 gap-4 min-h-screen items-center w-full h-full">
        {/* Title */}
        <div className="col-span-4 col-start-2">
          <h1 className="text-4xl font-bold text-center text-gray-light dark:text-white">
            This is a title
          </h1>
          <p className="text-lg text-gray-medium dark:text-gray-light text-center mt-4">
            This is a paragraph describing what the app does or how to start.
          </p>
        </div>
        {/* Section 1 (left) */}
        <div className="col-span-2 row-span-4 col-start-2 row-start-2 flex items-center justify-center">
          <InfoCard />
        </div>
        {/* Section 2 (right) */}
        <div className="col-span-2 row-span-4 col-start-4 row-start-2 flex flex-col gap-6">
          <Card>
            <Button onClick={() => alert("Instrucciones pronto")}>
              Instructions
            </Button>
          </Card>
          <Card>
            <Button onClick={() => navigate("/load")}>Scan project</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
