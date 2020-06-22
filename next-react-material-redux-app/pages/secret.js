import React from 'react';
import BaseLayout from "../src/common/components/BaseLayout";
import withAuth from "../src/common/hoc/withAuth";

const Secret = ({data, loading}) => {

    return (
        <BaseLayout user={data} loading={loading}>
            <h1>Secret Page - Hello {data.name}</h1>
        </BaseLayout>
    )

}

export default withAuth(Secret)('');