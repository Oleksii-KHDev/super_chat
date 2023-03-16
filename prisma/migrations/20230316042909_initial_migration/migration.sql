-- CreateTable
CREATE TABLE "users" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "home_page" TEXT,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "parent_id" INTEGER NOT NULL DEFAULT 0,
    "user_id" BIGINT NOT NULL,
    "text" TEXT NOT NULL,
    CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
