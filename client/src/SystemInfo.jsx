import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import HardwareBox from "./HardwareBox";

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
    if (!systemInfo) return <div> Error fetching </div>;
    return (
        <div className="rounded-lg bg-zinc-800">
            <HardwareBox
                header={<span className="text-center font-bold">RAM</span>}
                body={
                    <div className="flex flex-col">
                        <span>Total: {systemInfo.ramUsage.total}MB</span>
                        <span>Used: {systemInfo.ramUsage.used}MB</span>
                        <span>free: {systemInfo.ramUsage.free}MB</span>
                        <span>active: {systemInfo.ramUsage.active}MB</span>
                    </div>
                }
                progressBar={
                    <ProgressBar
                        key="RAM"
                        used={systemInfo.ramUsage.used}
                        total={systemInfo.ramUsage.total}
                        unit="%"
                    />
                }
            />
            {systemInfo.diskUsage.map((disk, index) => (
                <HardwareBox
                    header={
                        <span className="text-center font-bold">
                            Disk {index}
                        </span>
                    }
                    body={
                        <div className="flex flex-col">
                            <span>Mounted at: {disk.mount}</span>
                            <span>Total: {disk.total}GB</span>
                            <span>Used: {disk.used}GB</span>
                            <span>Used: {disk.available}GB</span>
                        </div>
                    }
                    progressBar={
                        <ProgressBar
                            key="Disk"
                            used={disk.used}
                            total={disk.total}
                            unit="%"
                        />
                    }
                />
            ))}
            <HardwareBox
                header={<span className="text-center font-bold">CPU</span>}
                body={
                    <div className="flex flex-col">
                        <span>
                            Temperature: {systemInfo.cpuTemperature.main}℃
                        </span>
                    </div>
                }
                progressBar={
                    <ProgressBar
                        key="CPU"
                        used={systemInfo.cpuTemperature.main}
                        total={100}
                        unit="℃"
                    />
                }
            />
        </div>
    );
}

export default SystemInfo;
