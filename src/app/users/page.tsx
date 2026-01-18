import { getUsers } from "@/lib/prismaQuery"


 const  Page = async () => {

    const users=await getUsers()
  return (
    <div>
        {users.map(user=>(
            <div key={user.id}>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
        ))}
    </div>
  )
}

export default Page