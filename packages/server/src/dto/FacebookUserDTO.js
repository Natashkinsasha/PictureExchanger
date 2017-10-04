export default class FacebookUserDTO {
    constructor({facebookId, accessToken, refreshToken}) {
        return {
            facebook: {id: facebookId, accessToken, refreshToken}
        }
    }
}
