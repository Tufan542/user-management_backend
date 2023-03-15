const { z } = require("zod");
const PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;

const updateUser = z.object({
  username: z
    .string()
    .min(2, "minimum username length should be 2")
    .max(50, "maximum username length should be 2")
    .trim()
    .transform((str) => str.toLowerCase())
    .optional(),
  email: z
    .string({
      invalid_type_error: "email should be string",
      required_error: "email name is required",
    })
    .trim()
    .email("please provide a valid email")
    .optional(),
});

const userParams = z.object({
  id: z
    .string({
      required_error: "id is required",
    })
    .uuid("id should be a valid uuid"),
});

module.exports = {
  updateUser,
  userParams,
};