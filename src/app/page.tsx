import Link from "next/link";

const page = () => {
  return (
    <div>
      <div>
        <p>Page</p>
      </div>
      <Link href="/users">Users</Link>
    </div>
  );
};

export default page;
