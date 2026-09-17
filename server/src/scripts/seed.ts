import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import { User } from "../features/users/domain/user/user.model.js";
import {
  ADMIN_USER_ROLE,
  ARTIST_USER_ROLE,
  DEFAULT_USER_ROLE,
} from "../features/users/domain/user/user.constants.js";

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding...");

    await User.deleteMany({});
    console.log("Cleared existing users collection");

    const defaultPassword = "Password123!";
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    const seedUsers = [
      {
        username: "wube_admin",
        email: "wube@zemaplatform.com",
        passwordHash: hashedPassword,
        displayName: "wubshet ayellew",
        role: ADMIN_USER_ROLE,
        isActive: true,
      },
      {
        username: "zemari_21",
        email: "singer@zemaplatform.com",
        passwordHash: hashedPassword,
        displayName: "Zemari Kinetibeb",
        role: ARTIST_USER_ROLE,
        bio: "Orthodox Mezmur Creator & Spiritual Vocalist",
        isActive: true,
      },
      {
        username: "listener",
        email: "believer@zemaplatform.com",
        passwordHash: hashedPassword,
        displayName: "believer",
        role: DEFAULT_USER_ROLE,
        isActive: true,
      },
    ];

    await User.insertMany(seedUsers);
    console.log(" Seeded default users successfully:");
    console.log(`   - Admin: admin@zemaplatform.com / ${defaultPassword}`);
    console.log(`   - Artist: zemari@zemaplatform.com / ${defaultPassword}`);
    console.log(
      `   - Listener: listener@zemaplatform.com / ${defaultPassword}`,
    );

    process.exit(0);
  } catch (error) {
    console.error(" Database seeding failed:", error);
    process.exit(1);
  }
};

void seedDatabase();
