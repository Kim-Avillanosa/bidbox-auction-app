import { Inter } from "next/font/google";
import { Layout, Page, SecuredLayout } from "@/shared/components";
import LoginForm from "@/shared/auth/LoginForm";
import useAuthStore from "@/shared/store/useAuthStore";
import { Badge, Button, Table } from "react-bootstrap";
import useModalStore from "@/shared/store/useModal";
import SellItemDialog from "@/shared/dialogs/SellItemDialog";
import { useUrl } from "@/services/useUrl";
import useSWR from "swr";
import useAxiosClient from "@/services/useAxiosClient";
import { useState } from "react";
import {
    convertToDesiredTimezone,
    calculateDurationRemaining,
} from "@/shared/utils/humanizeTimeDifference";
import MakeBidForm from "@/shared/dialogs/MakeBidForm";
import useAuction from "@/services/useAuction";
import toast from "react-hot-toast";
import Link from "next/link";

import { DateTime } from "luxon";
import moment from "moment-timezone";

type OfferStatuses = "PENDING" | "ONGOING" | "COMPLETED";

interface DashboardTableProps {
    status: OfferStatuses;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
    status = "ONGOING",
}) => {
    const { fetcher } = useAxiosClient();

    const { startOffer } = useAuction();

    const { data } = useSWR<Models.Offer[]>(
        `${useUrl()}/auction/list/${status}`,
        fetcher,
        {
            refreshInterval: 1000,
            revalidateIfStale: true,
        }
    );

    const { currentAccount } = useAuthStore();

    const { openModal } = useModalStore();

    if (data != null && data?.length <= 0) return <div>No Items Found</div>;

    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Start Price</th>
                    <th>Current Price</th>
                    <th>Expires in</th>
                    <th>Status</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{item.auction_itemName}</td>
                            <td>
                                <strong>${item.auction_startPrice}</strong>
                            </td>
                            <td>
                                <span className="text-success">
                                    <strong>${item.currentBid ?? item.auction_startPrice}</strong>
                                </span>
                            </td>
                            <td>
                                {moment(item.auction_expiration).format("hh:mm:ss A")}
                                {/* {Intl.DateTimeFormat().resolvedOptions().timeZone} */}
                            </td>
                            <td>
                                <Badge bg="dark">{item.auction_status}</Badge>
                            </td>
                            <td>
                                <div
                                    hidden={
                                        (currentAccount != null &&
                                            item.auction_created_by != currentAccount.userName) ||
                                        item.auction_status !== "PENDING"
                                    }
                                >
                                    <Button
                                        onClick={() => {
                                            toast.promise(startOffer(item.auction_id), {
                                                success: `Your bid has been placed`,
                                                loading: "Please wait",
                                                error: (err) => err.response.data.message,
                                            });
                                        }}
                                        variant="light"
                                        className="m-1"
                                        size="sm"
                                    >
                                        ⚡ Start
                                    </Button>
                                </div>
                                <div hidden={item.auction_status !== "ONGOING"}>
                                    <Link href={`/dashboard/${item.auction_id}`}>
                                        <Button variant="light" className="m-1" size="sm">
                                            📄 Details
                                        </Button>
                                    </Link>
                                    <Button
                                        hidden={
                                            currentAccount != null &&
                                            item.auction_created_by == currentAccount.userName
                                        }
                                        onClick={() => {
                                            openModal({
                                                title: "Place my bid",
                                                content: <MakeBidForm bidId={item.auction_id} />,
                                            });
                                        }}
                                        variant="success"
                                        className="m-1"
                                        size="sm"
                                    >
                                        🏷️ Bid
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default DashboardTable;
