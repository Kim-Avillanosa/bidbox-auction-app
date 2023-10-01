import useAuthStore from "@/shared/store/useAuthStore";
import Link from "next/link";
import React from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import DepositButton from "../DepositButton";

const AppBar = () => {
    const { dismiss, currentAccount } = useAuthStore();

    return (
        <Navbar expand="lg" >
            <Container>
                <Navbar.Brand>
                    <strong>BidBox</strong> 📦
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" />
                    <Nav className="justify-content-end">
                        <Nav.Item>
                            <DepositButton />
                        </Nav.Item>
                        <Nav.Item>
                            <Button
                                className="m-1"
                                variant="outline-dark"
                                onClick={() => dismiss()}
                            >
                                Logout ({currentAccount?.userName})
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppBar;
