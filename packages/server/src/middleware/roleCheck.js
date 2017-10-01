import R from 'ramda';

import AuthenticationError from '../error/AuthenticationError';
import errorCodes from '../error/errorCodes';

export default (...roles) => {
    return (req, res, next)=>{
        if (req.isAuthenticated()){
            if(R.isEmpty(roles)){
                return next();
            }
            if(req.user && !R.compose(R.isEmpty, R.intersection(roles))(req.user.roles)){
                return next();
            }
        }
        return next(new AuthenticationError({message:'not enough access', code: errorCodes.NOT_ENOUGH_ACCESS}))
    }
};