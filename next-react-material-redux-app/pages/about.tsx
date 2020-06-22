import React from 'react';
import BaseLayout from "../src/common/components/BaseLayout";
import withAuth from "../src/common/hoc/withAuth";

const About = ({data, loading}) => {

    return (
        <BaseLayout user={data} loading={loading}>
            <h1>About Page</h1>
        </BaseLayout>
    );
}

export default withAuth(About)('');