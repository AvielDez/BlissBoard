/*
  Warnings:

  - Added the required column `userId` to the `columns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `subtasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "columns" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subtasks" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "boards_userId_idx" ON "boards"("userId");

-- CreateIndex
CREATE INDEX "columns_userId_idx" ON "columns"("userId");

-- CreateIndex
CREATE INDEX "columns_boardId_idx" ON "columns"("boardId");

-- CreateIndex
CREATE INDEX "subtasks_userId_idx" ON "subtasks"("userId");

-- CreateIndex
CREATE INDEX "subtasks_taskId_idx" ON "subtasks"("taskId");

-- CreateIndex
CREATE INDEX "tasks_userId_idx" ON "tasks"("userId");

-- CreateIndex
CREATE INDEX "tasks_columnId_idx" ON "tasks"("columnId");

-- AddForeignKey
ALTER TABLE "columns" ADD CONSTRAINT "columns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
