export interface SignupUserDto {
    email: string;
    password: string;
    name: string;
    role?: "user" | "admin";
}