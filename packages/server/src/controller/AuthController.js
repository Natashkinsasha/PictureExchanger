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

    };

}