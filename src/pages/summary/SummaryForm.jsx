import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { Popover, Form, Button, OverlayTrigger } from "react-bootstrap";

/*

);

const Example = () => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <Button variant="success">Click me to see</Button>
  </OverlayTrigger>
);
*/

export default function SummaryForm({ setOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  function submitHandler(e) {
    e.preventDefault();
    setTcChecked(e.target.checked);
  }

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={submitHandler}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!tcChecked}
        onClick={() => setOrderPhase("completed")}
      >
        Confirm order
      </Button>
    </Form>
  );
}
