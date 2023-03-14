

class AuthenticationService {

    setupToken(jwtToken) {
        localStorage.setItem("token", jwtToken);
    }

}

export default new AuthenticationService();