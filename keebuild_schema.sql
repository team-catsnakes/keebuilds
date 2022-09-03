-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/piTaHg
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "build" (
    "_id" bigint   NOT NULL,
    "name" varchar   NOT NULL,
    "case" bigint   NOT NULL,
    "pcb" bigint   NOT NULL,
    "plate" bigint   NOT NULL,
    "switch" bigint   NOT NULL,
    "keycap" bigint   NOT NULL,
    "color" varchar   NOT NULL,
    CONSTRAINT "pk_build" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "pcb" (
    "_id" bigint   NOT NULL,
    "name" varchar   NOT NULL,
    "link" varchar,
    CONSTRAINT "pk_pcb" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "keycap" (
    "_id" bigint   NOT NULL,
    "name" varchar   NOT NULL,
    "link" varchar,
    CONSTRAINT "pk_keycap" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "switch" (
    "_id" bigint   NOT NULL,
    "name" varchar   NOT NULL,
    "link" varchar,
    CONSTRAINT "pk_switch" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "case" (
    "_id" bigint   NOT NULL,
    "name" varchar   NOT NULL,
    "link" varchar,
    CONSTRAINT "pk_case" PRIMARY KEY (
        "_id"
     )
);

CREATE TABLE "plate" (
    "_id" bigint   NOT NULL,
    "name" varchar   NOT NULL,
    "link" varchar,
    CONSTRAINT "pk_plate" PRIMARY KEY (
        "_id"
     )
);

ALTER TABLE "build" ADD CONSTRAINT "fk_build_case" FOREIGN KEY("case")
REFERENCES "case" ("_id");

ALTER TABLE "build" ADD CONSTRAINT "fk_build_pcb" FOREIGN KEY("pcb")
REFERENCES "pcb" ("_id");

ALTER TABLE "build" ADD CONSTRAINT "fk_build_plate" FOREIGN KEY("plate")
REFERENCES "plate" ("_id");

ALTER TABLE "build" ADD CONSTRAINT "fk_build_switch" FOREIGN KEY("switch")
REFERENCES "switch" ("_id");

ALTER TABLE "build" ADD CONSTRAINT "fk_build_keycap" FOREIGN KEY("keycap")
REFERENCES "keycap" ("_id");

CREATE INDEX "idx_build_name"
ON "build" ("name");

CREATE INDEX "idx_pcb_name"
ON "pcb" ("name");

CREATE INDEX "idx_keycap_name"
ON "keycap" ("name");

CREATE INDEX "idx_switch_name"
ON "switch" ("name");

CREATE INDEX "idx_case_name"
ON "case" ("name");

CREATE INDEX "idx_plate_name"
ON "plate" ("name");

