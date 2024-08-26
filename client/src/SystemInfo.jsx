import React, { useState, useEffect } from 'react'

function SystemInfo() {
    const [systemInfo, setSystemInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [time, setTime] = useState(null);

    useEffect(() => {
      const id = setInterval(() => setTime(Date.now()), 5000);
      return () => { clearInterval(id);
      };

    }, []);

    useEffect(() => {
      const fetchSystemInfo = async() => {
        try{
          const response = await fetch('http://raspberrypi:3000/api/system-info')
          const data = await response.json();
          setSystemInfo(data)
          setIsLoading(false);
        }
        catch(error) {
          console.error('Error fetching system information', error);
          setIsLoading(false);
        }
      };
      fetchSystemInfo()
    }, [time]);
    
    if (isLoading) return <div></div>
    if (!systemInfo) return <div> Error fetching</div>
    return (
      <div>
        <pre>{JSON.stringify(systemInfo, null, 2)}</pre>
      </div>
    )
  }

export default SystemInfo