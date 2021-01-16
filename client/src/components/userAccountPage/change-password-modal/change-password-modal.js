import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { Form, Col } from "react-bootstrap";

function ChangePasswordModal({
    password,
    confirmPassword,
    oldPassword,
    setPassword,
    setConfirmPassword,
    setOldPassword,
    dispatch,
    changeUserPassword,
    passwordError,
    passwordRegexError,
}) {
    return (
        <>
            <Modal.Header>Change Your Password</Modal.Header>
            <Modal.Content>
                <Form
                    onSubmit={(event) => {
                        console.log(event);
                    }}
                >
                    <Form.Group>
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type="password"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div className="password-check-error">{passwordError}</div>
                    <div className="password-check-error">
                        {passwordRegexError}
                    </div>
                    <Form.Group>
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <div className="password-check-error">{passwordError}</div>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <div id="model-buttons">
                    <Button
                        negative
                        onClick={() => {
                            setPassword("");
                            setConfirmPassword("");
                            setOldPassword("");
                            dispatch({ type: "CLOSE_MODAL" });
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        positive
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            setPassword("");
                            setConfirmPassword("");
                            setOldPassword("");
                            changeUserPassword();
                            dispatch({ type: "CLOSE_MODAL" });
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </Modal.Actions>
        </>
    );
}

export default ChangePasswordModal;
