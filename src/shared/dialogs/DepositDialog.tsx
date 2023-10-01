import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Form,
    FormGroup,
    FormLabel,
    FormControl,
    Button,
} from "react-bootstrap";
import toast from "react-hot-toast";
import useAccount from "@/services/useAccount";
import useModalStore from "../store/useModal";

const DepositDialog: React.FC = () => {
    const { deposit } = useAccount();
    const { dismiss } = useModalStore();

    const validationSchema = Yup.object({
        amount: Yup.number()
            .required("Amount is required")
            .positive("Amount must be positive")
            .typeError("Invalid amount"),
    });

    const formik = useFormik({
        initialValues: {
            amount: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            toast
                .promise(deposit(values.amount), {
                    success: `
                    Fantastic! 🎉 Your deposit has been successfully processed. Your funds are now securely stored in your wallet, ready for your convenience. `,
                    loading: "Please wait",
                    error: "Deposit failed",
                })
                .then((resp) => {
                    if (resp.status === 200) {
                        dismiss();
                    }
                });
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <FormControl
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Enter the deposit amount"
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    isInvalid={formik.touched.amount && !!formik.errors.amount}
                />
                {formik.touched.amount && (
                    <div className="text-danger">{formik.errors.amount}</div>
                )}
            </FormGroup>

            <div className="mt-3">
                <Button className="w-100" type="submit">
                    Deposit
                </Button>
            </div>
        </Form>
    );
};

export default DepositDialog;
