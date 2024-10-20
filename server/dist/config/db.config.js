import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
    log: ["error", "query"],
});
export default prisma;
//# sourceMappingURL=db.config.js.map