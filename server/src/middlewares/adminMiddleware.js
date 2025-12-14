import jwt from "jsonwebtoken";
import { Admin } from "../Models/adminModel";

export const isAdminAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.adminToken;

        if(!token) {
            return res.status(401).json({message: "Admin not authenticated"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id).select("-passwordHash");

        if(!admin) {
            return res.status(401).json({message: "Invalid admin session"});
        }

        req.admin = admin;
        next();
    } catch (err) {
        return res.status(401).json({message: "Admin authentication failed"});
    }
};