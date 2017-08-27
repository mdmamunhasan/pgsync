
CREATE TABLE commissions (
    id serial NOT NULL,
    retailernumber character varying(15) NOT NULL,
    commission_type character varying(25) NOT NULL,
    amount numeric NOT NULL,
    msisdn character varying NOT NULL,
    product_code character varying NOT NULL,
    transaction_code character varying(25),
    generated_at timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE retailers (
    id serial NOT NULL,
    retailernumber character varying(13) NOT NULL,
    retailername character varying(70),
    addedon timestamp without time zone DEFAULT now() NOT NULL,
    pos_code character varying(15),
    region character varying(20),
    area character varying(35),
    distributor_name character varying(50),
    territory character varying(50),
    se_number character varying(13),
    se_code character varying(20),
    type character varying(25) NOT NULL,
    target integer,
    ro_name character varying(50),
    business_circle character varying(50),
    tm_name character varying(50)
);
CREATE TABLE activities (
    id serial NOT NULL,
    msisdn character varying(15) NOT NULL,
    activitytime timestamp without time zone DEFAULT now() NOT NULL,
    activity character varying(100) NOT NULL,
    channel character varying(25) NOT NULL,
    activityscore integer,
    activitycode character varying(100) NOT NULL,
    activityinfo jsonb,
    service_name character varying(25)
);
CREATE TABLE age_group (
    id serial NOT NULL,
    start_age integer NOT NULL,
    end_age integer NOT NULL,
    "group" character varying(25) NOT NULL
);
CREATE TABLE api_access (
    id serial NOT NULL,
    service_name character varying(25) NOT NULL,
    key character varying(25) NOT NULL,
    access jsonb NOT NULL
);
CREATE TABLE members (
    id serial NOT NULL,
    membership_no character varying(15) NOT NULL,
    status character varying(15) NOT NULL,
    details jsonb DEFAULT '{}'::jsonb NOT NULL,
    membership_type character varying(25) DEFAULT 'TonicBasic'::character varying NOT NULL,
    campaign jsonb DEFAULT '{}'::jsonb NOT NULL,
    addons jsonb DEFAULT '{}'::jsonb NOT NULL
);
CREATE TABLE msisdns (
    id serial NOT NULL,
    membership_no character varying(15) NOT NULL,
    msisdn character varying(13) NOT NULL
);
CREATE TABLE business_subscribers (
    id serial NOT NULL,
    company_code character varying(40) NOT NULL,
    campaign_code character varying(100),
    status character varying(100),
    msisdn character varying(13),
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    product_code character varying(100),
    remarks character varying(300),
    created_by character varying(25),
    created_on timestamp without time zone DEFAULT now() NOT NULL,
    updated_by character varying(25),
    updated_on timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE campaigns (
    id serial NOT NULL,
    product_code character varying(20) NOT NULL,
    campaign_code character varying(50) NOT NULL,
    campaign_type character varying(20) NOT NULL,
    campaign_title jsonb DEFAULT '{}'::jsonb NOT NULL,
    campaign_summary jsonb DEFAULT '{}'::jsonb NOT NULL,
    status character varying(15) DEFAULT 'Active'::character varying NOT NULL,
    campaign_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    allowed_for jsonb DEFAULT '{}'::jsonb NOT NULL,
    charging_type character varying(15) DEFAULT 'OneTime'::character varying NOT NULL,
    charge_amount integer DEFAULT 0 NOT NULL,
    pay_string jsonb DEFAULT '{}'::jsonb NOT NULL,
    validity jsonb DEFAULT '{}'::jsonb NOT NULL,
    products jsonb DEFAULT '{}'::jsonb NOT NULL,
    freebie jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    triggers jsonb[] DEFAULT '{}'::jsonb[] NOT NULL,
    created_by character varying(25),
    updated_by character varying(25)
);
CREATE TABLE campaigns_log (
    id serial NOT NULL,
    campaign_code character varying(50) NOT NULL,
    campaign_type character varying(20) NOT NULL,
    membership_no character varying(15) NOT NULL,
    availed_at timestamp without time zone DEFAULT now() NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    other_info jsonb DEFAULT '{}'::jsonb NOT NULL,
    channel character varying(35) DEFAULT 'WEB'::character varying NOT NULL
);
CREATE TABLE catalog (
    id serial NOT NULL,
    history_id integer NOT NULL
);
CREATE TABLE catalog_history (
    id serial NOT NULL,
    catalog_id integer,
    product_code character varying(20) NOT NULL,
    product_title jsonb NOT NULL,
    product_summary jsonb,
    product_details character varying(100),
    charging_type character varying(20),
    cover_count integer,
    charge_amount integer NOT NULL,
    validity jsonb NOT NULL,
    status character varying(15) NOT NULL,
    other_charges jsonb,
    vat jsonb,
    service_charge jsonb,
    unsubscription_charge integer,
    unsubscription_effective character varying(20),
    discounted_price integer,
    currency character varying(10),
    created_by character varying(25),
    created_on timestamp without time zone DEFAULT now() NOT NULL,
    updated_by character varying(25),
    updated_on timestamp without time zone DEFAULT now() NOT NULL,
    products jsonb NOT NULL,
    freebie jsonb,
    triggers jsonb[] DEFAULT '{}'::jsonb[] NOT NULL,
    sequence integer DEFAULT 5 NOT NULL
);
CREATE TABLE commission_schema (
    id serial NOT NULL,
    product_code character varying(25) NOT NULL,
    data jsonb NOT NULL
);
CREATE TABLE companies (
    id serial NOT NULL,
    company_code character varying(40) NOT NULL,
    company_name character varying(150),
    address character varying(500),
    phone character varying(20),
    email character varying(100),
    contact_person character varying(100),
    contact_details character varying(500),
    created_by character varying(25),
    created_on timestamp without time zone DEFAULT now() NOT NULL,
    updated_by character varying(25),
    updated_on timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE discount_coupons (
    id serial NOT NULL,
    coupon_code character varying(20) NOT NULL,
    partner_code character varying(20),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    used boolean DEFAULT false NOT NULL,
    used_on timestamp without time zone,
    used_msisdn character varying(15)
);
CREATE TABLE discount_summary (
    date date,
    partnercode character varying(10),
    totalrequest integer,
    totalapproved integer
);
CREATE TABLE engagement_summary (
    date date,
    type character varying(40),
    count integer,
    channel character varying(25)
);
CREATE TABLE failed_jobs (
    id serial NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT ('now'::text)::timestamp(0) with time zone NOT NULL
);
CREATE TABLE feature_addons (
    id serial NOT NULL,
    membership_no character varying(15) NOT NULL,
    campaign_code character varying(50),
    products jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone,
    status character varying(15) DEFAULT 'Active'::character varying NOT NULL,
    other_info jsonb DEFAULT '{}'::jsonb NOT NULL
);
CREATE TABLE feedback_call (
    id serial NOT NULL,
    msisdn character varying(15) NOT NULL,
    requestedon timestamp without time zone,
    status character varying(50),
    calledby character varying(50),
    calledon timestamp without time zone
);
CREATE TABLE invoices (
    id serial NOT NULL,
    company_code character varying(40) NOT NULL,
    invoice_number character varying(100),
    total_subscriber integer,
    total_amount integer,
    invoice_start_date timestamp without time zone,
    invoice_end_date timestamp without time zone,
    invoice_date timestamp without time zone,
    invoice_due_date timestamp without time zone,
    invoice_paid_date timestamp without time zone,
    invoice_summary character varying(400),
    remarks character varying(300),
    status character varying(50),
    created_by character varying(25),
    created_on timestamp without time zone DEFAULT now() NOT NULL,
    updated_by character varying(25),
    updated_on timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE membership_history (
    id serial NOT NULL,
    membership_no character varying(15) NOT NULL,
    product_code character varying(20) NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    by character varying(25) DEFAULT 'self'::character varying NOT NULL,
    insurance_start timestamp without time zone NOT NULL
);

CREATE TABLE messages (
    id serial NOT NULL,
    code character varying(50) NOT NULL,
    msg_bn character varying(1000),
    msg_en character varying(1000),
    msg_ben character varying(300)
);
CREATE TABLE monthly_rgcheck (
    id serial NOT NULL,
    msisdn character varying(15),
    status character varying(5),
    month character varying(2),
    year character varying(4),
    date timestamp without time zone
);

CREATE TABLE otp (
    id serial NOT NULL,
    msisdn character varying(13) NOT NULL,
    channel character varying(25) NOT NULL,
    code numeric NOT NULL,
    expires_on timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE partnership_sms (
    id serial NOT NULL,
    partnercode character varying(15) NOT NULL,
    msisdn character varying(13) NOT NULL,
    requestedon timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE partnerships (
    id serial NOT NULL,
    partnercode character varying(15) NOT NULL,
    smscustomershort character varying(500),
    smscustomerlong character varying(1000),
    smshospital character varying(1000),
    hospitalphone character varying(100),
    sendcoupon boolean DEFAULT false NOT NULL,
    allowed_members character varying(100)[] DEFAULT '{All}'::character varying[],
    executive_healthcheck boolean DEFAULT false
);
CREATE TABLE payment_methods (
    id serial NOT NULL,
    payment_code character varying(20) NOT NULL,
    payment_name character varying(50),
    service_charge numeric DEFAULT '0'::numeric NOT NULL,
    status character varying(15) NOT NULL,
    config jsonb
);
CREATE TABLE profiles (
    id serial NOT NULL,
    membership_no character varying(20) NOT NULL,
    profile jsonb DEFAULT '{}'::jsonb NOT NULL,
    preferences jsonb DEFAULT '{}'::jsonb NOT NULL,
    interest jsonb DEFAULT '{}'::jsonb NOT NULL,
    notifications jsonb DEFAULT '{}'::jsonb NOT NULL,
    security_questions jsonb DEFAULT '{}'::jsonb NOT NULL,
    last_updated_on timestamp without time zone DEFAULT now() NOT NULL,
    health_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    subscriptions jsonb DEFAULT '[]'::jsonb NOT NULL,
    cards jsonb DEFAULT '[]'::jsonb NOT NULL
);
CREATE TABLE registration_summary (
    date date,
    channel character varying(25),
    count integer,
    unsubscribed integer
);

CREATE TABLE retailer_invites (
    id serial NOT NULL,
    retailernumber character varying(15) NOT NULL,
    retailer_type character varying(25) NOT NULL,
    invite_type character varying(25) NOT NULL,
    msisdn character varying(15) NOT NULL,
    invitedon timestamp without time zone DEFAULT now() NOT NULL,
    status character varying(10) NOT NULL,
    accepted_at timestamp without time zone,
    requested_package character varying(25) DEFAULT 'TonicBasic'::character varying NOT NULL,
    accepted_package character varying(25)
);

CREATE TABLE transactions (
    id serial NOT NULL,
    channel character varying(25),
    service_name character varying(100),
    request_time timestamp without time zone DEFAULT now() NOT NULL,
    requested_amount numeric DEFAULT 0 NOT NULL,
    requested_code character varying(100),
    status character varying(100),
    membership_no character varying(20),
    payment_type character varying(50),
    transaction_code character varying(25),
    transaction_completed_on timestamp without time zone DEFAULT now(),
    product_code character varying(100),
    other_info jsonb,
    msisdn character varying(15)
);

CREATE TABLE sms_log (
    id serial NOT NULL,
    messageid integer,
    msisdn character varying(15) NOT NULL,
    smstime timestamp without time zone DEFAULT now() NOT NULL,
    smstype character varying(3) NOT NULL,
    smscategory character varying(25) NOT NULL,
    deliverystatus boolean DEFAULT false NOT NULL,
    smstext character varying(300)
);
CREATE TABLE subscription_history (
    id serial NOT NULL,
    membership_no character varying(15) NOT NULL,
    updatedon timestamp without time zone DEFAULT now() NOT NULL,
    status character varying(25) NOT NULL,
    channel character varying(25) NOT NULL,
    prev character varying(25),
    current character varying(25),
    other_info jsonb DEFAULT '{}'::jsonb NOT NULL
);
CREATE TABLE th_internal_members (
    msisdn character varying(13),
    membership_no character varying(20),
    user_type character varying(20)
);

CREATE TABLE tonic_plus_history (
    id serial NOT NULL,
    msisdn character varying(13) NOT NULL,
    membership_no character varying(15) NOT NULL,
    product_code character varying(25) NOT NULL,
    transaction_id integer,
    type character varying(35) DEFAULT 'NEW_SUBSCRIPTION'::character varying NOT NULL,
    preference jsonb DEFAULT '{}'::jsonb,
    dates jsonb NOT NULL,
    other_info jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    updated_by character varying
);

CREATE TABLE usage_logs (
    id serial NOT NULL,
    membership_no character varying(15) NOT NULL,
    service_name character varying(25) NOT NULL,
    count integer DEFAULT 1 NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone,
    other_info jsonb DEFAULT '{}'::jsonb NOT NULL
);

CREATE TABLE whitelist (
    id serial NOT NULL,
    msisdn character varying(13) NOT NULL
);


ALTER TABLE ONLY api_access ADD CONSTRAINT api_access_key_key UNIQUE (key);
ALTER TABLE ONLY api_access ADD CONSTRAINT api_access_service_name_key UNIQUE (service_name);
ALTER TABLE ONLY commission_schema ADD CONSTRAINT commission_schema_product_code_key UNIQUE (product_code);
ALTER TABLE ONLY failed_jobs ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);
ALTER TABLE ONLY feedback_call ADD CONSTRAINT feedback_call_pkey PRIMARY KEY (id);
ALTER TABLE ONLY members ADD CONSTRAINT members_membership_no_key UNIQUE (membership_no);
ALTER TABLE ONLY messages ADD CONSTRAINT messages_code_key UNIQUE (code);
ALTER TABLE ONLY msisdns ADD CONSTRAINT msisdns_membership_no_key UNIQUE (membership_no);
ALTER TABLE ONLY msisdns ADD CONSTRAINT msisdns_msisdn_key UNIQUE (msisdn);
ALTER TABLE ONLY partnerships ADD CONSTRAINT partnerships_partnercode_key UNIQUE (partnercode);
ALTER TABLE ONLY retailers ADD CONSTRAINT primarykey PRIMARY KEY (id);
ALTER TABLE ONLY discount_summary ADD CONSTRAINT unq_discount_date_code UNIQUE (date, partnercode);
ALTER TABLE ONLY engagement_summary ADD CONSTRAINT unq_engagement_data UNIQUE (date, type, channel);
ALTER TABLE ONLY retailers ADD CONSTRAINT unqretailer UNIQUE (retailernumber);
ALTER TABLE ONLY whitelist ADD CONSTRAINT whitelist_msisdn_key UNIQUE (msisdn);
/*ALTER TABLE ONLY tmp_retailer ADD CONSTRAINT tmp_retailer_retailer_key UNIQUE (retailer);
ALTER TABLE ONLY daily_member_acc1 ADD CONSTRAINT unique_col_day_date UNIQUE (day_date);*/

CREATE INDEX idx_activity_activitycode ON activities USING btree (activitycode);
CREATE INDEX idx_activity_channel ON activities USING btree (channel);
CREATE INDEX idx_activity_msisdn ON activities USING btree (msisdn);
CREATE INDEX idx_addons_id ON feature_addons USING btree (id);
CREATE INDEX idx_addons_membership_no ON feature_addons USING btree (membership_no);
CREATE INDEX idx_campaigns_log_campaign_code ON campaigns_log USING btree (campaign_code);
CREATE INDEX idx_campaigns_log_campaign_type ON campaigns_log USING btree (campaign_type);
CREATE INDEX idx_campaigns_log_membership_no ON campaigns_log USING btree (membership_no);
CREATE INDEX idx_gin_subscriptions ON profiles USING gin (subscriptions);
CREATE INDEX idx_membership_type ON members USING btree (membership_type);
CREATE INDEX members_expr_idx ON members USING btree (((campaign ->> 'campaign_type'::text)));
CREATE INDEX partnership_sms_date_idx ON partnership_sms USING btree (((requestedon)::date));
CREATE INDEX retailer_invites_msisdn_idx ON retailer_invites USING btree (msisdn);
CREATE UNIQUE INDEX unique_rg_check ON monthly_rgcheck USING btree (msisdn, month, year);
/*CREATE INDEX idx_day_date ON daily_sale_transaction_retailer_self_summary USING btree (day_date);
CREATE INDEX idx_tonic_plus_started_on ON tonic_plus_members_details_last14_days USING btree (tonic_plus_started_on);*/
