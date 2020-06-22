import React from 'react';
import {Field, Form, Formik} from 'formik';
import {Button} from 'reactstrap';
import FormInput from "../form/FormInput";
import FormDate from "../form/FormDate";

const validateForm = (values) => {
    const errors = {};

    Object.entries(values).forEach(([key, value]) => {
        if (!values[key]) {
            errors[key] = `Field ${key} is required!`;
        }
    })

    const startDate = values.startDate;
    const endDate = values.endDate;

    return errors;
}

const CREATE_PORTFOLIO_FORM = {
    title: '',          // Input
    company: '',        // Input
    location: '',       // Input
    position: '',       // Input
    description: '',    // Text Area
    startDate: '',      // Date
    endDate: ''         // Date
}

const CreatePortfolio = (props) => (
    <div>
        <Formik
            initialValues={CREATE_PORTFOLIO_FORM}

            validate={validateForm}

            onSubmit={props.onSubmit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="title" label="Title" component={FormInput}/>
                    <Field type="text" name="company" label="Company" component={FormInput}/>
                    <Field type="text" name="location" label="Location" component={FormInput}/>
                    <Field type="text" name="position" label="Position" component={FormInput}/>
                    <Field type="textarea" name="description" label="Description" component={FormInput}/>

                    <Field name="startDate" label="Start Date" component={FormDate}/>
                    <Field name="endDate" label="End Date" component={FormDate}/>

                    <Button color="success" size="lg"  type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
);

export default CreatePortfolio;
