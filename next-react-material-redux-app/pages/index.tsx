import React from "react";
import BaseLayout from "../src/common/components/BaseLayout";


export default function Index(props) {
    const {dob} = props;

   return (
        <BaseLayout>
            <h1>Welcome to NextJS Application</h1>
        </BaseLayout>
    )
}

Index.getInitialProps = () => {
    const dob = process.env.DOB;
    return {
        dob: dob
    }
}
