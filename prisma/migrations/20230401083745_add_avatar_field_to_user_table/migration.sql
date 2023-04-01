-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "home_page" TEXT,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'assets/avatar1.svg'
);
INSERT INTO "new_users" ("email", "home_page", "id", "name", "password") SELECT "email", "home_page", "id", "name", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
