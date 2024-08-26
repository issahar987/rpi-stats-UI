import React, { useState, useEffect } from 'react'

function SystemInfo() {
    const [systemInfo, setSystemInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      const fetchSystemInfo = async() => {
        try{
          const response = await fetch('http://raspberrypi:3000/api/system-info')
          const data = await response.json();
          setSystemInfo(data);
          setIsLoading(false);
        }
        catch(error) {
          console.error('Error fetching system information', error);
          setIsLoading(false);
        }
      };
      fetchSystemInfo();
    }, []);
    
    if (isLoading) return <div></div>
    console.log(systemInfo)
    if (!systemInfo) return <div> Error fetching</div>
    return (
      <div>
        <p>{systemInfo.ramUsage.total}</p>
      </div>
    )
  }

export default SystemInfo