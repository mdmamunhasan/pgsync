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

DROP TRIGGER commissions_notify_update ON commissions;
CREATE TRIGGER commissions_notify_update AFTER UPDATE ON commissions FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER retailers_notify_insert ON retailers;
CREATE TRIGGER retailers_notify_insert AFTER INSERT ON retailers FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER activities_notify_delete ON activities;
CREATE TRIGGER activities_notify_delete AFTER DELETE ON activities FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER age_group_notify_update ON age_group;
CREATE TRIGGER age_group_notify_update AFTER UPDATE ON age_group FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER api_access_notify_insert ON members;
CREATE TRIGGER api_access_notify_insert AFTER INSERT ON api_access FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER msisdns_notify_delete ON msisdns;
CREATE TRIGGER msisdns_notify_delete AFTER DELETE ON msisdns FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER business_subscribers_notify_update ON business_subscribers;
CREATE TRIGGER business_subscribers_notify_update AFTER UPDATE ON business_subscribers FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER campaigns_notify_insert ON campaigns;
CREATE TRIGGER campaigns_notify_insert AFTER INSERT ON campaigns FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER campaigns_log_notify_delete ON campaigns_log;
CREATE TRIGGER campaigns_log_notify_delete AFTER DELETE ON campaigns_log FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER catalog_notify_update ON catalog;
CREATE TRIGGER catalog_notify_update AFTER UPDATE ON catalog FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER commission_schema_notify_insert ON commission_schema;
CREATE TRIGGER commission_schema_notify_insert AFTER INSERT ON commission_schema FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER companies_notify_delete ON companies;
CREATE TRIGGER companies_notify_delete AFTER DELETE ON companies FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER discount_coupons_notify_update ON discount_coupons;
CREATE TRIGGER discount_coupons_notify_update AFTER UPDATE ON discount_coupons FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER discount_summary_notify_insert ON discount_summary;
CREATE TRIGGER discount_summary_notify_insert AFTER INSERT ON discount_summary FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER engagement_summary_notify_delete ON engagement_summary;
CREATE TRIGGER engagement_summary_notify_delete AFTER DELETE ON engagement_summary FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER failed_jobs_notify_update ON failed_jobs;
CREATE TRIGGER failed_jobs_notify_update AFTER UPDATE ON failed_jobs FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER feature_addons_notify_insert ON feature_addons;
CREATE TRIGGER feature_addons_notify_insert AFTER INSERT ON feature_addons FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER feedback_call_notify_delete ON feedback_call;
CREATE TRIGGER feedback_call_notify_delete AFTER DELETE ON feedback_call FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER invoices_notify_insert ON invoices;
CREATE TRIGGER invoices_notify_insert AFTER INSERT ON invoices FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER membership_history_notify_delete ON membership_history;
CREATE TRIGGER membership_history_notify_delete AFTER DELETE ON membership_history FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER messages_notify_update ON messages;
CREATE TRIGGER messages_notify_update AFTER UPDATE ON messages FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER monthly_rgcheck_notify_insert ON monthly_rgcheck;
CREATE TRIGGER monthly_rgcheck_notify_insert AFTER INSERT ON monthly_rgcheck FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER otp_notify_delete ON otp;
CREATE TRIGGER otp_notify_delete AFTER DELETE ON otp FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER partnership_sms_notify_delete ON partnership_sms;
CREATE TRIGGER partnership_sms_notify_delete AFTER DELETE ON partnership_sms FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER partnerships_notify_update ON partnerships;
CREATE TRIGGER partnerships_notify_update AFTER UPDATE ON partnerships FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER payment_methods_notify_insert ON payment_methods;
CREATE TRIGGER payment_methods_notify_insert AFTER INSERT ON payment_methods FOR EACH ROW EXECUTE PROCEDURE table_update_notify();

DROP TRIGGER profiles_notify_delete ON profiles;
CREATE TRIGGER profiles_notify_delete AFTER DELETE ON profiles FOR EACH ROW EXECUTE PROCEDURE table_update_notify();