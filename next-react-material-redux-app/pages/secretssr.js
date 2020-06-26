import React from 'react';
import BaseLayout from "../src/common/components/BaseLayout";
import {withAuthSSR} from "../src/common/utils/Auth0";
import withAuth from "../src/common/hoc/withAuth";

const SecretSSR = ({user}) => {

    const checkAuth = () => {

    }

    return (
        <BaseLayout user={user} loading={false}>
            <h1>Secret SSR Page - Hello {user && user.name}</h1>
        </BaseLayout>
    )

}

export const getServerSideProps = withAuthSSR()('admin');

export default withAuth(SecretSSR)('admin');