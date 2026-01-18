import prisma from "./prisma";

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

export const createUser = async (name: string, email: string) => {
  const newUser = await prisma.user.create({
    data: { name, email },
  });
  return newUser;
};

export const deleteUser = async (id: number) => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
};

export const updateUser = async (id: number, name: string, email: string) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { name, email },
  });
  return updatedUser;
};
