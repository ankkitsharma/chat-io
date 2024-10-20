import jwt from "jsonwebtoken";
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader === null || authHeader === undefined) {
        console.log("inside nullcheck");
        res.status(401).json({
            status: 401,
            message: "UnAuthorized",
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(401).json({
                status: 401,
                message: "UnAuthorized",
            });
            return;
        }
        req.user = user;
        next();
    });
}
export default authMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map