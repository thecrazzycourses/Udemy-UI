import auth0 from "../../../src/common/utils/Auth0";

export default async function login(req, res) {
    try {
        await auth0.handleLogin(req, res);
    } catch (e) {
        console.log(e);
        res.status(e.status || 400).end(e.message);
    }
};
