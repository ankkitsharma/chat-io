import prisma from "../config/db.config.js";
const ChatGroupUserController = {
    index: async (req, res, next) => {
        try {
            const { group_id } = req.query;
            const users = await prisma.groupUsers.findMany({
                where: {
                    group_id: group_id,
                },
            });
            if (!users) {
                res.status(404).json({ message: "No user found", data: [] });
            }
            else {
                res
                    .status(200)
                    .json({ message: "Data fetched successfully", data: users });
            }
            return;
        }
        catch (error) {
            next(error);
        }
    },
    store: async (req, res, next) => {
        try {
            const body = req.body;
            const user = await prisma.groupUsers.create({
                data: body,
            });
            res.status(201).json({ message: "User added successfully!", data: user });
            return;
        }
        catch (error) {
            next(error);
        }
    },
};
export default ChatGroupUserController;
//# sourceMappingURL=ChatGroupUserController.js.map