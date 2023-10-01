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
import { humanizeTimeDifference } from "@/shared/utils/humanizeTimeDifference";
import MakeBidForm from "@/shared/dialogs/MakeBidForm";
import useAuction from "@/services/useAuction";
import toast from "react-hot-toast";

type OfferStatuses = "PENDING" | "ONGOING" | "COMPLETED";


interface DashboardOptionsProps {
    setStatus: (status: OfferStatuses) => void
}

const DashboardOptions: React.FC<DashboardOptionsProps> = ({ setStatus }) => {


    const { currentAccount } = useAuthStore();

    const { openModal } = useModalStore();

    if (!currentAccount)
        return (
            <Page title="Welcome to bid box">
                <Layout>
                    <LoginForm />
                </Layout>
            </Page>
        );

    return (
        <div className="d-flex justify-content-between">
            <div className="mt-3">
                <Button
                    variant="light"
                    size="sm"
                    onClick={() => setStatus("PENDING")}
                    className="m-1"
                >
                    🕒 PENDING
                </Button>
                <Button
                    variant="light"
                    size="sm"
                    onClick={() => setStatus("ONGOING")}
                    className="m-1"
                >
                    ⚡ ONGOING
                </Button>
                <Button
                    variant="light"
                    size="sm"
                    onClick={() => setStatus("COMPLETED")}
                    className="m-1"
                >
                    ✔️ COMPLETED
                </Button>
            </div>
            <div>
                <Button
                    onClick={() =>
                        openModal({
                            title: "Make an offer",
                            content: <SellItemDialog />,
                        })
                    }
                    variant="success"
                    className="m-1"
                >
                    Make Your Offer 🏷️
                </Button>
            </div>
        </div>
    );
};

export default DashboardOptions;
