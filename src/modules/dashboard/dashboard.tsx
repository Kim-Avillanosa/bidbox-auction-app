import { Inter } from "next/font/google";
import { Layout, Page, SecuredLayout } from "@/shared/components";
import LoginForm from "@/shared/auth/LoginForm";
import useAuthStore from "@/shared/store/useAuthStore";
import { Badge, Button, Col, Container, Row, Table } from "react-bootstrap";
import useModalStore from "@/shared/store/useModal";
import SellItemDialog from "@/shared/dialogs/SellItemDialog";
import { useUrl } from "@/services/useUrl";
import useSWR from "swr";
import useAxiosClient from "@/services/useAxiosClient";
import { useState } from "react";
import MakeBidForm from "@/shared/dialogs/MakeBidForm";
import DashboardOptions from "./dashboardOptions";
import DashboardTable from "./dashboardTable";

type OfferStatuses = "PENDING" | "ONGOING" | "COMPLETED";

const Dashboard: React.FC = () => {
    const [currentStatus, setStatus] = useState<OfferStatuses>("ONGOING");

    return (
        <Page title="BidBox">
            <SecuredLayout>
                <h1>
                    <strong>🏷️ Auction Dashboard</strong>
                </h1>
                <DashboardOptions setStatus={(status) => setStatus(status)} />
                <hr />
                <DashboardTable status={currentStatus} />
            </SecuredLayout>
        </Page>
    );
};

export default Dashboard;
