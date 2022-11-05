import { object, string, TypeOf } from "zod";

// definition for payload
export const createUserSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    password: string({ required_error: "Password is required" }).min(
      6,
      "Password is too short - should be 6 characters minimum"
    ),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    // zod can do the password comparison within using "refine" method
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords do not match", // custom error message
    path: ["passwordConfirmation"], //  path to the error
  }),
});

// make an interface for create user input
export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
