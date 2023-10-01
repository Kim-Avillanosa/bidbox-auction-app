import useAuthStore from "@/shared/store/useAuthStore";
import Link from "next/link";
import React, { useState } from "react";
import { Button, NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import DepositButton from "../DepositButton";

const AppBar = () => {
    const { dismiss, currentAccount } = useAuthStore();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Bid Box</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" href={"/app"}>
                            Auction
                        </Link>
                        <Link className="nav-link" href={"/app"}>
                            My Items
                        </Link>
                    </Nav>
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
