import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        let link = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`;
        return `<p>Thanks for sign up, please verify your email <a href="${link}">Verify</a></p>`;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "role",
      required: true,
      defaultValue: "user",
      admin: {
        condition: () => false,
      },
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
  ],
};
