import React from "react";
import { useFormik } from "formik";
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormControl,
    Badge,
} from "react-bootstrap";
import toast from "react-hot-toast";
import useAuction from "@/services/useAuction";
import useModalStore from "../store/useModal";
import * as Yup from "yup";
import moment from "moment-timezone";
import { getEndDate, humanizeTimeLeftByDuration } from "../utils/humanizeDateTime";

const expirationOptions = [
    { label: "mock", value: 1 * 60 * 1000 }, // 1 minute in milliseconds
    { label: "1 min", value: 1 * 60 * 1000 }, // 1 minute in milliseconds
    { label: "1 hour", value: 1 * 60 * 60 * 1000 }, // 1 hour in milliseconds
    { label: "2 hours", value: 2 * 60 * 60 * 1000 }, // 2 hours in milliseconds
    { label: "5 hours", value: 5 * 60 * 60 * 1000 }, // 5 hours in milliseconds
    { label: "10 hours", value: 10 * 60 * 60 * 1000 }, // 10 hours in milliseconds
];

const SellItemDialog: React.FC = () => {
    const { makeOffer } = useAuction();
    const { dismiss } = useModalStore();

    const initialValues: Models.MakeOffer = {
        itemName: "",
        startAmount: 0,
        duration: expirationOptions[0].value, // Set the default expiration duration
    };

    const validationSchema = Yup.object().shape({
        itemName: Yup.string().required("Item Name is required"),
        startAmount: Yup.number()
            .typeError("Start Amount must be a number")
            .min(0, "Start Amount must be greater than or equal to 0")
            .required("Start Amount is required"),
        duration: Yup.number().required("Expiration Duration is required"),
    });

    const onSubmit = (values: Models.MakeOffer) => {
        formik.setSubmitting(true);

        // Convert the duration back to seconds before making the offer
        const valuesWithSeconds = { ...values, duration: values.duration * 60 };

        toast
            .promise(makeOffer(valuesWithSeconds), {
                success: `🎉 Congratulations! 🎉 Your auction item is now live and ready for bidding. Best of luck with your sale! 💰👍`,
                loading: "Please wait",
                error: (err) => err.response.data.message,
            })
            .then((resp) => {
                formik.setSubmitting(false);
                dismiss();
            });
    };

    const formik = useFormik<Models.MakeOffer>({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mt-3" controlId="itemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                    type="text"
                    name="itemName"
                    value={formik.values.itemName}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.itemName && !!formik.errors.itemName}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.itemName}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3" controlId="startAmount">
                <Form.Label>Start Amount</Form.Label>
                <Form.Control
                    type="number"
                    name="startAmount"
                    value={formik.values.startAmount}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.startAmount && !!formik.errors.startAmount}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.startAmount}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3" controlId="duration">
                <Form.Label>Duration</Form.Label>
                <Form.Text>
                    <Badge bg="secondary" className="m-1">
                        {moment.duration(formik.values.duration, "millisecond").humanize()}
                    </Badge>
                    <Badge bg="secondary" className="m-1">
                        {getEndDate(formik.values.duration)}
                    </Badge>
                </Form.Text>
                <Form.Control
                    as="select"
                    name="duration"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.duration && !!formik.errors.duration}
                >
                    {expirationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Form.Control>

                <Form.Control.Feedback type="invalid">
                    {formik.errors.duration}
                </Form.Control.Feedback>
                <div></div>
            </Form.Group>
            <Button className="mt-3 w-100" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default SellItemDialog;
