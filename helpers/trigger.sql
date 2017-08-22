CREATE OR REPLACE FUNCTION table_update_notify() RETURNS trigger AS $$
DECLARE
  id bigint;
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    PERFORM pg_notify('table_update', json_build_object('table', TG_TABLE_NAME, TG_OP, NEW)::text);
  ELSE
    id = OLD.id;
    PERFORM pg_notify('table_update', json_build_object('table', TG_TABLE_NAME, TG_OP, id)::text);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;