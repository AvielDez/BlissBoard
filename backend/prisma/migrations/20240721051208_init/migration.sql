-- CreateTable
CREATE TABLE "boards" (
    "boardId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("boardId")
);

-- CreateTable
CREATE TABLE "columns" (
    "columnId" SERIAL NOT NULL,
    "boardId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "columns_pkey" PRIMARY KEY ("columnId")
);

-- CreateTable
CREATE TABLE "tasks" (
    "taskId" SERIAL NOT NULL,
    "columnId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "subtasks" (
    "subtaskId" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subtasks_pkey" PRIMARY KEY ("subtaskId")
);

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "columns" ADD CONSTRAINT "columns_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("boardId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "columns"("columnId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE;
