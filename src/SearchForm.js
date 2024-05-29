import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ResultsTable from "./ResultsTable";

const SearchForm = () => {
  const [period, setPeriod] = useState("Transmission");
  const [status, setStatus] = useState("Waiting");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.get("/records.json");
      const data = response.data;
      let filteredData = data.filter((record) => record.status === status);
      filteredData = filteredData.filter((record) => {
        if (startDate && endDate) {
          return (
            new Date(record.start_date) >= startDate &&
            new Date(record.expire_date) <= endDate
          );
        } else if (!startDate && endDate) {
          return new Date(record.expire_date) <= endDate;
        } else if (startDate && !endDate) {
          return new Date(record.start_date) >= startDate;
        } else {
          return true; // Include all records if no date filter is applied
        }
      });
      setResults(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <h4>Search Result: {results.length}</h4>
          </Col>
          <Col xs={12} md={6}>
            <Row>
              <Col>
                <Form.Group controlId="period">
                  <Form.Label>Period</Form.Label>
                  <Form.Control
                    as="select"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <option>Transmission</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Waiting</option>
                    <option>Success</option>
                    <option>Failed</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="startDate">
                  <Form.Label>From</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="endDate">
                  <Form.Label>To</Form.Label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </Form.Group>
              </Col>
              <Col className="d-flex align-items-end">
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}

      {!loading && results.length > 0 && <ResultsTable results={results} />}
    </div>
  );
};

export default SearchForm;
