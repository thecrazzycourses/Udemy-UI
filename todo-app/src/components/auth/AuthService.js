class AuthService {
  registerSuccessfulLogin(username) {
    sessionStorage.setItem("authenticatedUser", username);
  }

  logout() {
    sessionStorage.removeItem("authenticatedUser");
  }

  isAuthenticated() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return false;
    return true;
  }
}

export default new AuthService();
