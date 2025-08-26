--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-15 15:21:31

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
-- TOC entry 220 (class 1259 OID 16602)
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    client_id integer NOT NULL,
    name text NOT NULL,
    email text,
    phone text
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16601)
-- Name: clients_client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clients_client_id_seq OWNER TO postgres;

--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 219
-- Name: clients_client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_client_id_seq OWNED BY public.clients.client_id;


--
-- TOC entry 231 (class 1259 OID 16700)
-- Name: cups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cups (
    cup_id text NOT NULL,
    live_quantity integer DEFAULT 0,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cups OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16693)
-- Name: cupspecs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cupspecs (
    label_id text NOT NULL,
    label text NOT NULL,
    diameter numeric NOT NULL,
    volume numeric NOT NULL
);


ALTER TABLE public.cupspecs OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16715)
-- Name: cuptransactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cuptransactions (
    cup_txn_id integer NOT NULL,
    cup_id text NOT NULL,
    order_id integer,
    quantity integer NOT NULL,
    sheet_consumed integer DEFAULT 0,
    sheet_id text,
    rejected_cups integer DEFAULT 0,
    shift text,
    operator text,
    machine_id text,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    remarks text
);


ALTER TABLE public.cuptransactions OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16714)
-- Name: cuptransactions_cup_txn_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cuptransactions_cup_txn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cuptransactions_cup_txn_id_seq OWNER TO postgres;

--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 232
-- Name: cuptransactions_cup_txn_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cuptransactions_cup_txn_id_seq OWNED BY public.cuptransactions.cup_txn_id;


--
-- TOC entry 218 (class 1259 OID 16592)
-- Name: designs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.designs (
    design_id integer NOT NULL,
    name text NOT NULL,
    file_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    remarks text
);


ALTER TABLE public.designs OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16591)
-- Name: designs_design_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.designs_design_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.designs_design_id_seq OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 217
-- Name: designs_design_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.designs_design_id_seq OWNED BY public.designs.design_id;


--
-- TOC entry 237 (class 1259 OID 24619)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    emp_code text NOT NULL,
    name text NOT NULL,
    role text,
    contact text,
    email text,
    address text,
    joining_date date
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16611)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    design_id integer,
    client_id integer,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    dispatch_date timestamp without time zone,
    payment_received_date timestamp without time zone,
    invoice_amount numeric,
    specs text,
    remarks text,
    created_by text,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16610)
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO postgres;

--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 221
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- TOC entry 234 (class 1259 OID 16741)
-- Name: printedcups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.printedcups (
    printed_cup_id text NOT NULL,
    design_id integer,
    live_quantity integer DEFAULT 0,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.printedcups OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16761)
-- Name: printedcuptransactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.printedcuptransactions (
    printed_cup_txn_id integer NOT NULL,
    printed_cup_id text NOT NULL,
    order_id integer,
    cup_id text,
    design_id integer,
    machine_id text,
    quantity integer NOT NULL,
    rejected_cups integer DEFAULT 0,
    shift text,
    operator text,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    remarks text
);


ALTER TABLE public.printedcuptransactions OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16760)
-- Name: printedcuptransactions_printed_cup_txn_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.printedcuptransactions_printed_cup_txn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.printedcuptransactions_printed_cup_txn_id_seq OWNER TO postgres;

--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 235
-- Name: printedcuptransactions_printed_cup_txn_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.printedcuptransactions_printed_cup_txn_id_seq OWNED BY public.printedcuptransactions.printed_cup_txn_id;


--
-- TOC entry 224 (class 1259 OID 16632)
-- Name: rawmaterials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rawmaterials (
    material_id integer NOT NULL,
    material_name text NOT NULL,
    live_quantity numeric DEFAULT 0,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.rawmaterials OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16631)
-- Name: rawmaterials_material_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rawmaterials_material_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rawmaterials_material_id_seq OWNER TO postgres;

--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 223
-- Name: rawmaterials_material_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rawmaterials_material_id_seq OWNED BY public.rawmaterials.material_id;


