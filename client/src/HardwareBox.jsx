import React from "react";

const HardwareBox = ({ header, body, progressBar }) => {
    return (
        <div className="w-[500px] flex gap-2 items-center p-3">
            <div className="flex gap-2 flex-col w-[300px]">
                {header}
                {body}
            </div>
            <div className="flex-grow">{progressBar}</div>
        </div>
    );
};

export default HardwareBox;
