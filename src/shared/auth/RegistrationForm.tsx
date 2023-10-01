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
import Link from "next/link";
import useAuth from "@/services/useAuth";
import toast from "react-hot-toast/headless";
import { useRouter } from "next/router";

const RegistrationForm = () => {
    const { register } = useAuth();

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), ""], "Passwords must match")
                .required("Confirm Password is required"),
        }),
        onSubmit: (values) => {
            toast
                .promise(register(values.email, values.password), {
                    success: `Account successfully created`,
                    loading: "Please wait",
                    error: "Cannot process request",
                })
                .then((resp) => {
                    router.push("/");
                });
        },
    });

    return (
        <div className="container mt-5  w-50">
            <h1>
                <strong>Register</strong>
            </h1>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    {formik.touched.email && (
                        <div className="text-danger">{formik.errors.email}</div>
                    )}
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={
                            formik.touched.password && Boolean(formik.errors.password)
                        }
                    />
                    {formik.touched.password && (
                        <div className="text-danger">{formik.errors.password}</div>
                    )}
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        isInvalid={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                    />
                    {formik.touched.confirmPassword && (
                        <div className="text-danger">{formik.errors.confirmPassword}</div>
                    )}
                </FormGroup>
                <div className="text-center  m-3">
                    <Button className="w-25" color="primary" type="submit">
                        Register
                    </Button>
                </div>

                <div className="text-center m-3">
                    <Link href={"/"}>
                        <Button className="w-25" variant="outline-dark">
                            Login
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default RegistrationForm;
