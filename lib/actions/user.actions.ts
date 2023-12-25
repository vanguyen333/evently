//nextjs server action file
"use server";

import { CreateUserParams } from "@/types";
import { handleError } from "../utils";

export const createuser = async (user: CreateUserParams) => {
  try {
  } catch (error) {
    handleError(error);
  }
};
