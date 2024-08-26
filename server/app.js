const express = require('express');
const si = require('systeminformation');
const app = express();
const PORT = process.env.PORT || 3000;

// Route to get system information
app.get('/api/system-info', async (req, res) => {
    try {
      // Fetch memory information
      const memoryData = await si.mem();
      const ramUsage = {
        total: memoryData.total,      // Total RAM in bytes
        used: memoryData.used,        // Used RAM in bytes
        free: memoryData.free,        // Free RAM in bytes
        active: memoryData.active     // Active RAM in bytes
      };
  
      // Fetch disk information
      const diskData = await si.fsSize();
      const diskUsage = diskData.map((disk) => ({
        filesystem: disk.fs,
        total: disk.size,             // Total disk size in bytes
        used: disk.used,              // Used disk size in bytes
        available: disk.available,    // Available disk size in bytes
        mount: disk.mount
      }));
  
      // Fetch CPU temperature
      const cpuTempData = await si.cpuTemperature();
      const cpuTemperature = {
        main: cpuTempData.main,       // Main CPU temperature in Celsius
        cores: cpuTempData.cores      // Temperature for each core in Celsius (if available)
      };
  
      // Combine all the information
      const systemInfo = {
        ramUsage,
        diskUsage,
        cpuTemperature
      };
  
      // Send the response
      res.json(systemInfo);
    } catch (error) {
      console.error('Error fetching system information:', error);
      res.status(500).json({ error: 'Failed to fetch system information' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
