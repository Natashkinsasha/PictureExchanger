export default class AuthController {

    constructor({authService}) {
        this.authService = authService;
    }

    registry = (req, res, next) => {
        const {nickname, email, password} = req.body;
        return this.authService
            .registry({nickname, email, password})
            .then(({user, accessToken, refreshToken}) => {
                return res.status(200)
                    .json({
                        user,
                        accessToken,
                        refreshToken,
                    })
            })
            .catch(next)
    };

    login = (req, res, next) => {
        const {nicknameOrEmail, password} = req.body;
        return this.authService
            .login({nicknameOrEmail, password})
            .then(({user, accessToken, refreshToken}) => {
                return res.status(200)
                    .json({
                        user,
                        accessToken,
                        refreshToken,
                    })
            })
            .catch(next)
    };

    logout = (req, res, next) => {
        const token = req.headers['authorization'];
        return this.authService
            .logout({token})
            .then(() => {
                return res.status(204).end();
            })
            .catch(next)
    };

    getAccessToken = (req, res, next) => {
        const refreshToken = req.body.refreshToken;
        return this.authService
            .getAccessToken({refreshToken})
            .then(({accessToken, refreshToken, user}) => {
                return res.status(200).json({accessToken, refreshToken, user});
            })
            .catch(next)
    };

}