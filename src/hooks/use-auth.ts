import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const signOut = async () => {
    try {
      // payload create this api for us
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "applycation/json",
          },
        }
      );
      if (!res.ok) throw new Error();
      toast.success("Sign out successfully");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Could't sign out, please try again");
    }
  };
  return {
    signOut,
  };
};
