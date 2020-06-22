import React from 'react';
import BaseLayout from "../src/common/components/BaseLayout";
import withAuth from "../src/common/hoc/withAuth";

const Home = ({data, loading}) => {

    return (
        <BaseLayout user={data} loading={loading}>
            {!data && <h1>Please login</h1>}
            {!loading && data && <h1>{data.name} are successfully authenticated!</h1>}
        </BaseLayout>
    );
}

export default withAuth(Home)('');