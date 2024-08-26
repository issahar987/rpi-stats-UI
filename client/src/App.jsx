import React from "react";
import SystemInfo from "./SystemInfo";
import "./index.css";

function App() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold underline">
                    Something to see
                </h1>
                <SystemInfo />
            </div>
        </>
    );
}

export default App;
