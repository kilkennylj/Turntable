import React from 'react';
import Ellipse1Svg from './Ellipse1SVG.js';
import Ellipse2Svg from './Ellipse2SVG.js';
import Ellipse3Svg from './Ellipse3SVG.js';
import Ellipse4Svg from './Ellipse4SVG.js';
import Ellipse5Svg from './Ellipse5SVG.js';

function Background()
{
    return(
        <div className="max-sm:hidden">
            <div className="z-40 absolute">
                <div className="flex justify-center items-center">
                    <div className="absolute animate-spinclock"><Ellipse1Svg /></div>
                    <div className="absolute animate-spinclock"><Ellipse2Svg /></div>
                    <div className="absolute animate-spinclock"><Ellipse3Svg /></div>
                    <div className="absolute animate-spinclock"><Ellipse4Svg /></div>
                    <div className="absolute animate-spinclock"><Ellipse5Svg /></div>
                </div>
            </div>
            <div className="z-30 absolute">
                <div className="flex justify-center items-center">
                    <div className="z-30 absolute w-[12.8125rem] h-[12.8125rem] bg-gray-100 rounded-full"></div>
                </div>
            </div>
            <div className="z-20 absolute">
                <div className="flex justify-center items-center">
                    <div className="z-20 absolute w-[57.875rem] h-[57.875rem] bg-gray-300 rounded-full"></div>
                </div>
            </div>
            <div className="z-10 absolute">
                <div className="flex justify-center items-center">
                    <div className="z-10 absolute w-[96.3125rem] h-[96.3125rem] bg-gray-100 rounded-full"></div>
                </div>
            </div>
            <div className="z-0 absolute">
                <div className="flex justify-center items-center">
                    <div className="z-40 absolute w-[12.8125rem] h-[12.8125rem] bg-gray-100 rounded-full"></div>
                    <div className="z-30 absolute w-[31.25rem] h-[31.25rem] bg-gray-50 rounded-full"></div>
                    <div className="z-20 absolute w-[57.875rem] h-[57.875rem] bg-gray-300 rounded-full"></div>
                    <div className="z-10 absolute w-[96.3125rem] h-[96.3125rem] bg-gray-100 rounded-full"></div>
                    <div className="z-0 absolute w-[151.375rem] h-[151.375rem] bg-gray-50 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}

export default Background;