--
-- TOC entry 226 (class 1259 OID 16643)
-- Name: rawmaterialtransactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rawmaterialtransactions (
    raw_material_txn_id integer NOT NULL,
    material_id integer NOT NULL,
    order_id integer,
    txn_type character varying(20) NOT NULL,
    quantity numeric NOT NULL,
    shift text,
    operator text,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    remarks text,
    CONSTRAINT rawmaterialtransactions_txn_type_check CHECK (((txn_type)::text = ANY ((ARRAY['Inward'::character varying, 'Consumed'::character varying])::text[])))
);


ALTER TABLE public.rawmaterialtransactions OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16642)
-- Name: rawmaterialtransactions_raw_material_txn_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rawmaterialtransactions_raw_material_txn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rawmaterialtransactions_raw_material_txn_id_seq OWNER TO postgres;

--
-- TOC entry 4994 (class 0 OID 0)
-- Dependencies: 225
-- Name: rawmaterialtransactions_raw_material_txn_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rawmaterialtransactions_raw_material_txn_id_seq OWNED BY public.rawmaterialtransactions.raw_material_txn_id;


--
-- TOC entry 227 (class 1259 OID 16663)
-- Name: sheets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sheets (
    sheet_id text NOT NULL,
    sheet_size numeric NOT NULL,
    sheet_thickness numeric NOT NULL,
    live_quantity integer DEFAULT 0,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sheets OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16673)
-- Name: sheettransactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sheettransactions (
    sheet_txn_id integer NOT NULL,
    sheet_id text NOT NULL,
    order_id integer,
    quantity integer NOT NULL,
    scrap integer DEFAULT 0,
    shift text,
    operator text,
    machine_id text,
    sheet_size numeric NOT NULL,
    sheet_thickness numeric NOT NULL,
    primary_material text,
    additives text,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    remarks text
);


ALTER TABLE public.sheettransactions OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16672)
-- Name: sheettransactions_sheet_txn_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sheettransactions_sheet_txn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sheettransactions_sheet_txn_id_seq OWNER TO postgres;

--
-- TOC entry 4995 (class 0 OID 0)
-- Dependencies: 228
-- Name: sheettransactions_sheet_txn_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sheettransactions_sheet_txn_id_seq OWNED BY public.sheettransactions.sheet_txn_id;


--
-- TOC entry 240 (class 1259 OID 24635)
-- Name: shiftmapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shiftmapping (
    mapping_id integer NOT NULL,
    emp_code text NOT NULL,
    date date NOT NULL,
    shift_code text NOT NULL
);


ALTER TABLE public.shiftmapping OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 24634)
-- Name: shiftmapping_mapping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shiftmapping_mapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shiftmapping_mapping_id_seq OWNER TO postgres;

--
-- TOC entry 4996 (class 0 OID 0)
-- Dependencies: 239
-- Name: shiftmapping_mapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shiftmapping_mapping_id_seq OWNED BY public.shiftmapping.mapping_id;


--
-- TOC entry 238 (class 1259 OID 24626)
-- Name: shifts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shifts (
    shift_code text NOT NULL,
    shift_name text NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL
);


ALTER TABLE public.shifts OWNER TO postgres;

--
-- TOC entry 4761 (class 2604 OID 16605)
-- Name: clients client_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN client_id SET DEFAULT nextval('public.clients_client_id_seq'::regclass);


--
-- TOC entry 4777 (class 2604 OID 16718)
-- Name: cuptransactions cup_txn_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuptransactions ALTER COLUMN cup_txn_id SET DEFAULT nextval('public.cuptransactions_cup_txn_id_seq'::regclass);


