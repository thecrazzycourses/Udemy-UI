import React from 'react';
import Header from "./Header";

const BaseLayout = (props) => {

    const {children, user, loading} = props;

    return (
        <div>
            <Header user={user} loading={loading}/>
            <main>
                {children}
            </main>
        </div>
    );
};

export default BaseLayout;