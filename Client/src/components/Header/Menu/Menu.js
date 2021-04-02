import React, { useContext } from "react";

import { Context } from "../../../context";
import { Nav } from "react-bootstrap";

export default function Menu() {
  const ctx = useContext(Context);
  return (
    <Nav
      variant="tabs"
      activeKey={ctx.selectedNavigation}
      onSelect={ctx.setSelectedNavigation}
    >
      <Nav.Item>
        <Nav.Link eventKey="main" title="Main">
          Main
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="map" title="Map">
          Map
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
