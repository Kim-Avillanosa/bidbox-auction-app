import { Inter } from "next/font/google";
import { Layout, Page, SecuredLayout } from "@/shared/components";
import LoginForm from "@/shared/auth/LoginForm";
import useAuthStore from "@/shared/store/useAuthStore";
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Col,
    Container,
    Row,
    Table,
} from "react-bootstrap";
import useModalStore from "@/shared/store/useModal";
import SellItemDialog from "@/shared/dialogs/SellItemDialog";
import { useUrl } from "@/services/useUrl";
import useSWR from "swr";
import useAxiosClient from "@/services/useAxiosClient";
import { useState } from "react";
import { humanizeTimeDifference } from "@/shared/utils/humanizeTimeDifference";
import MakeBidForm from "@/shared/dialogs/MakeBidForm";
import useAuction from "@/services/useAuction";
import toast from "react-hot-toast";
import DashboardOptions from "./dashboardOptions";
import DashboardTable from "./dashboardTable";
import { useRouter } from "next/router";
import Link from "next/link";

const AuctionDetails: React.FC = () => {
    const { openModal } = useModalStore();

    const router = useRouter();
    const { id } = router.query;
    const { fetcher } = useAxiosClient();

    const { data: currentAuction } = useSWR<Models.Offer>(
        `${useUrl()}/auction/${id}`,
        fetcher,
        {
            refreshInterval: 1000,
            revalidateIfStale: true,
        }
    );

    const { data: bids, error } = useSWR<Models.AuctionBid[]>(
        `${useUrl()}/auction/${id}/bidders`,
        fetcher,
        {
            refreshInterval: 1000,
            revalidateIfStale: true,
        }
    );

    if (error) return <div>asds</div>;

    return (
        <Page title="BidBox">
            <SecuredLayout>
                <div>
                    <div className="d-flex justify-content-between">
                        <Link href={"/dashboard"}>
                            <Button variant="light">Back to dashboard</Button>
                        </Link>
                        <Button
                            onClick={() => {
                                openModal({
                                    title: "Place my bid",
                                    content: <MakeBidForm bidId={parseInt(id as string)} />,
                                });
                            }}
                            variant="success"
                        >
                            🏷️ Bid on this item
                        </Button>
                    </div>
                </div>

                <Card className="mt-3">
                    <CardHeader>
                        <CardTitle>
                            <h1>{currentAuction?.auction_itemName}</h1>
                        </CardTitle>
                        <CardSubtitle>
                            Owned By: {currentAuction?.auction_created_by}
                        </CardSubtitle>
                    </CardHeader>
                    <Card.Body>
                        <CardText>
                            Initial Bid: ${currentAuction?.auction_startPrice} |
                            Now: ${currentAuction?.currentBid ?? 0}
                        </CardText>
                    </Card.Body>
                </Card>
                <div className="mt-4">
                    <h3>Bid History</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Placed By</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bids != null ??
                                bids?.map((item, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>{item.user.email}</td>
                                            <td>
                                                <strong>${item.amount}</strong>
                                            </td>
                                            <td>{item.created_at}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
            </SecuredLayout>
        </Page>
    );
};

export default AuctionDetails;
