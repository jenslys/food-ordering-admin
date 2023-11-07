import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function Home() {
  const { isAuthenticated } = useKindeAuth();
  return (
    <>
      <Navbar />
      {isAuthenticated ? <Table /> : <div>Not logged in</div>}
    </>
  );
}
