import dynamic from "next/dynamic";

const dashboard = dynamic(() => import("@/modules/dashboard/auctionDetails"));

export default dashboard;
