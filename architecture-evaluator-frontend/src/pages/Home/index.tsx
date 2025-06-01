import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import InfoCard from "./components/InfoCard";

function Home() {
  const navigate = useNavigate();

  return (
      <div className="grid grid-cols-5 grid-rows-6 gap-4 h-max rounded-xl shadow p-8">
        {/* Title */}
        <div className="col-span-5">
          <h1 className="text-4xl font-bold text-center text-primary">
            Architecture Evaluator
          </h1>
          <p className="text-lg text-gray-medium text-center mt-4">
            Analyze your software architecture with ease and different maintainability metrics.
          </p>
        </div>
        {/* Section 1 (left) */}
        <div className="col-span-2 row-span-4 row-start-3 flex items-center justify-center">
          <InfoCard />
        </div>
        {/* Section 2 (right) */}
        <div className="col-span-2 row-span-4 col-start-4 row-start-3 flex flex-col gap-6">
          <div className="flex items-center justify-center h-1/2">
            <Card>
              <Button onClick={() => alert("Instrucciones pronto")}>
                Instructions
              </Button>
            </Card>
          </div>
          <div className={ "flex items-center justify-center h-1/2"}>
          <Card>
            <Button onClick={() => navigate("/load")}>Scan project</Button>
          </Card>
          </div>
        </div>
      </div>
  );
}

export default Home;
