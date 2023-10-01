import dynamic from "next/dynamic";

const dashboard = dynamic(() => import("@/modules/dashboard/dashboard"));

export default dashboard;
