import { ComplexityGears } from "./ComplexityGear";
import { CohesionWires } from "./CohesionWires";
import { CouplingCables } from "./CouplingCables";

export const MetricBox = ({
                              name,
                              complexity,
                              cohesion,
                              afferentCoupling,
                              efferentCoupling
                          }: {
    name: string;
    complexity: number;
    cohesion: number;
    afferentCoupling: number;
    efferentCoupling: number;
}) => {
    return (
        <div className="relative border rounded-2xl shadow-md p-4 bg-white w-64 h-64 flex flex-col items-center justify-center">
            <div className="absolute -top-2 text-sm bg-white px-2 font-bold text-gray-700">{name}</div>

            <ComplexityGears complexity={complexity} />
            <CohesionWires cohesion={cohesion} />

            <CouplingCables afferent={afferentCoupling} efferent={efferentCoupling} />
        </div>
    );
};