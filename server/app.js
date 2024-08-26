const express = require("express");
const si = require("systeminformation");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// Function to check if a disk is a main disk
function isMainDisk(disk) {
    // Here, we're excluding typical non-main mount points such as '/boot', '/sys', etc.
    const excludedMountPoints = [
        "/boot",
        "/sys",
        "/proc",
        "/dev",
        "/run",
        "/boot/firmware",
    ];
    return !excludedMountPoints.includes(disk.mount);
}

// Function to convert bytes to MegaBytes
function bytestoMegaBytes(bytes) {
    return (bytes / 1024 / 1024).toFixed(2);
}

// Function to convert bytes to GigaBytes
function bytestoGigaBytes(bytes) {
    return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

const corsOptions = {
    origin: "http://raspberrypi:5173",
    // optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Route to get system information
app.get("/api/system-info", async (req, res) => {
    try {
        // Fetch memory information
        const memoryData = await si.mem();
        const ramUsage = {
            total: bytestoMegaBytes(memoryData.total), // Total RAM in Mbytes
            used: bytestoMegaBytes(memoryData.used), // Used RAM in Mbytes
            free: bytestoMegaBytes(memoryData.free), // Free RAM in Mbytes
            active: bytestoMegaBytes(memoryData.active), // Active RAM in Mbytes
        };

        // Fetch disk information
        const diskData = await si.fsSize();
        const mainDisks = diskData.filter(isMainDisk);
        const diskUsage = mainDisks.map((disk) => ({
            mount: disk.mount, // shows mount
            total: bytestoGigaBytes(disk.size), // Total disk size in Mbytes
            used: bytestoGigaBytes(disk.used), // Used disk size in Mbytes
            available: bytestoGigaBytes(disk.available), // Available disk size in Mbytes
        }));

        // Fetch CPU temperature
        const cpuTempData = await si.cpuTemperature();
        const cpuTemperature = {
            main: cpuTempData.main, // Main CPU temperature in Celsius
        };

        // Combine all the information
        const systemInfo = {
            ramUsage,
            diskUsage,
            cpuTemperature,
        };

        // Send the response
        res.json(systemInfo);
    } catch (error) {
        console.error("Error fetching system information:", error);
        res.status(500).json({ error: "Failed to fetch system information" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
