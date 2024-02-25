import { z } from "zod";

import { formInitialValues } from "./useForm";

const REQUIRED_FIELD_MESSAGE = "To pole jest wymagane";

export const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, REQUIRED_FIELD_MESSAGE)
    .regex(/^[\p{L} ,.'-]+$/u, {
      message: "Pole zawiera niedozwolone znaki",
    }),
  birthDate: z
    .string()
    .trim()
    .min(1, REQUIRED_FIELD_MESSAGE)
    .transform((input) =>
      input
        .split("/")
        .map((el) => el.trim())
        .join("/")
    )
    .superRefine((value, ctx) => {
      const pattern = new RegExp("^\\d{2}\\/\\d{2}\\/\\d{4}$");

      if (!pattern.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Błędny format daty (DD/MM/YYYY)",
        });
        return;
      }

      const parts = value.split("/");
      const [day, month, year] = parts.map(Number);

      if (day < 1 || day > 31) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Dzień musi być numerem od 1 do 31",
        });
        return;
      }
      if (month < 1 || month > 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Miesiąc musi być numerem od 1 do 12",
        });
        return;
      }
      if (year < 1900 || year > new Date().getFullYear()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Błędny rok",
        });
        return;
      }
    }),
  email: z
    .string()
    .trim()
    .min(1, REQUIRED_FIELD_MESSAGE)
    .email("Błędny format adresu e-mail"),
  department: z
    .string()
    .refine((value) => value !== formInitialValues["department"], {
      message: REQUIRED_FIELD_MESSAGE,
    }),
  termsOfUse: z.boolean().refine((value) => value === true, {
    message: "Aby kontynuować, zaakceptuj regulamin",
  }),
});
