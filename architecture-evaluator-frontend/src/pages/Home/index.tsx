import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="grid grid-cols-6 grid-rows-5 gap-4 min-h-screen items-center w-full">
                <div className="col-span-4 col-start-2">
                    <h1 className="text-4xl font-bold text-center">This is a title</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 text-center mt-4">
                        This is a paragraph describing what the app does or how to start.
                    </p>
                </div>
                <div className="col-span-2 row-span-4 col-start-2 row-start-2 flex items-center justify-center">
                    {/* Content for section 2 */}
                    <span className="text-2xl text-gray-400">[Espacio para contenido extra]</span>
                </div>
                <div className="col-span-2 row-span-4 col-start-4 row-start-2 flex flex-col gap-6">
                    {/* Content for section 3 */}
                    <Card>
                        <Button onClick={() => alert("Instrucciones pronto")}>Instructions</Button>
                    </Card>
                    <Card>
                        <Button onClick={() => navigate("/upload")}>Scan project</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;