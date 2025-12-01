import React from "react";
import type { SVGProps } from "react";

export const Logo = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      id="b"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      {...props}
    >
      <g id="c">
        <path
          className="text-[#ddd]"
          fill="currentColor"
          d="M0,6.94v286.11c0,3.83,3.11,6.94,6.94,6.94h204.09s-19.05-26.21-19.05-26.21H26.22V26.3L7.11,0h-.16C3.11,0,0,3.11,0,6.94Z"
        />
        <path
          className="text-[#444]"
          fill="currentColor"
          d="M39.52,0l19.05,26.21h215.29v247.57h-21.62l19.05,26.21h21.77c3.84,0,6.94-3.11,6.94-6.94V6.94c0-3.83-3.11-6.94-6.94-6.94H39.52Z"
        />
        <path
          className="text-[#fff]"
          fill="currentColor"
          d="M161.46,167.8c23.69-7.24,41.12-29.4,41.12-55.31,0-31.72-26.1-57.81-57.83-57.81h-69.99v186.83h26.22V80.89h43.65c.08,0,.17,0,.25,0,17.11,0,31.19,14.07,31.19,31.18s-13.96,31.07-30.99,31.18h-33.87l113.92,156.76h32.41l-96.07-132.2Z"
        />
      </g>
    </svg>
  );
};

export const LogoDesign = ({
  variant,
  ...props
}: { variant: "light" | "dark" } & SVGProps<SVGSVGElement>) => {
  const col = {
    light: {
      l: "#444444",
      r: "#000000",
      f: "#dddddd",
      g: "#626262",
      border: "#000000",
    },
    dark: {
      l: "#dddddd",
      r: "#ffffff",
      f: "#444444",
      g: "#303030",
      border: "#ffffff",
    },
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
      <g>
        <path
          fill={col[variant].l}
          d="M193.96,84.21l52.84,72.6h597.13v685.69h-59.97l52.84,72.6h60.39c10.64,0,19.26-8.61,19.26-19.23V103.44c0-10.62-8.62-19.23-19.26-19.23H193.96Z"
        />
        <path
          fill={col[variant].f}
          d="M84.35,103.44v792.43c0,10.62,8.62,19.23,19.26,19.23h566.07s-52.84-72.6-52.84-72.6H157.07V157.04l-53-72.83h-.46c-10.64,0-19.26,8.61-19.26,19.23Z"
        />
        <path
          fill={col[variant].r}
          d="M532.19,548.95c65.71-20.06,114.04-81.43,114.04-153.19,0-87.84-72.41-160.13-160.4-160.13h-194.12v517.45h72.72v-444.85h121.06c.23,0,.46,0,.69,0,47.45,0,86.5,38.98,86.5,86.35s-38.71,86.05-85.95,86.35h-93.94l315.98,434.17h89.89l-266.47-366.15Z"
        />
        <line
          fill={col[variant].g}
          x1="1000.5"
          y1="308.24"
          x2=".5"
          y2="308.24"
        />
        <line
          fill={col[variant].g}
          x1=".5"
          y1="235.64"
          x2="1000.5"
          y2="235.64"
        />
        <line fill={col[variant].g} x1="1000.5" y1="915.1" x2=".5" y2="915.1" />
        <line fill={col[variant].g} x1=".5" y1="842.5" x2="1000.5" y2="842.5" />
        <line
          fill={col[variant].g}
          x1="1000.5"
          y1="156.81"
          x2=".5"
          y2="156.81"
        />
        <line fill={col[variant].g} x1=".5" y1="84.21" x2="1000.5" y2="84.21" />
        <line
          fill={col[variant].g}
          x1="1000.5"
          y1="555.89"
          x2=".5"
          y2="555.89"
        />
        <line
          fill={col[variant].g}
          x1=".5"
          y1="480.94"
          x2="1000.5"
          y2="480.94"
        />
        <line
          fill={col[variant].g}
          x1=".5"
          y1="753.09"
          x2="1000.5"
          y2="753.09"
        />
        <line fill={col[variant].g} x1="84.35" y1="998.81" x2="84.35" y2=".5" />
        <line
          fill={col[variant].g}
          x1="157.07"
          y1=".5"
          x2="157.07"
          y2="998.81"
        />
        <line
          fill={col[variant].g}
          x1="843.93"
          y1="998.81"
          x2="843.93"
          y2=".5"
        />
        <line
          fill={col[variant].g}
          x1="916.45"
          y1=".5"
          x2="916.45"
          y2="998.81"
        />
        <line
          fill={col[variant].g}
          x1="291.72"
          y1="998.81"
          x2="291.72"
          y2=".5"
        />
        <line
          fill={col[variant].g}
          x1="364.44"
          y1=".5"
          x2="364.44"
          y2="998.81"
        />
        <path
          fill={col[variant].g}
          d="M486.34,555.32c-88.22,0-160-71.78-160-160s71.78-160,160-160,160,71.78,160,160-71.78,160-160,160Z"
        />
        <circle fill={col[variant].g} cx="486.34" cy="395.32" r="86.35" />
        <line
          fill={col[variant].g}
          x1="769.69"
          y1="998.81"
          x2="43.15"
          y2=".5"
        />
        <line
          fill={col[variant].g}
          x1="133.04"
          y1=".5"
          x2="859.58"
          y2="998.81"
        />
        <line fill={col[variant].g} x1="730.6" y1="998.81" x2="4.06" y2=".5" />
        <line
          fill={col[variant].g}
          x1="171.17"
          y1=".5"
          x2="897.71"
          y2="998.81"
        />
        <rect
          fill={col[variant].g}
          x="84.35"
          y="84.21"
          width="832.3"
          height="830.89"
        />
        <path
          fill={col[variant].border}
          d="M84.35,103.44v792.43c0,10.62,8.62,19.23,19.26,19.23h566.07s-52.84-72.6-52.84-72.6H157.07V157.04l-53-72.83h-.46c-10.64,0-19.26,8.61-19.26,19.23Z"
        />
        <path
          fill={col[variant].border}
          d="M532.19,548.95c65.71-20.06,114.04-81.43,114.04-153.19,0-87.84-72.41-160.13-160.4-160.13h-194.12v517.45h72.72v-444.85h121.06c.23,0,.46,0,.69,0,47.45,0,86.5,38.98,86.5,86.35s-38.71,86.05-85.95,86.35h-93.94l315.98,434.17h89.89l-266.47-366.15Z"
        />
        <path
          fill={col[variant].border}
          d="M193.96,84.21l52.84,72.6h597.13v685.69h-59.97l52.84,72.6h60.39c10.64,0,19.26-8.61,19.26-19.23V103.44c0-10.62-8.62-19.23-19.26-19.23H193.96Z"
        />
        <rect
          fill={col[variant].g}
          x="1.34"
          y="-.34"
          width="998.31"
          height="1000"
          transform="translate(1000.15 -.84) rotate(90)"
        />
      </g>
    </svg>
  );
};
