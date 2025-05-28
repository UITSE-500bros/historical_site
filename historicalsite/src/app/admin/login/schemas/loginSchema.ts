import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ")
    .refine(
      (email) => email.endsWith(".com"),
      "Chỉ chấp nhận email có đuôi .com"
    ),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Mật khẩu phải chứa ít nhất một chữ thường, một chữ hoa và một số"
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
