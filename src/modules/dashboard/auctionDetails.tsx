import { Inter } from "next/font/google";
import { Layout, Page, SecuredLayout } from "@/shared/components";
import LoginForm from "@/shared/auth/LoginForm";
import useAuthStore from "@/shared/store/useAuthStore";
import {
    Button,
    Card,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Table,
} from "react-bootstrap";
import useModalStore from "@/shared/store/useModal";
import { useUrl } from "@/services/useUrl";
import useSWR from "swr";
import useAxiosClient from "@/services/useAxiosClient";
import MakeBidForm from "@/shared/dialogs/MakeBidForm";
import { useRouter } from "next/router";
import Link from "next/link";

const AuctionDetails: React.FC = () => {
    const { openModal } = useModalStore();

    const { currentAccount } = useAuthStore();

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

    const { data: bids_raw, isLoading } = useSWR<Models.AuctionBid[]>(
        `${useUrl()}/auction/${id}/bidders`,
        fetcher,
        {
            refreshInterval: 1000,
            revalidateIfStale: true,
        }
    );

    const renderTable = () => {
        if (isLoading) return <div>Please wait</div>;

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Placed By</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {bids_raw?.map((item, idx) => {
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
        );
    };

    const RenderOptions = () => {
        return (
            <div>
                <div className="d-flex justify-content-between">
                    <div></div>
                    <Button
                        hidden={
                            currentAccount?.userName == currentAuction?.auction_created_by
                        }
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
        );
    };

    return (
        <Page title="BidBox">
            <SecuredLayout>
                <h1>
                    <strong>🏷️ Item Information</strong>{" "}
                    <Link href={"/dashboard"}>
                        <Button variant="light">Back to dashboard</Button>
                    </Link>
                </h1>
                {RenderOptions()}
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
                            Initial Bid: ${currentAuction?.auction_startPrice}
                        </CardText>
                        <CardText className="text-success">
                            <strong>Now: ${currentAuction?.currentBid ?? 0}</strong>
                        </CardText>
                    </Card.Body>
                </Card>
                <div className="mt-4">
                    <h3>Bid History</h3>
                    {renderTable()}
                </div>
            </SecuredLayout>
        </Page>
    );
};

export default AuctionDetails;
