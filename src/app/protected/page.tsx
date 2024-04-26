import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
  const { userId } = auth();
  const user = await api.post.userData({ id: userId + "" });
  return (
    <MaxWidthWrapper>
      <div>
        <h1>Protected Page</h1>
        <p>firstName: {user?.firstName}</p>
        <p>lastName: {user?.LastName}</p>
        <p>email: {user?.email}</p>
      </div>
    </MaxWidthWrapper>
  );
}
