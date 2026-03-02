import jwt from "jsonwebtoken";
import { asyncHandler, ApiError, ApiResponse } from "../utils/utils.index.js";
import { User } from "../models/userModel.js";

const gernateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken; //Aman : added this field in userModel.js, was missing earlier and causing issue
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const signup = asyncHandler(async (req, res) => {
  const { username, email, mobile, password } = req.body;

  if (
    [username, email, password, mobile].some(
      (field) => String(field).trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const emailExists = await User.findOne({ email });

  if (emailExists)
    return res.status(400).json({ message: "Email already registered" });

  const mobileExists = await User.findOne({ mobile });

  if (mobileExists)
    return res.status(400).json({ message: "Mobile already registered" });

  const user = await User.create({
    username,
    email,
    mobile,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(505, "Something went wrong while registering the user");
  }

  const { accessToken, refreshToken } = await gernateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    secure: false,
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  };
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(201, loggedInUser, "user register successdully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "  email is required ");
  }
  //Aman : password check, earlier was causing login issue
  if (!password) {
    throw new ApiError(400, "  Password is required ");
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, " User does not exist ");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, " Password does not match with user ");
  }

  const { accessToken, refreshToken } = await gernateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    secure: false,
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Loggin successfully ",
      ),
    );
});
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)  
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true },
  );

  const options = { secure: true, httpOnly: true, sameSite: "none" };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out "));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invaild old Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password change successfully "));
});
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username, email, mobile } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      username,
      email,
      mobile,
    },
    { new: true },
  );
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request ");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = { secure: true, httpOnly: true, sameSite: "none" };

    const { accessToken, refreshToken: newRefreshToken } =
      await gernateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetchedsuccessfully"));

});

const getAllUsers = asyncHandler(async (req, res) => {

  const users = await User.find();
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});


export {
  signup,
  loginUser,
  getCurrentUser,
  logoutUser,
  changeCurrentPassword,
  updateAccountDetails,
  refreshAccessToken,
  getAllUsers,
  getUserById,
};
