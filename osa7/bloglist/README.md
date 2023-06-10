# Comments<br/>
Should update Bloglist's backend too. I do not like the token based authentication with expiration.<br />
Something to replace that. Also, could make it a bit simplier.<br />
Other exercises are very straight forward.<br />

You should first make PostgreSQL Database and tables with the queries.<br />
Use it as cloud based for example at https://render.com<br />
Setup .env file with provided database url from the render or you could do a local setup for the database also.<br />

# Bloglist's backend - PostgreSQL Database's table creation queries<br />
CREATE TABLE IF NOT EXISTS public.users<br />
(<br />
    userid integer NOT NULL DEFAULT nextval('users_userid_seq'::regclass),<br />
    username character varying COLLATE pg_catalog."default" NOT NULL,<br />
    passwordhash character varying COLLATE pg_catalog."default" NOT NULL,<br />
    name character varying COLLATE pg_catalog."default" NOT NULL,<br />
    CONSTRAINT users_pkey PRIMARY KEY (userid),<br />
    CONSTRAINT unique_username UNIQUE (username)<br />
      INCLUDE(username)<br />
);<br />
TABLESPACE pg_default;<br />
	
CREATE TABLE IF NOT EXISTS public.blogs<br />
(<br />
    blogid integer NOT NULL DEFAULT nextval('blogs_blogid_seq'::regclass),<br />
    title character varying COLLATE pg_catalog."default" NOT NULL,<br />
    author character varying COLLATE pg_catalog."default" NOT NULL,<br />
    url character varying COLLATE pg_catalog."default" NOT NULL,<br />
    likes integer NOT NULL DEFAULT 0,<br />
    whohasliked integer[],<br />
    createdbyuserid integer,<br />
    comments character varying[] COLLATE pg_catalog."default",<br />
    CONSTRAINT blogs_pkey PRIMARY KEY (blogid),<br />
    CONSTRAINT unique_title UNIQUE (title)<br />
      INCLUDE(title),<br />
    CONSTRAINT unique_url UNIQUE (url)<br />
      INCLUDE(url),<br />
    CONSTRAINT fk_createdbyuserid FOREIGN KEY (createdbyuserid)<br />
      REFERENCES public.users (userid) MATCH SIMPLE<br />
      ON UPDATE NO ACTION<br />
      ON DELETE NO ACTION<br />
      NOT VALID<br />
);<br />
TABLESPACE pg_default;<br />
