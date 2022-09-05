SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.build (
    "_id" serial   NOT NULL,
    "session" bigint NOT NULL,
    "name" varchar   NOT NULL,
    "size" bigint   NOT NULL,
    "pcb" bigint   NOT NULL,
    "plate" bigint   NOT NULL,
    "switch" bigint   NOT NULL,
    "keycap" bigint   NOT NULL,
    "color" varchar   NOT NULL,
    CONSTRAINT "pk_build" PRIMARY KEY (
        "_id"
     )
) WITH (
  OIDS=FALSE
);

-- CREATE TABLE public.session (
--     "_id" serial   NOT NULL,
--     CONSTRAINT "pk_session" PRIMARY KEY (
--         "_id"
--      )
-- ) WITH (
--   OIDS=FALSE
-- );

CREATE TABLE public.pcb (
    "_id" serial   NOT NULL,
    "name" varchar   NOT NULL,
    "link" varchar,
    CONSTRAINT "pk_pcb" PRIMARY KEY (
        "_id"
     )
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.keycap (
    "_id" serial   NOT NULL,
    "name" varchar   NOT NULL,
    "link" varchar,
    CONSTRAINT "pk_keycap" PRIMARY KEY (
        "_id"
     )
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.switch (
    "_id" serial   NOT NULL,
    "name" varchar   NOT NULL,
    "link" varchar,
    CONSTRAINT "pk_switch" PRIMARY KEY (
        "_id"
     )
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.size (
    "_id" serial   NOT NULL,
    "name" varchar   NOT NULL,
    "link" varchar,
    CONSTRAINT "pk_size" PRIMARY KEY (
        "_id"
     )
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.plate (
    "_id" serial   NOT NULL,
    "name" varchar   NOT NULL,
    "link" varchar,
    CONSTRAINT "pk_plate" PRIMARY KEY (
        "_id"
     )
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.build ADD CONSTRAINT "fk_build_size" FOREIGN KEY("size")
REFERENCES public.size ("_id");

-- ALTER TABLE public.build ADD CONSTRAINT "fk_build_session" FOREIGN KEY("session")
-- REFERENCES public.session ("_id");

ALTER TABLE public.build ADD CONSTRAINT "fk_build_pcb" FOREIGN KEY("pcb")
REFERENCES public.pcb ("_id");

ALTER TABLE public.build ADD CONSTRAINT "fk_build_plate" FOREIGN KEY("plate")
REFERENCES public.plate ("_id");

ALTER TABLE public.build ADD CONSTRAINT "fk_build_switch" FOREIGN KEY("switch")
REFERENCES public.switch ("_id");

ALTER TABLE public.build ADD CONSTRAINT "fk_build_keycap" FOREIGN KEY("keycap")
REFERENCES public.keycap ("_id");


-- Creating Default Session
-- INSERT INTO public.session VALUES (1);

-- Populating Case Table
INSERT INTO public.size (_id, name) VALUES (1, '60%');
INSERT INTO public.size (_id, name) VALUES (2, '65%');
INSERT INTO public.size (_id, name) VALUES (3, '70%');
INSERT INTO public.size (_id, name) VALUES (4, 'TKL');
INSERT INTO public.size (_id, name) VALUES (5, '100%');

-- Populating PCB Table
INSERT INTO public.pcb (_id, name) VALUES (1, 'Hotswap');
INSERT INTO public.pcb (_id, name) VALUES (2, 'Traditional');

-- Populating Plate Table
INSERT INTO public.plate (_id, name) VALUES (1, 'Aluminum');
INSERT INTO public.plate (_id, name) VALUES (2, 'Brass');
INSERT INTO public.plate (_id, name) VALUES (3, 'Polycarbonate');

-- Populating Switch Table
INSERT INTO public.switch (_id, name) VALUES (1, 'Linear');
INSERT INTO public.switch (_id, name) VALUES (2, 'Tactile');
INSERT INTO public.switch (_id, name) VALUES (3, 'Clicky');

-- Populating Keycap Table

INSERT INTO public.keycap (_id, name) VALUES (1, 'GMK');
INSERT INTO public.keycap (_id, name) VALUES (2, 'KAT');
INSERT INTO public.keycap (_id, name) VALUES (3, 'PBT');

INSERT INTO public.build (session, name, size, pcb, plate, switch, keycap, color) VALUES (1, 'Big Build', (SELECT _id FROM public.size WHERE name='60%'), (SELECT _id FROM public.pcb WHERE name='Hotswap'), (SELECT _id FROM public.plate WHERE name='Aluminum'), (SELECT _id FROM public.switch WHERE name='Linear'), (SELECT _id FROM public.keycap WHERE name='GMK'), 'green');