import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { findUsersService } from "../services/user.service";

export const getUsersController = asyncHandler(async (req, res) => {
    const userId = req.user?._id
  const users = await findUsersService(userId);
  return res.status(HTTPSTATUS.OK).send({
    message: "Users fetched successfully",
    users,
  });
});
