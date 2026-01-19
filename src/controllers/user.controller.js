import { asyncHandler, ApiError, ApiResponse } from "../utils/utils.index.js";
import { User } from "../models/userModel.js";

const gernateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
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
    secure: true,
    httpOnly: true,
    sameSite: "None",
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
    secure: true,
    httpOnly: true,
    sameSite: "None",
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


export { signup, loginUser };
