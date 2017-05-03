CREATE OR REPLACE FUNCTION table_update_notify() RETURNS trigger AS $$
DECLARE
  id bigint;
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    id = NEW.id;
  ELSE
    id = OLD.id;
  END IF;
  PERFORM pg_notify('table_update', json_build_object('table', TG_TABLE_NAME, 'id', id, 'type', TG_OP)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER members_notify_update ON members;
CREATE TRIGGER members_notify_update AFTER UPDATE ON members FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER members_notify_insert ON members;
CREATE TRIGGER members_notify_insert AFTER INSERT ON members FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER members_notify_delete ON members;
CREATE TRIGGER members_notify_delete AFTER DELETE ON members FOR EACH ROW EXECUTE PROCEDURE table_update_notify();