import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {FormGroup, Label} from "reactstrap";

class FormDate extends React.Component {
    state = {
        dateValue: new Date()
    };

    handleChange = date => {
        const {setFieldValue, setFieldTouched} = this.props.form;
        const {name} = this.props.field;

        this.setState({
            dateValue: date
        });

        setFieldValue(name, date, true); // Name, Value, Validate
        setFieldTouched(name, true, true); // Name, Touched, Validate
    };

    render() {
        const {label} = this.props
        return (
            <FormGroup>
                <Label>{label}</Label>
                <div className="input-group">
                    <DatePicker
                        selected={this.state.dateValue}
                        onChange={this.handleChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        maxDate={this.state.dateValue}
                    />
                </div>
            </FormGroup>
        );
    }
}

export default FormDate;