--
-- TOC entry 4759 (class 2604 OID 16595)
-- Name: designs design_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.designs ALTER COLUMN design_id SET DEFAULT nextval('public.designs_design_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 16614)
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- TOC entry 4783 (class 2604 OID 16764)
-- Name: printedcuptransactions printed_cup_txn_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.printedcuptransactions ALTER COLUMN printed_cup_txn_id SET DEFAULT nextval('public.printedcuptransactions_printed_cup_txn_id_seq'::regclass);


--
-- TOC entry 4765 (class 2604 OID 16635)
-- Name: rawmaterials material_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rawmaterials ALTER COLUMN material_id SET DEFAULT nextval('public.rawmaterials_material_id_seq'::regclass);


--
-- TOC entry 4768 (class 2604 OID 16646)
-- Name: rawmaterialtransactions raw_material_txn_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rawmaterialtransactions ALTER COLUMN raw_material_txn_id SET DEFAULT nextval('public.rawmaterialtransactions_raw_material_txn_id_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 16676)
-- Name: sheettransactions sheet_txn_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sheettransactions ALTER COLUMN sheet_txn_id SET DEFAULT nextval('public.sheettransactions_sheet_txn_id_seq'::regclass);


--
-- TOC entry 4786 (class 2604 OID 24638)
-- Name: shiftmapping mapping_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shiftmapping ALTER COLUMN mapping_id SET DEFAULT nextval('public.shiftmapping_mapping_id_seq'::regclass);


--
-- TOC entry 4791 (class 2606 OID 16609)
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_id);


--
-- TOC entry 4805 (class 2606 OID 16708)
-- Name: cups cups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cups
    ADD CONSTRAINT cups_pkey PRIMARY KEY (cup_id);


--
-- TOC entry 4803 (class 2606 OID 16699)
-- Name: cupspecs cupspecs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cupspecs
    ADD CONSTRAINT cupspecs_pkey PRIMARY KEY (label_id);


--
-- TOC entry 4807 (class 2606 OID 16725)
-- Name: cuptransactions cuptransactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuptransactions
    ADD CONSTRAINT cuptransactions_pkey PRIMARY KEY (cup_txn_id);


--
-- TOC entry 4789 (class 2606 OID 16600)
-- Name: designs designs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.designs
    ADD CONSTRAINT designs_pkey PRIMARY KEY (design_id);


--
-- TOC entry 4813 (class 2606 OID 24625)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (emp_code);


--
-- TOC entry 4793 (class 2606 OID 16620)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- TOC entry 4809 (class 2606 OID 16749)
-- Name: printedcups printedcups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.printedcups
    ADD CONSTRAINT printedcups_pkey PRIMARY KEY (printed_cup_id);


--
-- TOC entry 4811 (class 2606 OID 16770)
-- Name: printedcuptransactions printedcuptransactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.printedcuptransactions
    ADD CONSTRAINT printedcuptransactions_pkey PRIMARY KEY (printed_cup_txn_id);


--
-- TOC entry 4795 (class 2606 OID 16641)
-- Name: rawmaterials rawmaterials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rawmaterials
    ADD CONSTRAINT rawmaterials_pkey PRIMARY KEY (material_id);


--
-- TOC entry 4797 (class 2606 OID 16652)
-- Name: rawmaterialtransactions rawmaterialtransactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rawmaterialtransactions
    ADD CONSTRAINT rawmaterialtransactions_pkey PRIMARY KEY (raw_material_txn_id);


--
-- TOC entry 4799 (class 2606 OID 16671)
-- Name: sheets sheets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sheets
    ADD CONSTRAINT sheets_pkey PRIMARY KEY (sheet_id);


--
-- TOC entry 4801 (class 2606 OID 16682)
-- Name: sheettransactions sheettransactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sheettransactions
    ADD CONSTRAINT sheettransactions_pkey PRIMARY KEY (sheet_txn_id);


--
-- TOC entry 4817 (class 2606 OID 24644)
-- Name: shiftmapping shiftmapping_emp_code_date_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shiftmapping
    ADD CONSTRAINT shiftmapping_emp_code_date_key UNIQUE (emp_code, date);


--
-- TOC entry 4819 (class 2606 OID 24642)
-- Name: shiftmapping shiftmapping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shiftmapping
    ADD CONSTRAINT shiftmapping_pkey PRIMARY KEY (mapping_id);


--
-- TOC entry 4815 (class 2606 OID 24633)
-- Name: shifts shifts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shifts
    ADD CONSTRAINT shifts_pkey PRIMARY KEY (shift_code);


--
-- TOC entry 4826 (class 2606 OID 16709)
-- Name: cups cups_cup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cups
    ADD CONSTRAINT cups_cup_id_fkey FOREIGN KEY (cup_id) REFERENCES public.cupspecs(label_id);


--
-- TOC entry 4827 (class 2606 OID 16726)
-- Name: cuptransactions cuptransactions_cup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuptransactions
    ADD CONSTRAINT cuptransactions_cup_id_fkey FOREIGN KEY (cup_id) REFERENCES public.cups(cup_id);


--
-- TOC entry 4828 (class 2606 OID 16731)
-- Name: cuptransactions cuptransactions_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuptransactions
    ADD CONSTRAINT cuptransactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- TOC entry 4829 (class 2606 OID 16736)
-- Name: cuptransactions cuptransactions_sheet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuptransactions
    ADD CONSTRAINT cuptransactions_sheet_id_fkey FOREIGN KEY (sheet_id) REFERENCES public.sheets(sheet_id);


--
-- TOC entry 4820 (class 2606 OID 16626)
-- Name: orders orders_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(client_id);


--
-- TOC entry 4821 (class 2606 OID 16621)
-- Name: orders orders_design_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_design_id_fkey FOREIGN KEY (design_id) REFERENCES public.designs(design_id);


--
-- TOC entry 4830 (class 2606 OID 16755)
-- Name: printedcups printedcups_design_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.printedcups
    ADD CONSTRAINT printedcups_design_id_fkey FOREIGN KEY (design_id) REFERENCES public.designs(design_id);


--
-- TOC entry 4831 (class 2606 OID 16750)
-- Name: printedcups printedcups_printed_cup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.printedcups
    ADD CONSTRAINT printedcups_printed_cup_id_fkey FOREIGN KEY (printed_cup_id) REFERENCES public.cupspecs(label_id);


--
-- TOC entry 4832 (class 2606 OID 16781)
-- Name: printedcuptransactions printedcuptransactions_cup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.printedcuptransactions
    ADD CONSTRAINT printedcuptransactions_cup_id_fkey FOREIGN KEY (cup_id) REFERENCES public.cups(cup_id);


--
-- TOC entry 4833 (class 2606 OID 16786)
-- Name: printedcuptransactions printedcuptransactions_design_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.printedcuptransactions
    ADD CONSTRAINT printedcuptransactions_design_id_fkey FOREIGN KEY (design_id) REFERENCES public.designs(design_id);


--
-- TOC entry 4834 (class 2606 OID 16776)
-- Name: printedcuptransactions printedcuptransactions_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.printedcuptransactions
    ADD CONSTRAINT printedcuptransactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- TOC entry 4835 (class 2606 OID 16771)
-- Name: printedcuptransactions printedcuptransactions_printed_cup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.printedcuptransactions
    ADD CONSTRAINT printedcuptransactions_printed_cup_id_fkey FOREIGN KEY (printed_cup_id) REFERENCES public.printedcups(printed_cup_id);


--
-- TOC entry 4822 (class 2606 OID 16653)
-- Name: rawmaterialtransactions rawmaterialtransactions_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rawmaterialtransactions
    ADD CONSTRAINT rawmaterialtransactions_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.rawmaterials(material_id);


--
-- TOC entry 4823 (class 2606 OID 16658)
-- Name: rawmaterialtransactions rawmaterialtransactions_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rawmaterialtransactions
    ADD CONSTRAINT rawmaterialtransactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- TOC entry 4824 (class 2606 OID 16688)
-- Name: sheettransactions sheettransactions_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sheettransactions
    ADD CONSTRAINT sheettransactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id);


--
-- TOC entry 4825 (class 2606 OID 16683)
-- Name: sheettransactions sheettransactions_sheet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sheettransactions
    ADD CONSTRAINT sheettransactions_sheet_id_fkey FOREIGN KEY (sheet_id) REFERENCES public.sheets(sheet_id);


--
-- TOC entry 4836 (class 2606 OID 24645)
-- Name: shiftmapping shiftmapping_emp_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shiftmapping
    ADD CONSTRAINT shiftmapping_emp_code_fkey FOREIGN KEY (emp_code) REFERENCES public.employees(emp_code);


--
-- TOC entry 4837 (class 2606 OID 24650)
-- Name: shiftmapping shiftmapping_shift_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shiftmapping
    ADD CONSTRAINT shiftmapping_shift_code_fkey FOREIGN KEY (shift_code) REFERENCES public.shifts(shift_code);


-- Completed on 2025-08-15 15:21:31

--
-- PostgreSQL database dump complete
--

