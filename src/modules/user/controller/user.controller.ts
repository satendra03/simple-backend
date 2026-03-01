import { NextFunction, Request, Response } from "express";
import { UserMapper } from "../mapper/user.mapper.js";
import { ApiResponse } from "@/shared/ApiResponse.js";
import { UserService } from "../service/user.service.interface.js";

export class UserController {
    constructor(private userService: UserService) { }
    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAllUsers();
            const response = UserMapper.toResponseDtoList(users);

            res.status(200).json(ApiResponse.success({
                message: "Users fetched successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;
            const user = await this.userService.getUserById(userId);
            const response = UserMapper.toResponseDto(user);
            res.status(200).json(ApiResponse.success({
                message: "User fetched successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
    getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req.params.email;
            const user = await this.userService.getUserByEmail(email);
            const response = UserMapper.toResponseDto(user);
            res.status(200).json(ApiResponse.success({
                message: "User fetched successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const input = req.body;
            const createInput = UserMapper.toCreateInput(input);
            const user = await this.userService.createUser(createInput);
            const response = UserMapper.toResponseDto(user);

            res.status(201).json(ApiResponse.success({
                message: "User created successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;
            const updates = req.body;

            const updateUserInput = UserMapper.toUpdateInput(updates);
            const user = await this.userService.updateUser(userId, updateUserInput);
            const response = UserMapper.toResponseDto(user);
            res.status(200).json(ApiResponse.success({
                message: "User updated successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;
            const user = await this.userService.deleteUser(userId);
            const response = UserMapper.toResponseDto(user);

            res.status(200).json(ApiResponse.success({
                message: "User deleted successfully",
                data: response
            }));
        } catch (error) {
            next(error);
        }
    }
}