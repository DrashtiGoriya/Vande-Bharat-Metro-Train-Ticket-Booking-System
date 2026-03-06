--
-- PostgreSQL database dump
--

\restrict fjYkhW6XFI56PrvcrFKt2Qd6bCDn6adXTOWcFyCe4Nw47obfxwtFgXcs4KbnWDU

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-02-27 09:36:02

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

--
-- TOC entry 863 (class 1247 OID 107386)
-- Name: enum_events_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_events_status AS ENUM (
    'LAUNCHED',
    'CANCELLED',
    'CONFIRMED',
    'PENDING'
);


ALTER TYPE public.enum_events_status OWNER TO postgres;

--
-- TOC entry 857 (class 1247 OID 107361)
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_users_role AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public.enum_users_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 107396)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    date timestamp with time zone NOT NULL,
    "time" time without time zone NOT NULL,
    capacity integer DEFAULT 0 NOT NULL,
    booked integer DEFAULT 0 NOT NULL,
    price double precision DEFAULT '0'::double precision NOT NULL,
    status public.enum_events_status DEFAULT 'PENDING'::public.enum_events_status,
    active boolean DEFAULT false NOT NULL,
    "softDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 107395)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 221
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- TOC entry 224 (class 1259 OID 107423)
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "eventId" integer NOT NULL,
    seats json NOT NULL,
    price double precision DEFAULT '0'::double precision NOT NULL,
    "softDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 107422)
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tickets_id_seq OWNER TO postgres;

--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 223
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- TOC entry 220 (class 1259 OID 107366)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255),
    role public.enum_users_role DEFAULT 'user'::public.enum_users_role NOT NULL,
    "isActive" boolean DEFAULT true,
    "softDelete" boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 107365)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4831 (class 2604 OID 158717)
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- TOC entry 4840 (class 2604 OID 158718)
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- TOC entry 4825 (class 2604 OID 158719)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5002 (class 0 OID 107396)
-- Dependencies: 222
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, description, date, "time", capacity, booked, price, status, active, "softDelete", "createdAt", "updatedAt") FROM stdin;
1	Metro train	AHM TO VAD	2026-04-25 05:30:00+05:30	12:50:00	100	0	500	PENDING	t	t	2026-01-22 12:46:03.778292+05:30	2026-02-03 09:53:15.652427+05:30
2	Bharat Mata ki Jay	JND TO AHM	2026-02-15 05:30:00+05:30	12:00:00	100	0	800	PENDING	t	t	2026-01-22 12:47:10.018918+05:30	2026-02-03 09:53:16.257387+05:30
3	 Vande Bharat Express – Chennai to Bengaluru	High-speed Vande Bharat train offering comfortable AC seating, onboard catering, and fast travel between Chennai and Bengaluru.	2026-02-21 05:30:00+05:30	09:55:00	100	0	150	PENDING	f	t	2026-02-03 09:54:01.673754+05:30	2026-02-03 16:28:28.928736+05:30
6	Vande Metro – Bengaluru City Loop	Urban rail service connecting key areas of Bengaluru with modern coaches and efficient scheduling	2026-03-07 05:30:00+05:30	12:22:00	100	0	580	PENDING	t	f	2026-02-05 12:19:05.688984+05:30	2026-02-05 12:19:43.665755+05:30
7	Vande Metro – Chennai Suburban Route	Efficient suburban rail service connecting major city stations with high frequency and modern amenities.	2026-06-13 05:30:00+05:30	04:04:00	100	0	700	PENDING	t	f	2026-02-05 12:41:42.370801+05:30	2026-02-05 12:41:44.299586+05:30
4	Vande Bharat Express – Delhi to Varanasi	Modern semi-high-speed train with premium facilities ensuring a smooth and time-saving journey from Delhi to Varanasi.	2026-02-05 05:30:00+05:30	09:44:00	100	0	250	PENDING	t	t	2026-02-03 09:54:35.723+05:30	2026-02-09 08:54:33.208038+05:30
5	Vande Metro – Ahmedabad to Gandhinagar	Fast and frequent metro-style train service designed for daily commuters with affordable fares and comfortable seating.	2026-02-28 05:30:00+05:30	09:45:00	100	0	600	PENDING	f	t	2026-02-03 09:55:04.085+05:30	2026-02-09 08:54:34.612651+05:30
\.


