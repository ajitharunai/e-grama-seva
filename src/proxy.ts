import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/citizens/:path*",
    "/complaints/:path*",
    "/certificates/:path*",
    "/taxes/:path*",
    "/statistics/:path*"
  ],
};
