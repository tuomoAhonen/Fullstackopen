Exercices done with React, NodeJS-Express server with PG-Promise & PostgreSQL-database. <br />

Puhelinluettelo running @ https://puhelinluettelo.vercel.app/ <br />
Backend app running @ https://backendpuhelinluettelo.vercel.app/api/persons <br />
PostreSQL-database as Cloud based @ https://render.com/ <br />

You will need to set-up PostreSQL-database to run this fullstack-app locally or re-configure front-end & use API @ https://backendpuhelinluettelo.vercel.app/api/persons <br />
Also, you will need to set-up .env variables as: <br />
DBPASSWORD=databasepassword <br />
DBURLWITHPW=postgres://username:databasepassword@url/databasename?ssl=true <br />

Exercise 3.12 is in file pgpromise.js <br />

PostreSQL script: <br />
-- Database: puhelinluettelodb
-- DROP DATABASE IF EXISTS puhelinluettelodb;

CREATE DATABASE puhelinluettelodb
    WITH
    OWNER = admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF8'
    LC_CTYPE = 'en_US.UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

ALTER DATABASE puhelinluettelodb
    SET "TimeZone" TO 'utc';
	
ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON TABLES TO admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT ALL ON SEQUENCES TO admin;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres
GRANT EXECUTE ON FUNCTIONS TO admin;

-- Table: public.persons
-- DROP TABLE IF EXISTS public.persons;

CREATE TABLE IF NOT EXISTS public.persons
(
    id integer NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT persons_pkey PRIMARY KEY (id),
    CONSTRAINT persons_nimi_key UNIQUE (name),
    CONSTRAINT persons_puhelin_key UNIQUE (phone)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.persons
    OWNER to admin;
