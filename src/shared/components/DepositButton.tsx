import { Button, } from "react-bootstrap";
import useModalStore from "../store/useModal";
import DepositDialog from "../dialogs/DepositDialog";

const DepositButton = () => {
    const { openModal } = useModalStore();


    return (
        <Button
            className="m-1"
            variant="outline-success"
            onClick={() => {
                openModal({
                    title: "Deposit to account",
                    content: <DepositDialog />,
                });
            }}
        >
            Deposit 💸
        </Button>
    );
};

export default DepositButton;
