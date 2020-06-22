import auth0 from "../../../src/common/utils/Auth0";

export default async function logout(req, res) {
    try {
        await auth0.handleLogout(req, res);
    } catch (e) {
        console.log(e);
        res.status(e.status || 400).end(e.message);
    }
};
