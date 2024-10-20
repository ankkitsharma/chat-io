import prisma from "../config/db.config.js";
const ChatsController = {
    index: async (req, res, next) => {
        try {
            const { groupId } = req.params;
            const chats = await prisma.chats.findMany({
                where: {
                    group_id: groupId,
                },
            });
            if (!chats) {
                res.status(404).json({ message: "Chats not found", data: [] });
            }
            else {
                res
                    .status(200)
                    .json({ message: "Chats fetched successfully", data: chats });
            }
            return;
        }
        catch (e) {
            next(e);
        }
    },
};
export default ChatsController;
//# sourceMappingURL=ChatsController.js.map