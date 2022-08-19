import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";

export default function Nav() {
  const logoutHandler = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    Router.replace("/auth/login");
  };

  return (
    <header>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
      <Link href="/posts/create">
        <a>Create Posts</a>
      </Link>
      <a href="#" onClick={logoutHandler}>
        Logout
      </a>
    </header>
  );
}
