import React from 'react';
import Ellipse1Svg from './background_assets/Ellipse1SVG.js';
import Ellipse2Svg from './background_assets/Ellipse2SVG.js';
import Ellipse3Svg from './background_assets/Ellipse3SVG.js';
import Ellipse4Svg from './background_assets/Ellipse4SVG.js';
import Ellipse5Svg from './background_assets/Ellipse5SVG.js';

function Background()
{
    return(
        <div className="max-sm:tw-hidden">
            <div className="tw-z-40 tw-absolute">
                <div className="tw-flex tw-justify-center tw-items-center">
                    <div className="tw-absolute tw-animate-spinclock"><Ellipse1Svg /></div>
                    <div className="tw-absolute tw-animate-spinclock"><Ellipse2Svg /></div>
                    <div className="tw-absolute tw-animate-spinclock"><Ellipse3Svg /></div>
                    <div className="tw-absolute tw-animate-spinclock"><Ellipse4Svg /></div>
                    <div className="tw-absolute tw-animate-spinclock"><Ellipse5Svg /></div>
                </div>
            </div>
            <div className="tw-z-30 tw-absolute">
                <div className="tw-flex tw-justify-center tw-items-center">
                    <div className="tw-z-30 tw-absolute tw-w-[12.8125rem] tw-h-[12.8125rem] tw-bg-gray-100 tw-rounded-full"></div>
                </div>
            </div>
            <div className="tw-z-20 tw-absolute">
                <div className="tw-flex tw-justify-center tw-items-center">
                    <div className="tw-z-20 tw-absolute tw-w-[57.875rem] tw-h-[57.875rem] tw-bg-gray-300 tw-rounded-full"></div>
                </div>
            </div>
            <div className="tw-z-10 tw-absolute">
                <div className="tw-flex tw-justify-center tw-items-center">
                    <div className="tw-z-10 tw-absolute tw-w-[96.3125rem] tw-h-[96.3125rem] tw-bg-gray-100 tw-rounded-full"></div>
                </div>
            </div>
            <div className="tw-z-0 tw-absolute">
                <div className="tw-flex tw-justify-center tw-items-center">
                    <div className="tw-z-40 tw-absolute tw-w-[12.8125rem] tw-h-[12.8125rem] tw-bg-gray-100 tw-rounded-full"></div>
                    <div className="tw-z-30 tw-absolute tw-w-[31.25rem] tw-h-[31.25rem] tw-bg-gray-50 tw-rounded-full"></div>
                    <div className="tw-z-20 tw-absolute tw-w-[57.875rem] tw-h-[57.875rem] tw-bg-gray-300 tw-rounded-full"></div>
                    <div className="tw-z-10 tw-absolute tw-w-[96.3125rem] tw-h-[96.3125rem] tw-bg-gray-100 tw-rounded-full"></div>
                    <div className="tw-z-0 tw-absolute tw-w-[151.375rem] tw-h-[151.375rem] tw-bg-gray-50 tw-rounded-full"></div>
                </div>
            </div>
        </div>
    );
}

export default Background;