import dynamic from "next/dynamic";

const dashboard = dynamic(() => import("@/modules/dashboard/auctionDetails"), { ssr: false });

export default dashboard;
