import React, { useState } from "react";
import { Table, Collapse, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const ResultsTable = ({ results }) => {
  const [open, setOpen] = useState({});

  const handleToggle = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const formatExtRef = (extRef) => {
    if (extRef.length === 9) {
      return `${extRef.charAt(0)}-XXXXXX${extRef.charAt(7)}-${extRef.charAt(
        8
      )}`;
    }
    return extRef;
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  return (
    <Table striped bordered hover responsive="md">
      <thead>
        <tr>
          <th className="text-center"></th>
          <th className="text-center">Account</th>
          <th className="text-center">Operation</th>
          <th className="text-center">Symbol</th>
          <th className="text-center d-none d-md-table-cell">Description</th>
          <th className="text-center d-none d-md-table-cell">Quantity</th>
          <th className="text-center d-none d-md-table-cell">
            Filled Quantity
          </th>
          <th className="text-center d-none d-md-table-cell">Price</th>
          <th className="text-center">Status</th>
          <th className="text-center d-none d-md-table-cell">Start Date</th>
          <th className="text-center d-none d-md-table-cell">Expire Date</th>
          <th className="text-center d-none d-md-table-cell">No Ref</th>
          <th className="text-center d-none d-md-table-cell">Ext Ref</th>
        </tr>
      </thead>
      <tbody>
        {results.map((record) => (
          <React.Fragment key={record.id}>
            <tr>
              <td
                onClick={() => handleToggle(record.id)}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={open[record.id] ? faChevronDown : faChevronRight}
                />
              </td>
              <td className="text-center">{record.account}</td>
              <td className="text-center">{record.operation}</td>
              <td className="text-center">{record.symbol}</td>
              <td className="text-left d-none d-md-table-cell">
                {record.description}
              </td>
              <td className="text-end d-none d-md-table-cell">{record.qty}</td>
              <td className="text-end d-none d-md-table-cell">
                {record.filled_qty}
              </td>
              <td className="text-end d-none d-md-table-cell">
                {formatNumber(record.price)}
              </td>
              <td className="text-center">{record.status}</td>
              <td className="text-center d-none d-md-table-cell">
                {record.start_date}
              </td>
              <td className="text-center d-none d-md-table-cell">
                {record.expire_date}
              </td>
              <td className="text-center d-none d-md-table-cell">
                {record.no_ref}
              </td>
              <td className="text-center d-none d-md-table-cell">
                {formatExtRef(record.ext_ref)}
              </td>
            </tr>
            {record.account_data && (
              <tr>
                <td colSpan="14" style={{ padding: 0, border: "none" }}>
                  <Collapse in={open[record.id]}>
                    <div style={{ padding: "1rem" }}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>
                            {record.account_data.first_name}{" "}
                            {record.account_data.last_name}&nbsp;&nbsp;
                          </strong>
                          <Button variant="outline-primary">
                            Full Review Detail{" "}
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </Button>{" "}
                        </div>
                        <div>
                          <Button variant="primary">Accept</Button>{" "}
                          <Button variant="outline-danger">
                            Reject <FontAwesomeIcon icon={faChevronDown} />
                          </Button>{" "}
                        </div>
                      </div>
                      <Row>
                        <Col>
                          <p>
                            Net Amount:{" "}
                            {formatNumber(record.account_data.net_amount)}
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Price: {formatNumber(record.account_data.price)}
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Exchange Rate: {record.account_data.exchange_rate}
                          </p>
                        </Col>
                        <Col>
                          <p>OS Limit: {record.account_data.os_limit}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>Ref Number: {record.account_data.ref_number}</p>
                        </Col>
                        <Col>
                          <p>Date Time: {record.account_data.date_time}</p>
                        </Col>
                        <Col>
                          <p>Telephone: {record.account_data.telephone}</p>
                        </Col>
                        <Col>
                          <p>User ID: {record.account_data.user_id}</p>
                        </Col>
                      </Row>
                    </div>
                  </Collapse>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default ResultsTable;
