import { Badge, Button } from "react-bootstrap";
import useModalStore from "../store/useModal";
import DepositDialog from "../dialogs/DepositDialog";
import useSWR from "swr";
import useAuthStore from "../store/useAuthStore";
import { useUrl } from "@/services/useUrl";
import { motion } from "framer-motion";

const DepositButton = () => {
    const { openModal } = useModalStore();
    const { currentAccount } = useAuthStore();

    const revalidateOption = {
        refreshInterval: 1000,
    };

    const { data } = useSWR<Models.UserBalance>(
        `${useUrl()}/users/${currentAccount?.id}/balance`,
        revalidateOption
    );

    return (
        <>
            <Button
                className="m-1"
                variant="light"
                onClick={() => {
                    openModal({
                        title: "Make a deposit 💸",
                        content: <DepositDialog />,
                    });
                }}
            >
                Balance 💸 | <strong>${data?.balance}</strong>
            </Button>
        </>
    );
};

export default DepositButton;
