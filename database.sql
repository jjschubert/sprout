
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "plants" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	"image_path" varchar(255) NOT NULL,
	"notes" varchar(255),
	"last_fertilize" DATE,
	"last_water" DATE,
	CONSTRAINT "plants_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tasks" (
	"id" serial NOT NULL,
	"plant_id" int REFERENCES plants(id) ON DELETE CASCADE,
	"user_id" int NOT NULL,
	"task_status" BOOLEAN NOT NULL DEFAULT false,
	"type_id" int NOT NULL,
	"due_date" DATE NOT NULL,
	CONSTRAINT "tasks_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "task_type" (
	"id" serial NOT NULL,
	"description" varchar(255) NOT NULL,
	CONSTRAINT "task_type_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


INSERT INTO "task_type" ("id", "description")
VALUES (1, 'Start Seed'), (2, 'Harden Off'), (3, 'Plant Outdoors');


ALTER TABLE "plants" ADD CONSTRAINT "plants_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk0" FOREIGN KEY ("plant_id") REFERENCES "plants"("id");
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk2" FOREIGN KEY ("type_id") REFERENCES "task_type"("id");


