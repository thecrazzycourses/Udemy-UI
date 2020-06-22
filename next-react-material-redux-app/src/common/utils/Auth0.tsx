import {initAuth0} from '@auth0/nextjs-auth0';

const auth0 = initAuth0({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'openid profile',
    redirectUri: process.env.AUTH0_REDIRECT_URI,
    postLogoutRedirectUri: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
    session: {
        cookieSecret: process.env.AUTH0_COOKIE_SECRET
    }
});

export default auth0;

export const isAuthorized = (user, role) => {
    return (user && user[process.env.NEXT_PUBLIC_AUTH0_NAMESPACE + '/roles'].includes(role))
}

export const authorizeUser = async (req, res) => {
    const session = await auth0.getSession(req);
    if (!session || !session.user) {
        res.writeHead(302, {
            Location: '/api/v1/login'
        })
        res.end();
        return null;
    }
    return session.user
}

export const withAuthSSR = () => (role) => {
    return async ({req, res}) => {
        console.log(req);
        const session = await auth0.getSession(req);
        if (!session || !session.user || (role && !isAuthorized(session.user, role))) {
            res.writeHead(302, {
                Location: '/api/v1/login'
            })
            res.end();
            return {props: {}};
        }
        return {props: {user: session.user}}
    }
}

