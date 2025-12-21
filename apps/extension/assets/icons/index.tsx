import React from "react"

export function ProfileIcon({ fill, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M15.9974 2.66406C12.5041 2.66406 9.66406 5.50406 9.66406 8.9974C9.66406 12.4241 12.3441 15.1974 15.8374 15.3174C15.9441 15.3041 16.0507 15.3041 16.1307 15.3174C16.1574 15.3174 16.1707 15.3174 16.1974 15.3174C16.2107 15.3174 16.2107 15.3174 16.2241 15.3174C19.6374 15.1974 22.3174 12.4241 22.3307 8.9974C22.3307 5.50406 19.4907 2.66406 15.9974 2.66406Z"
        fill={fill || "#C4C4C4"}
      />
      <path
        d="M22.7772 18.8678C19.0572 16.3878 12.9905 16.3878 9.24385 18.8678C7.55052 20.0011 6.61719 21.5345 6.61719 23.1745C6.61719 24.8145 7.55052 26.3345 9.23052 27.4545C11.0972 28.7078 13.5505 29.3345 16.0039 29.3345C18.4572 29.3345 20.9105 28.7078 22.7772 27.4545C24.4572 26.3211 25.3905 24.8011 25.3905 23.1478C25.3772 21.5078 24.4572 19.9878 22.7772 18.8678Z"
        fill={fill || "#C4C4C4"}
      />
    </svg>
  )
}

