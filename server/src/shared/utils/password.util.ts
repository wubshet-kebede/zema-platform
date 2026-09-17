import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export class PasswordHash {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
