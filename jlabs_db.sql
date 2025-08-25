--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.1

-- Started on 2025-08-25 15:08:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16658)
-- Name: users; Type: TABLE; Schema: public; Owner: lim
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    pw text NOT NULL
);


ALTER TABLE public.users OWNER TO lim;

--
-- TOC entry 4787 (class 0 OID 16658)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: lim
--

COPY public.users (id, email, pw) FROM stdin;
1	jlim@jlabs.team	Password001!
\.


--
-- TOC entry 4641 (class 2606 OID 16664)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: lim
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2025-08-25 15:08:30

--
-- PostgreSQL database dump complete
--

