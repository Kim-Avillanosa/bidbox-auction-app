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

    function roundToDecimalPlaces(number: number, decimalPlaces: number): number {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(number * factor) / factor;
    }

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
                Balance 💸 |{" "}
                <strong>${roundToDecimalPlaces(data?.balance ?? 0, 2)}</strong>
            </Button>
        </>
    );
};

export default DepositButton;
