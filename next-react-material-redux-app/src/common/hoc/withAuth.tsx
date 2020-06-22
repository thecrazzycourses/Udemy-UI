import {useGetUser} from "../components/GetUser";
import Redirect from "../components/Redirect";
import {isAuthorized} from "../utils/Auth0";
import React from "react";

const withAuth = Component => role => {
    return props => {
        debugger
        const {data, loading} = useGetUser();

        if (loading) {
            return (<p>Loading...</p>)
        }

        if (!data) {
            return <Redirect ssr to="/api/v1/login" />
        } else {
            if (role && !isAuthorized(data, role)) {
                return <Redirect ssr to="/api/v1/login" />
            }
            return <Component data={data} loading={loading} {...props} />
        }

    }
}

export default withAuth