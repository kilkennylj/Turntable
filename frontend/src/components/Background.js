import React from 'react';
import Ellipse1Svg from './Ellipse1SVG.js';
import Ellipse2Svg from './Ellipse2SVG.js';
import Ellipse3Svg from './Ellipse3SVG.js';
import Ellipse4Svg from './Ellipse4SVG.js';
import Ellipse5Svg from './Ellipse5SVG.js';

function Background()
{
    return(
        <div>
            <div class="z-40 absolute">
                <div class="flex justify-center items-center">
                    <div class="absolute animate-spinclock"><Ellipse1Svg /></div>
                    <div class="absolute animate-spinclock"><Ellipse2Svg /></div>
                    <div class="absolute animate-spinclock"><Ellipse3Svg /></div>
                    <div class="absolute animate-spinclock"><Ellipse4Svg /></div>
                    <div class="absolute animate-spinclock"><Ellipse5Svg /></div>
                </div>
            </div>
            <div class="z-30 absolute">
                <div class="flex justify-center items-center">
                    <div class="z-30 absolute w-[12.8125rem] h-[12.8125rem] bg-gray-100 rounded-full"></div>
                </div>
            </div>
            <div class="z-20 absolute">
                <div class="flex justify-center items-center">
                    <div class="z-20 absolute w-[57.875rem] h-[57.875rem] bg-gray-300 rounded-full"></div>
                </div>
            </div>
            <div class="z-10 absolute">
                <div class="flex justify-center items-center">
                    <div class="z-10 absolute w-[96.3125rem] h-[96.3125rem] bg-gray-100 rounded-full"></div>
                </div>
            </div>
            <div class="z-0 absolute">
                <div class="flex justify-center items-center">
                    <div class="z-40 absolute w-[12.8125rem] h-[12.8125rem] bg-gray-100 rounded-full"></div>
                    <div class="z-30 absolute w-[31.25rem] h-[31.25rem] bg-gray-50 rounded-full"></div>
                    <div class="z-20 absolute w-[57.875rem] h-[57.875rem] bg-gray-300 rounded-full"></div>
                    <div class="z-10 absolute w-[96.3125rem] h-[96.3125rem] bg-gray-100 rounded-full"></div>
                    <div class="z-0 absolute w-[151.375rem] h-[151.375rem] bg-gray-50 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}

export default Background;