import dynamic from "next/dynamic";

const dashboard = dynamic(() => import("@/modules/dashboard/Dashboard"));

export default dashboard;
