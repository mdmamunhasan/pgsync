CREATE TABLE public.members
(
  id serial PRIMARY KEY,
  membership_no character varying(15),
  status character varying(15),
  details jsonb[],
  membership_type character varying(25) DEFAULT 'TonicBasic'::character varying
)
WITH (
  OIDS=FALSE
);