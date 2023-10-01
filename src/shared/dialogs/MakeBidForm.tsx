import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import useAuction from "@/services/useAuction";
import toast from "react-hot-toast";
import useModalStore from "../store/useModal";

interface MakeBidFormProps {
    bidId: number;
}

const MakeBidForm: React.FC<MakeBidFormProps> = ({ bidId }) => {
    const { bidOffer } = useAuction();
    const { dismiss } = useModalStore();

    const initialValues: Models.BidOffer = {
        amount: 0,
    };

    const validationSchema = Yup.object({
        amount: Yup.number()
            .required("Amount is required")
            .positive("Amount must be a positive number")
            .integer("Amount must be an integer"),
    });

    const onSubmit = (values: Models.BidOffer) => {
        toast
            .promise(bidOffer(bidId, values), {
                success: `Your bid has been placed`,
                loading: "Please wait",
                error: "Bid request failed",
            })
            .then((resp) => {
                formik.setSubmitting(false);
                dismiss();
            });
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter the bid amount"
                    {...formik.getFieldProps("amount")}
                    isInvalid={formik.touched.amount && !!formik.errors.amount}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.amount}
                </Form.Control.Feedback>
            </Form.Group>

            <Button className="mt-3 w-100" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default MakeBidForm;