--
-- TOC entry 5004 (class 0 OID 107423)
-- Dependencies: 224
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, "userId", "eventId", seats, price, "softDelete", "createdAt", "updatedAt") FROM stdin;
1	2	1	["B4","A7","B9","C7","C8","C9","B6","B5","A5"]	4500	t	2026-01-23 09:41:47.240378+05:30	2026-01-23 12:26:56.355381+05:30
2	2	1	["A4","A5","B4","B5","B6","B7","B8","B9","A9","A8","A7","A6"]	6000	t	2026-01-23 12:29:17.49844+05:30	2026-01-24 11:57:13.459879+05:30
5	3	1	["D7","G6"]	1000	f	2026-01-29 09:12:45.668085+05:30	2026-01-29 09:12:45.668085+05:30
3	2	1	["B5"]	0	t	2026-01-24 12:09:42.158649+05:30	2026-02-03 16:14:28.435502+05:30
4	2	1	["C6"]	500	t	2026-01-24 12:39:41.459801+05:30	2026-02-03 16:14:30.337614+05:30
6	2	5	["D4","G4"]	1200	f	2026-02-03 16:17:04.857942+05:30	2026-02-03 16:17:04.857942+05:30
7	2	4	["D4","G4"]	500	f	2026-02-03 16:17:28.898097+05:30	2026-02-03 16:17:28.898097+05:30
8	2	6	["B4"]	580	f	2026-02-05 12:20:02.04946+05:30	2026-02-05 12:20:02.04946+05:30
9	2	7	["D4","G1"]	1400	f	2026-02-05 12:42:07.143006+05:30	2026-02-05 12:42:07.143006+05:30
\.


--
-- TOC entry 5000 (class 0 OID 107366)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, phone, role, "isActive", "softDelete", "createdAt", "updatedAt") FROM stdin;
1	Drashti	dga@gmail.com	$2b$10$geixogGUBauWJ0n5PZ2ZluYeD66li/Z45fscIzJCfHTvo/y/B70m.	9428441834	admin	t	f	2026-01-22 12:44:03.058905+05:30	2026-01-22 12:44:03.058905+05:30
3	Gaurav Kumbhani	grk@gmail.com	$2b$10$C/Nbq/LhFkL4ZxyXz0CmVeP/GkAmuAI2hCXN1Gu772Av8cXwpckfa	9974681776	user	t	f	2026-01-29 08:54:24.360391+05:30	2026-01-29 08:54:24.360391+05:30
2	Drashti Goriya	dgk@gmail.com	$2a$12$kCirXDXxU3tyerXq3f6N5uETiGDOTNf6TEs7D6pDWn3szAKGz.gie	9428441834	user	t	f	2026-01-22 12:44:26.199366+05:30	2026-02-11 16:09:55.053386+05:30
4	Gaushti	dk@gmail.com	$2a$12$kCirXDXxU3tyerXq3f6N5uETiGDOTNf6TEs7D6pDWn3szAKGz.gie	9974681776	user	t	f	2026-02-03 16:05:03.953491+05:30	2026-02-03 16:05:03.953491+05:30
\.


--
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 221
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 7, true);


--
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 223
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_seq', 9, true);


--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 4849 (class 2606 OID 107421)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 4851 (class 2606 OID 107440)
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- TOC entry 4847 (class 2606 OID 107383)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4845 (class 1259 OID 142177)
-- Name: users_email_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_unique ON public.users USING btree (email) WHERE ("softDelete" = false);


-- Completed on 2026-02-27 09:36:02

--
-- PostgreSQL database dump complete
--

\unrestrict fjYkhW6XFI56PrvcrFKt2Qd6bCDn6adXTOWcFyCe4Nw47obfxwtFgXcs4KbnWDU

