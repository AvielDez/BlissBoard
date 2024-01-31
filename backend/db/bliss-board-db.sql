CREATE TABLE "subtasks"(
    "task_id" INTEGER NOT NULL,
    "subtask_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "is_completed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "subtasks" ADD PRIMARY KEY("subtask_id");
CREATE TABLE "tasks"(
    "column_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "tasks" ADD PRIMARY KEY("task_id");
CREATE TABLE "columns"(
    "board_id" INTEGER NOT NULL,
    "column_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "columns" ADD PRIMARY KEY("column_id");
CREATE TABLE "users"(
    "user_id" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "date_joined" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "last_login" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "is_verified" BOOLEAN NOT NULL
);
ALTER TABLE
    "users" ADD CONSTRAINT "users_user_id_unique" UNIQUE("user_id");
CREATE TABLE "user_settings"(
    "user_id" UUID NOT NULL,
    "user_profile" TEXT NULL,
    "theme" VARCHAR(10) NOT NULL
);
ALTER TABLE
    "user_settings" ADD PRIMARY KEY("user_id");
COMMENT
ON COLUMN
    "user_settings"."user_profile" IS 'URL pointing to image in CDN';
CREATE TABLE "boards"(
    "user_id" UUID NOT NULL,
    "board_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "boards" ADD PRIMARY KEY("board_id");
ALTER TABLE
    "columns" ADD CONSTRAINT "columns_board_id_foreign" FOREIGN KEY("board_id") REFERENCES "boards"("board_id");
ALTER TABLE
    "tasks" ADD CONSTRAINT "tasks_column_id_foreign" FOREIGN KEY("column_id") REFERENCES "columns"("column_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user_settings"("user_id");
ALTER TABLE
    "boards" ADD CONSTRAINT "boards_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("user_id");
ALTER TABLE
    "subtasks" ADD CONSTRAINT "subtasks_task_id_foreign" FOREIGN KEY("task_id") REFERENCES "tasks"("task_id");