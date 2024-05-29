import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import ResultsTable from './ResultsTable';

const SearchForm = () => {
    const [period, setPeriod] = useState('Transmission');
    const [status, setStatus] = useState('Waiting');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [results, setResults] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('/records.json');
            const data = response.data;
            let filteredData = data.filter(record => record.status === status);
            filteredData = filteredData.filter(record => {
                if (startDate && endDate) {
                    return new Date(record.start_date) >= startDate && new Date(record.expire_date) <= endDate;
                } else if (!startDate &&endDate) {
                    return new Date(record.expire_date) <= endDate;
                }  else if (startDate &&!endDate) {
                    return new Date(record.start_date) >= startDate;
                } else {
                    return true; // Include all records if no date filter is applied
                }
            });
            setResults(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                Search Result : {results.length}
                    <Form.Group as={Col} md="1" controlId="formPeriod">
                        Period
                        <Form.Control as="select" value={period} onChange={(e) => setPeriod(e.target.value)}>
                            <option value="Transmission">Transmission</option>
                            {/* Add more options if needed */}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Waiting">Waiting</option>
                            <option value="Success">Success</option>
                            <option value="Failed">Failed</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formFromDate">
                        <Form.Label>From</Form.Label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="formToDate">
                        <Form.Label>To</Form.Label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className="form-control"
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>

            {results.length > 0 && <ResultsTable results={results} />}
        </div>
    );
};

export default SearchForm;
