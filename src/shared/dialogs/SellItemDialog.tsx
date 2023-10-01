import React from "react";
import { useFormik } from "formik";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import useAuction from "@/services/useAuction";
import useModalStore from "../store/useModal";

const today = new Date();
const defaultExpirationDate = new Date(
    today.getTime() + 7 * 24 * 60 * 60 * 1000
); // Add 7 days in milliseconds

const SellItemDialog: React.FC = () => {
    const { makeOffer } = useAuction();

    const { dismiss } = useModalStore();

    const initialValues: Models.MakeOffer = {
        itemName: "",
        startAmount: 0,
        expiration: defaultExpirationDate,
    };

    const onSubmit = (values: any) => {
        formik.setSubmitting(true);

        toast
            .promise(makeOffer(values), {
                success: `🎉 Congratulations! 🎉 Your auction item is now live and ready for bidding. Best of luck with your sale! 💰👍`,
                loading: "Please wait",
                error: "Deposit failed",
            })
            .then((resp) => {
                formik.setSubmitting(false);
                dismiss();
            });
    };

    const formik = useFormik<Models.MakeOffer>({
        initialValues,
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="itemName" className="form-label">
                    Item Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="itemName"
                    name="itemName"
                    value={formik.values.itemName}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="startAmount" className="form-label">
                    Start Amount
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="startAmount"
                    name="startAmount"
                    value={formik.values.startAmount}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="expiration" className="form-label">
                    Expiration Date
                </label>
                <input
                    type="datetime-local"
                    className="form-control"
                    id="expiration"
                    name="expiration"
                    value={formik.values.expiration.toString()}
                    onChange={formik.handleChange}
                />
            </div>
            <Button className="w-100" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default SellItemDialog;
