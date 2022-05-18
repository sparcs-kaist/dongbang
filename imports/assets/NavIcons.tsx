import React from "react";


export const MemberIcon: React.FC<{ className?: string }> = React.memo(({className}) =>
    <svg className={className} viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg"
         overflow="hidden" fill="#BFBFBF"
    >
        <defs>
            <clipPath id="clip0">
                <rect x="141" y="572" width="45" height="44"/>
            </clipPath>
            <clipPath id="clip1">
                <rect x="142" y="572" width="44" height="44"/>
            </clipPath>
            <clipPath id="clip2">
                <rect x="142" y="572" width="44" height="44"/>
            </clipPath>
            <clipPath
                id="clip3">
                <rect x="142" y="572" width="44" height="44"/>
            </clipPath>
        </defs>
        <g clipPath="url(#clip0)" transform="translate(-141 -572)">
            <g clipPath="url(#clip1)">
                <g clipPath="url(#clip2)">
                    <g clipPath="url(#clip3)">
                        <path
                            d="M164 592.167C168.05 592.167 171.333 588.883 171.333 584.833 171.333 580.783 168.05 577.5 164 577.5 159.95 577.5 156.667 580.783 156.667 584.833 156.667 588.883 159.95 592.167 164 592.167Z"
                            fillRule="nonzero" fillOpacity="1"/>
                        <path
                            d="M175 610.5C176.013 610.5 176.833 609.679 176.833 608.667 176.833 601.579 171.088 595.833 164 595.833 156.912 595.833 151.167 601.579 151.167 608.667 151.167 609.679 151.987 610.5 153 610.5Z"
                            fillRule="nonzero" fillOpacity="1"/>
                    </g>
                </g>
            </g>
        </g>
    </svg>
)

export const SessionIcon: React.FC<{ className?: string }> = React.memo(({className}) =>
    <svg className={className} viewBox="0 0 155 155" xmlns="http://www.w3.org/2000/svg"
         overflow="hidden" fill="#BFBFBF">
        <path
            d="M97.6418 67.2847C93.1048 67.2847 89.4265 70.9629 89.4265 75.4999 89.4265 80.037 93.1048 83.7152 97.6418 83.7152 102.179 83.7152 105.857 80.037 105.857 75.4999 105.857 70.9629 102.179 67.2847 97.6418 67.2847ZM75.4996 67.2847C70.9626 67.2847 67.2844 70.9629 67.2844 75.4999 67.2844 80.037 70.9626 83.7152 75.4996 83.7152 80.0366 83.7152 83.7148 80.037 83.7148 75.4999 83.7148 70.9629 80.0366 67.2847 75.4996 67.2847ZM52.3034 67.2847C47.7664 67.2847 44.0882 70.9629 44.0882 75.4999 44.0882 80.037 47.7664 83.7152 52.3034 83.7152 56.8404 83.7152 60.5187 80.037 60.5187 75.4999 60.5187 70.9629 56.8404 67.2847 52.3034 67.2847ZM75.4999 23C104.495 23 128 46.5049 128 75.4999 128 104.495 104.495 128 75.4999 128 46.5049 128 23 104.495 23 75.4999 23 46.5049 46.5049 23 75.4999 23Z"
            fillRule="evenodd" fillOpacity="1"/>
    </svg>
)

export const ScheduleIcon: React.FC<{ className?: string }> = React.memo(({className}) =>
    <svg className={className} viewBox="0 0 155 155" xmlns="http://www.w3.org/2000/svg"
         overflow="hidden" fill="#BFBFBF" >
        <path
            d="M89.5647 87.9027C86.148 87.9027 83.3779 90.6615 83.3779 94.0646 83.3779 97.467 86.148 100.226 89.5647 100.226L103.169 100.226C106.585 100.226 109.355 97.467 109.355 94.0646 109.355 90.6615 106.585 87.9027 103.169 87.9027ZM47.6181 87.9027C44.2014 87.9027 41.4312 90.6615 41.4312 94.0646 41.4312 97.467 44.2014 100.226 47.6181 100.226L61.2219 100.226C64.6387 100.226 67.4088 97.467 67.4088 94.0646 67.4088 90.6615 64.6387 87.9027 61.2219 87.9027ZM89.5647 61.3981C86.148 61.3981 83.3779 64.1569 83.3779 67.5593 83.3779 70.9624 86.148 73.7212 89.5647 73.7212L103.169 73.7212C106.585 73.7212 109.355 70.9624 109.355 67.5593 109.355 64.1569 106.585 61.3981 103.169 61.3981ZM47.6181 61.3981C44.2014 61.3981 41.4312 64.1569 41.4312 67.5593 41.4312 70.9624 44.2014 73.7212 47.6181 73.7212L61.2219 73.7212C64.6387 73.7212 67.4088 70.9624 67.4088 67.5593 67.4088 64.1569 64.6387 61.3981 61.2219 61.3981ZM51.6594 19.9999C55.418 19.9999 58.4651 23.0346 58.4651 26.7778L58.4651 32.788 92.4065 32.788 92.4065 26.7778C92.4065 23.0346 95.4536 19.9999 99.2122 19.9999 102.971 19.9999 106.018 23.0346 106.018 26.7778L106.018 32.788 110.076 32.788C119.975 32.788 128 40.7799 128 50.6384L128 109.149C128 119.008 119.975 127 110.076 127L40.9237 127C31.0247 127 23 119.008 23 109.149L23 50.6384C23 40.7799 31.0247 32.788 40.9237 32.788L44.8537 32.788 44.8537 26.7778C44.8537 23.0346 47.9009 19.9999 51.6594 19.9999Z"
            fillRule="evenodd" fillOpacity="1"/>
    </svg>
)
