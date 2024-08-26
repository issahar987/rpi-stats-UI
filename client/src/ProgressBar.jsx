import React from "react";
import clsx from "clsx";

const ProgressBar = ({ used, total }) => {
    const percentageUsed = (used / total) * 100;

    return (
        <div className="relative h-5 rounded-full overflow-hidden bg-gray-300 mt-20 mx-10">
            <div
                className={clsx(
                    "absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r",
                    percentageUsed > 70 && "from-red-200 to-red-900",
                    percentageUsed >= 40 &&
                        percentageUsed <= 70 &&
                        "from-yellow-200 to-yellow-900",
                    percentageUsed < 40 && "from-lime-200 to-lime-900"
                )}
                style={{ width: `${percentageUsed}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
