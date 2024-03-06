import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { publicProducedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = router({
  createPayloadUser: publicProducedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });
      // if (users.length !== 0) throw new ZodError(["Zod Error"]);
      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });
      let user = await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });
      payload.logger.info(user);
      return { success: true, sentToEmail: email };
    }),
  verifyEmail: publicProducedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();
      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });
      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });
      return { success: true };
    }),
  signIn: publicProducedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();
      const { res } = ctx;

      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });
        return { success: true };
      } catch (error) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
