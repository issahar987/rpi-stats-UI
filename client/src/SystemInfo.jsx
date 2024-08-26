import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

function SystemInfo() {
    const [systemInfo, setSystemInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [time, setTime] = useState(null);

    useEffect(() => {
        const id = setInterval(() => setTime(Date.now()), 5000);
        return () => {
            clearInterval(id);
        };
    }, []);

    useEffect(() => {
        const fetchSystemInfo = async () => {
            try {
                const response = await fetch(
                    "http://raspberrypi:3000/api/system-info"
                );
                const data = await response.json();
                setSystemInfo(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching system information", error);
                setIsLoading(false);
            }
        };
        fetchSystemInfo();
    }, [time]);

    if (isLoading) return <div></div>;
    if (!systemInfo) return <div> Error fetching</div>;
    return (
        <div>
            <pre>{JSON.stringify(systemInfo, null, 2)}</pre>
            <ProgressBar
                used={systemInfo.ramUsage.used}
                total={systemInfo.ramUsage.total}
            />
            {systemInfo.diskUsage.map((disk) => (
                <ProgressBar used={disk.used} total={disk.total} />
            ))}
            <ProgressBar used={systemInfo.cpuTemperature.main} total={82} />
        </div>
    );
}

export default SystemInfo;
