"use client";

const REMAINING = 337;
const TOTAL = 500;
const R = 38;
const CIRC = 2 * Math.PI * R;
const greenDash = (REMAINING / TOTAL) * CIRC;
const grayDash = CIRC - greenDash;

export default function EnrollmentCard({ accentColor }: { accentColor?: string }) {
  return (
    <div className="relative" style={{ width: 378, height: 257 }}>

      {/* Card body SVG — organic path with concave cutout built-in */}
      <div className="absolute" style={{ top: 17, left: 0, zIndex: 1 }}>
        <svg width="378" height="240" viewBox="0 0 378 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <foreignObject x="-20.8738" y="-20.8738" width="419.748" height="281.748">
            <div

              style={{ backdropFilter: "blur(10.44px)", clipPath: "url(#bgblur_card_clip)", height: "100%", width: "100%" }}
            />
          </foreignObject>
          <path
            d="M184.386 0.416992H22.6455C10.3533 0.416992 0.416992 9.98074 0.416992 21.7422V218.258C0.416992 230.019 10.3533 239.583 22.6455 239.583H355.354C367.647 239.583 377.583 230.019 377.583 218.258V154.27C377.583 145.839 372.494 138.821 365.179 134.312C357.862 129.801 348.366 127.838 339.674 129.5C332.124 130.944 324.252 131.707 316.161 131.707C259.736 131.707 213.841 94.5315 213.841 48.502C213.841 46.5359 213.925 44.5854 214.09 42.6533C214.872 33.4968 212.201 22.9152 206.938 14.6289C201.674 6.34247 193.863 0.416992 184.386 0.416992Z"
            fill="white"
            fillOpacity="0.5"
            stroke="url(#paint0_linear_card)"
            strokeWidth="0.834951"
          />
          <defs>
            <clipPath id="bgblur_card_clip" transform="translate(20.8738 20.8738)">
              <path d="M184.386 0.416992H22.6455C10.3533 0.416992 0.416992 9.98074 0.416992 21.7422V218.258C0.416992 230.019 10.3533 239.583 22.6455 239.583H355.354C367.647 239.583 377.583 230.019 377.583 218.258V154.27C377.583 145.839 372.494 138.821 365.179 134.312C357.862 129.801 348.366 127.838 339.674 129.5C332.124 130.944 324.252 131.707 316.161 131.707C259.736 131.707 213.841 94.5315 213.841 48.502C213.841 46.5359 213.925 44.5854 214.09 42.6533C214.872 33.4968 212.201 22.9152 206.938 14.6289C201.674 6.34247 193.863 0.416992 184.386 0.416992Z" />
            </clipPath>
            <linearGradient id="paint0_linear_card" x1="199.887" y1="-0.418117" x2="-14.0124" y2="222.365" gradientUnits="userSpaceOnUse">
              <stop offset="0.580255" stopColor="#F4F4F5" stopOpacity="0.5" />
              <stop offset="0.944612" stopColor="#8E8E8F" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Card content overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-7 pl-4">
          <p className="text-[#1E1E22] leading-3.75 tracking-[0.02em]" style={{ fontSize: 12, maxWidth: 186 }}>
            Limited enrollment ensures every patient receives personalized, physician guided care without compromise.
          </p>
          <div>
            <p className="text-[#18181B] uppercase leading-3.75 tracking-[0.02em]" style={{ fontSize: 11.7 }}>
              Now Accepting
            </p>
            <p className="text-[#18181B] font-bold leading-8.5" style={{ fontSize: 26.7 }}>
              Our first 500 patients
            </p>
          </div>
        </div>
      </div>

      {/* Badge SVG — organic blob shape with ring overlay */}
      <div className="absolute" style={{ width: 174, height: 137, top: -2, right: -4, zIndex: 2 }}>
        <svg width="174" height="137" viewBox="0 0 174 137" fill="none" xmlns="http://www.w3.org/2000/svg">
          <foreignObject x="-41.7476" y="-41.7476" width="256.579" height="219.827">
            <div
              style={{ backdropFilter: "blur(20.87px)", clipPath: "url(#bgblur_badge_clip)", height: "100%", width: "100%" }}
            />
          </foreignObject>
          <path
            d="M2.02071 9.62162C5.11192 12.5636 20.6382 36.7379 23.5606 50.5146C23.5606 50.5146 25.3625 63.3579 26.4829 72.6408C27.6033 81.9237 33.2925 94.4352 42.9173 107.759C53.507 122.418 65.7814 126.005 83.3327 130.369C98.0735 134.034 115.948 131.066 126.151 129.372C128.832 128.927 130.983 128.57 132.409 128.444C139.262 127.839 152.645 128.432 162.72 135.179C166.807 137.917 173.157 135.533 173.083 130.614L171.4 19.7567C171.342 15.9346 170.925 12.072 169.292 8.6158C168.23 6.36831 166.8 4.10773 165.126 3.3678C165.083 3.34886 165.022 3.31227 164.936 3.26091C163.919 2.65316 159.439 -0.0231156 141.008 0.000150777C132.26 0.0111926 123.968 0.00763542 115.525 0.00401378C111.273 0.00218984 106.983 0.00034956 102.578 0.00034956H52.0589H15.4925H4.25197C-0.417891 0.00034956 -1.36201 6.40218 2.02071 9.62162Z"
            fill="white"
            fillOpacity="0.5"
          />
          <defs>
            <clipPath id="bgblur_badge_clip" transform="translate(41.7476 41.7476)">
              <path d="M2.02071 9.62162C5.11192 12.5636 20.6382 36.7379 23.5606 50.5146C23.5606 50.5146 25.3625 63.3579 26.4829 72.6408C27.6033 81.9237 33.2925 94.4352 42.9173 107.759C53.507 122.418 65.7814 126.005 83.3327 130.369C98.0735 134.034 115.948 131.066 126.151 129.372C128.832 128.927 130.983 128.57 132.409 128.444C139.262 127.839 152.645 128.432 162.72 135.179C166.807 137.917 173.157 135.533 173.083 130.614L171.4 19.7567C171.342 15.9346 170.925 12.072 169.292 8.6158C168.23 6.36831 166.8 4.10773 165.126 3.3678C165.083 3.34886 165.022 3.31227 164.936 3.26091C163.919 2.65316 159.439 -0.0231156 141.008 0.000150777C132.26 0.0111926 123.968 0.00763542 115.525 0.00401378C111.273 0.00218984 106.983 0.00034956 102.578 0.00034956H52.0589H15.4925H4.25197C-0.417891 0.00034956 -1.36201 6.40218 2.02071 9.62162Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Ring + text centered over badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={R} fill="none" stroke="#D0D0D0" strokeWidth="7" />
              <circle
                cx="50" cy="50" r={R}
                fill="none"
                stroke={accentColor}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${greenDash} ${grayDash}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-[#18181B] font-bold leading-none" style={{ fontSize: 13.4 }}>{REMAINING}</p>
              <p className="text-[#18181B] leading-none mt-0.5" style={{ fontSize: 10 }}>Remaining</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
