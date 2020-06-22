import React from 'react';
import BaseLayout from "../src/common/components/BaseLayout";
import withAuth from "../src/common/hoc/withAuth";

const Admin = ({data, loading}) => {

    return (
        <BaseLayout user={data} loading={loading}>
            <h1>Admin Page - Hello {data.name}</h1>
        </BaseLayout>
    )

}

export default withAuth(Admin)('admin');