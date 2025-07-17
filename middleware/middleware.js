import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    //middleware takes 3 parameters 
    try {
        //extract jwt token
        const authHeader = req.headers.authorization;
        // console.log("auth HEADER token-->", authHeader)   //OUTPUT: Bearer --tokenval-- (2 values mil rahi hein)
        const authToken = authHeader?.split(' ')?.[1];   //optional chaining ?.
        //ager ye direct work na krein toh do -> optional chaining 
        //  const authToken = authHeader?.split(' ')?.[1];
        // console.log("AUTH token -->", authToken)


        //check if token exist OR not
        if (!authToken) {
            return res.status(401).json({ success: false, message: "User Token is not Authorized!!" })
        }

        //verify token 
        let jwtDecoded = null;
        jwt.verify(authToken, process.env.JWT_SECRET_KEY, function (err, decoded) {
            //if invalid token 
            if (err) {
                return res.status(403).json({ success: false, message: "Invalid or Expired Token!" })
            }
            jwtDecoded = decoded
            // console.log(decoded) // payload received
            console.log(jwtDecoded) // payload received

            req.email = jwtDecoded.email;
            req.id = jwtDecoded.userId;
            req.role = jwtDecoded.role;
            next()  //moves to based on role user OR admin controller
        });

    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}


export const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.role !== role) {
            return res.status(403).json({ message: "Access denied: Unauthorized role" });
        }
        next()
    }
}