import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
const AuthController = {
    login: async (req, res, next) => {
        try {
            const body = req.body;
            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });
            if (!findUser) {
                findUser = await prisma.user.create({
                    data: body,
                });
            }
            let JWTPayload = {
                name: body.name,
                email: body.email,
                id: findUser.id,
            };
            const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            res.json({
                message: "Logged in successfully!",
                user: {
                    ...findUser,
                    token: `Bearer ${token}`,
                },
            });
            return;
        }
        catch (error) {
            next(error);
        }
    },
};
export default AuthController;
//# sourceMappingURL=AuthController.js.map