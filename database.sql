CREATE TABLE "tasks" (
	"id" serial primary key,
	"task" varchar(150),
	"completed" BOOLEAN

);

INSERT INTO "tasks" ("task", "completed")
VALUES 
('Walk dog', 'FALSE'), ('Feed dog', 'FALSE')
;