export function ClockIcon({ fill, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M29.3307 15.9974C29.3307 23.3574 23.3574 29.3307 15.9974 29.3307C8.6374 29.3307 2.66406 23.3574 2.66406 15.9974C2.66406 8.6374 8.6374 2.66406 15.9974 2.66406C23.3574 2.66406 29.3307 8.6374 29.3307 15.9974Z"
        fill={fill || "#C4C4C4"}
        stroke={fill || "#C4C4C4"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9478 20.2345L16.8145 17.7678C16.0945 17.3411 15.5078 16.3145 15.5078 15.4745V10.0078"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HomeIcon({ fill, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M27.7707 10.6774L19.0373 3.69075C17.3307 2.33075 14.664 2.31742 12.9707 3.67742L4.23735 10.6774C2.98401 11.6774 2.22401 13.6774 2.49068 15.2508L4.17068 25.3041C4.55735 27.5574 6.65068 29.3308 8.93068 29.3308H23.064C25.3173 29.3308 27.4507 27.5174 27.8373 25.2908L29.5173 15.2374C29.7573 13.6774 28.9973 11.6774 27.7707 10.6774Z"
        fill={fill || "#C4C4C4"}
      />
      <path
        d="M16 25C15.4533 25 15 24.5467 15 24V20C15 19.4533 15.4533 19 16 19C16.5467 19 17 19.4533 17 20V24C17 24.5467 16.5467 25 16 25Z"
        fill="white"
      />
    </svg>
  )
}

export function ReceiptDiscountIcon({
  fill,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9688 9.03344L11.7287 8.27344"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.27344 13.73L8.49344 11.51L9.00344 11"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 11V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9242 13.5H11.9332"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.19763 8.5H6.20661"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MoneyChangeIcon({
  fill,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M14.5 12C14.5 10.62 13.38 9.5 12 9.5C10.62 9.5 9.5 10.62 9.5 12C9.5 13.38 10.62 14.5 12 14.5"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 13.1406V15.0006C22 18.5006 20 20.0006 17 20.0006H12"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 11V9C2 5.5 4 4 7 4H17C20 4 22 5.5 22 9"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 9.5V14.5"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 15.5H7.34003C7.98003 15.5 8.5 16.02 8.5 16.66V17.94"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.21997 14.2812L2 15.5012L3.21997 16.7212"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 20.7838H3.15997C2.51997 20.7838 2 20.2637 2 19.6237V18.3438"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.28125 22.0025L8.50122 20.7825L7.28125 19.5625"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MoneySendIcon({
  fill,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M9.5 13.7522C9.5 14.7222 10.25 15.5022 11.17 15.5022H13.05C13.85 15.5022 14.5 14.8222 14.5 13.9722C14.5 13.0622 14.1 12.7322 13.51 12.5222L10.5 11.4722C9.91 11.2622 9.51001 10.9422 9.51001 10.0222C9.51001 9.18219 10.16 8.49219 10.96 8.49219H12.84C13.76 8.49219 14.51 9.27219 14.51 10.2422"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.5V16.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 15.94 4.28001 19.35 7.60001 20.98"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12C22 17.52 17.52 22 12 22"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 6V2H18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 7L22 2"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CashIcon({ fill, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M11.2652 9.46819C11.2652 7.87519 10.3052 7.32919 8.3852 7.10119C7.0142 6.91894 6.74045 6.55519 6.74045 5.91769C6.74045 5.28019 7.19795 4.87069 8.11145 4.87069C8.9342 4.87069 9.3917 5.14369 9.6197 5.82694C9.64364 5.89289 9.68712 5.94997 9.74434 5.99057C9.80156 6.03117 9.86979 6.05337 9.93995 6.05419H10.6712C10.7134 6.05531 10.7555 6.04785 10.7947 6.03225C10.834 6.01665 10.8697 5.99324 10.8996 5.96343C10.9296 5.93363 10.9532 5.89805 10.9689 5.85886C10.9847 5.81967 10.9924 5.77768 10.9914 5.73544V5.69044C10.9021 5.19611 10.652 4.74514 10.28 4.40757C9.90794 4.07001 9.43486 3.86475 8.9342 3.82369V2.73169C8.9342 2.54944 8.79695 2.41294 8.56895 2.36719H7.8827C7.70045 2.36719 7.5632 2.50369 7.51745 2.73169V3.77869C6.1457 3.96019 5.27795 4.87069 5.27795 6.00919C5.27795 7.51069 6.19145 8.10244 8.11145 8.33044C9.3917 8.55769 9.8027 8.83144 9.8027 9.55969C9.8027 10.2872 9.16295 10.7882 8.29445 10.7882C7.1057 10.7882 6.6947 10.2879 6.55745 9.60469C6.51245 9.42319 6.37445 9.33169 6.2372 9.33169H5.4602C5.41803 9.33066 5.37608 9.3382 5.33691 9.35385C5.29773 9.3695 5.26213 9.39292 5.23227 9.42272C5.2024 9.45251 5.17889 9.48806 5.16315 9.5272C5.14741 9.56634 5.13977 9.60826 5.1407 9.65044V9.69544C5.32295 10.8339 6.05495 11.6529 7.5632 11.8809V12.9737C7.5632 13.1552 7.70045 13.2924 7.92845 13.3374H8.6147C8.79695 13.3374 8.9342 13.2009 8.97995 12.9737V11.8802C10.3517 11.6529 11.2652 10.6967 11.2652 9.46744V9.46819Z"
        fill="white"
      />
      <path
        d="M5.91848 14.2477C2.35298 12.9727 0.524482 9.01275 1.85048 5.508C2.53598 3.5955 4.04423 2.13975 5.91848 1.4565C6.10148 1.36575 6.19223 1.22925 6.19223 1.00125V0.36375C6.19223 0.18225 6.10148 0.04575 5.91848 0C5.87273 0 5.78123 -4.19095e-08 5.73548 0.045C4.7068 0.366243 3.75183 0.887796 2.92555 1.57963C2.09927 2.27146 1.418 3.11991 0.920966 4.07612C0.423935 5.03233 0.120961 6.07741 0.0294888 7.15119C-0.0619835 8.22498 0.0598529 9.30625 0.387982 10.3328C1.20998 12.8828 3.17573 14.8403 5.73548 15.6593C5.91848 15.75 6.10148 15.6592 6.14648 15.477C6.19223 15.432 6.19223 15.3855 6.19223 15.2948V14.6572C6.19223 14.5207 6.05573 14.3392 5.91848 14.2477ZM10.7635 0.0457499C10.5805 -0.0457501 10.3975 0.04575 10.3525 0.22725C10.3067 0.273 10.3067 0.31875 10.3067 0.4095V1.047C10.3067 1.22925 10.4432 1.41075 10.5805 1.50225C14.146 2.77725 15.9745 6.73725 14.6485 10.242C13.963 12.1545 12.4547 13.6103 10.5805 14.2935C10.3975 14.3843 10.3067 14.5208 10.3067 14.7488V15.3862C10.3067 15.5677 10.3975 15.7043 10.5805 15.75C10.6262 15.75 10.7177 15.75 10.7635 15.705C11.7922 15.3838 12.7471 14.8622 13.5734 14.1704C14.3997 13.4785 15.081 12.6301 15.578 11.6739C16.075 10.7177 16.378 9.67259 16.4695 8.59881C16.5609 7.52502 16.4391 6.44375 16.111 5.41725C15.289 2.82225 13.2775 0.86475 10.7635 0.0457499Z"
        fill="white"
      />
    </svg>
  )
}

export function ArrowDownIcon({
  fill,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M13.2788 5.96875L8.93208 10.3154C8.41875 10.8288 7.57875 10.8288 7.06542 10.3154L2.71875 5.96875"
        stroke="black"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronLeftIcon({
  fill,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M12.5415 16.5999L7.10817 11.1666C6.4665 10.5249 6.4665 9.4749 7.10817 8.83324L12.5415 3.3999"
        stroke="black"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CopyIcon({ fill, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
        fill="black"
        fillOpacity="0.4"
      />
      <path
        d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z"
        fill="black"
        fillOpacity="0.4"
      />
    </svg>
  )
}
