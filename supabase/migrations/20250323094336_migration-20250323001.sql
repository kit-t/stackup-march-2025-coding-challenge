create table "public"."batches" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "product_id" uuid,
    "batch_number" character varying(255) not null,
    "expiry_date" date,
    "quantity" integer,
    "location" character varying(255)
);


alter table "public"."batches" enable row level security;

create table "public"."dispensing" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "prescription_id" uuid,
    "batch_id" uuid,
    "quantity_dispensed" integer,
    "dispensing_date" date
);


alter table "public"."dispensing" enable row level security;

create table "public"."patients" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "patient_name" character varying(255) not null,
    "date_of_birth" date,
    "address" text,
    "phone" character varying(20)
);


alter table "public"."patients" enable row level security;

create table "public"."prescriptions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "patient_id" uuid,
    "prescription_date" date,
    "doctor_name" character varying(255),
    "diagnosis" character varying(255)
);


alter table "public"."prescriptions" enable row level security;

create table "public"."products" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "product_name" character varying(255) not null,
    "generic_name" character varying(255),
    "manufacturer" character varying(255),
    "dosage" character varying(255),
    "unit_of_measure" character varying(50),
    "description" text,
    "reorder_level" integer
);


alter table "public"."products" enable row level security;

create table "public"."purchase_order_items" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "po_id" uuid,
    "product_id" uuid,
    "quantity_ordered" integer,
    "unit_price" numeric
);


alter table "public"."purchase_order_items" enable row level security;

create table "public"."purchase_orders" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "supplier_id" uuid,
    "po_date" date,
    "status" character varying(50)
);


alter table "public"."purchase_orders" enable row level security;

create table "public"."suppliers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "supplier_name" character varying(255) not null,
    "contact_person" character varying(255),
    "phone" character varying(20),
    "email" character varying(255),
    "address" text
);


alter table "public"."suppliers" enable row level security;

CREATE INDEX batch_product_id_idx ON public.batches USING btree (product_id);

CREATE UNIQUE INDEX batches_pkey ON public.batches USING btree (id);

CREATE INDEX dispensing_batch_id_idx ON public.dispensing USING btree (batch_id);

CREATE UNIQUE INDEX dispensing_pkey ON public.dispensing USING btree (id);

CREATE INDEX dispensing_prescription_id_idx ON public.dispensing USING btree (prescription_id);

CREATE UNIQUE INDEX patients_pkey ON public.patients USING btree (id);

CREATE INDEX po_supplier_id_idx ON public.purchase_orders USING btree (supplier_id);

CREATE INDEX poi_po_id_idx ON public.purchase_order_items USING btree (po_id);

CREATE INDEX prescription_patient_id_idx ON public.prescriptions USING btree (patient_id);

CREATE UNIQUE INDEX prescriptions_pkey ON public.prescriptions USING btree (id);

CREATE INDEX product_name_idx ON public.products USING btree (product_name);

CREATE UNIQUE INDEX products_pkey ON public.products USING btree (id);

CREATE UNIQUE INDEX purchase_order_items_pkey ON public.purchase_order_items USING btree (id);

CREATE UNIQUE INDEX purchase_orders_pkey ON public.purchase_orders USING btree (id);

CREATE UNIQUE INDEX suppliers_pkey ON public.suppliers USING btree (id);

alter table "public"."batches" add constraint "batches_pkey" PRIMARY KEY using index "batches_pkey";

alter table "public"."dispensing" add constraint "dispensing_pkey" PRIMARY KEY using index "dispensing_pkey";

alter table "public"."patients" add constraint "patients_pkey" PRIMARY KEY using index "patients_pkey";

alter table "public"."prescriptions" add constraint "prescriptions_pkey" PRIMARY KEY using index "prescriptions_pkey";

alter table "public"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "public"."purchase_order_items" add constraint "purchase_order_items_pkey" PRIMARY KEY using index "purchase_order_items_pkey";

alter table "public"."purchase_orders" add constraint "purchase_orders_pkey" PRIMARY KEY using index "purchase_orders_pkey";

alter table "public"."suppliers" add constraint "suppliers_pkey" PRIMARY KEY using index "suppliers_pkey";

alter table "public"."batches" add constraint "batches_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) not valid;

alter table "public"."batches" validate constraint "batches_product_id_fkey";

alter table "public"."dispensing" add constraint "dispensing_batch_id_fkey" FOREIGN KEY (batch_id) REFERENCES batches(id) not valid;

alter table "public"."dispensing" validate constraint "dispensing_batch_id_fkey";

alter table "public"."dispensing" add constraint "dispensing_prescription_id_fkey" FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) not valid;

alter table "public"."dispensing" validate constraint "dispensing_prescription_id_fkey";

alter table "public"."prescriptions" add constraint "prescriptions_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES patients(id) not valid;

alter table "public"."prescriptions" validate constraint "prescriptions_patient_id_fkey";

alter table "public"."purchase_order_items" add constraint "purchase_order_items_po_id_fkey" FOREIGN KEY (po_id) REFERENCES purchase_orders(id) not valid;

alter table "public"."purchase_order_items" validate constraint "purchase_order_items_po_id_fkey";

alter table "public"."purchase_order_items" add constraint "purchase_order_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) not valid;

alter table "public"."purchase_order_items" validate constraint "purchase_order_items_product_id_fkey";

alter table "public"."purchase_orders" add constraint "purchase_orders_supplier_id_fkey" FOREIGN KEY (supplier_id) REFERENCES suppliers(id) not valid;

alter table "public"."purchase_orders" validate constraint "purchase_orders_supplier_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.upsert_prescription_with_items(patient_id uuid, prescription_date date, doctor_name character varying, diagnosis character varying, dispensing jsonb, prescription_id uuid DEFAULT gen_random_uuid())
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    item_record JSONB;
    item_id UUID;
    item_ids UUID[];
BEGIN
    -- Upsert Prescription
    INSERT INTO public.prescriptions (id, patient_id, prescription_date, doctor_name, diagnosis)
    VALUES (prescription_id, patient_id, prescription_date, doctor_name, diagnosis)
    ON CONFLICT (id) DO UPDATE
    SET
        patient_id = EXCLUDED.patient_id,
        prescription_date = EXCLUDED.prescription_date,
        doctor_name = EXCLUDED.doctor_name,
        diagnosis = EXCLUDED.diagnosis;

    -- Upsert Dispensing Items
    item_ids := ARRAY[]::UUID[];

    FOR item_record IN SELECT * FROM jsonb_array_elements(dispensing)
    LOOP
        item_id := COALESCE((item_record->>'id')::UUID, gen_random_uuid());

        INSERT INTO public.dispensing (id, prescription_id, batch_id, quantity_dispensed, dispensing_date)
        VALUES (
            item_id,
            prescription_id,
            (item_record->>'batch_id')::UUID,
            (item_record->>'quantity_dispensed')::INTEGER,
            (item_record->>'dispensing_date')::DATE
        )
        ON CONFLICT (id) DO UPDATE
        SET
            prescription_id = EXCLUDED.prescription_id,
            batch_id = EXCLUDED.batch_id,
            quantity_dispensed = EXCLUDED.quantity_dispensed,
            dispensing_date = EXCLUDED.dispensing_date;

        item_ids := array_append(item_ids, item_id);
    END LOOP;

    -- Delete dispensing items not in the payload
    DELETE FROM public.dispensing
    WHERE public.dispensing.prescription_id = upsert_prescription_with_items.prescription_id AND public.dispensing.id <> ALL(item_ids);

END;
$function$
;

CREATE OR REPLACE FUNCTION public.upsert_purchase_order_with_items(supplier_id uuid, po_date date, status character varying, purchase_order_items jsonb, po_id uuid DEFAULT gen_random_uuid())
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    item_record JSONB;
    item_id UUID;
    item_ids UUID[];
BEGIN
    -- Upsert Purchase Order
    INSERT INTO public.purchase_orders (id, supplier_id, po_date, status)
    VALUES (po_id, supplier_id, po_date, status)
    ON CONFLICT (id) DO UPDATE
    SET
        supplier_id = EXCLUDED.supplier_id,
        po_date = EXCLUDED.po_date,
        status = EXCLUDED.status;

    -- Upsert Purchase Order Items
    item_ids := ARRAY[]::UUID[];

    FOR item_record IN SELECT * FROM jsonb_array_elements(purchase_order_items)
    LOOP
        item_id := COALESCE((item_record->>'id')::UUID, gen_random_uuid());

        INSERT INTO public.purchase_order_items (id, po_id, product_id, quantity_ordered, unit_price)
        VALUES (
            item_id,
            po_id,
            (item_record->>'product_id')::UUID,
            (item_record->>'quantity_ordered')::INTEGER,
            (item_record->>'unit_price')::DECIMAL
        )
        ON CONFLICT (id) DO UPDATE
        SET
            po_id = EXCLUDED.po_id,
            product_id = EXCLUDED.product_id,
            quantity_ordered = EXCLUDED.quantity_ordered,
            unit_price = EXCLUDED.unit_price;

        item_ids := array_append(item_ids, item_id);
    END LOOP;

    -- Delete items not in the payload
    DELETE FROM public.purchase_order_items
    WHERE public.purchase_order_items.po_id = upsert_purchase_order_with_items.po_id AND public.purchase_order_items.id <> ALL(item_ids);

END;
$function$
;

grant delete on table "public"."batches" to "anon";

grant insert on table "public"."batches" to "anon";

grant references on table "public"."batches" to "anon";

grant select on table "public"."batches" to "anon";

grant trigger on table "public"."batches" to "anon";

grant truncate on table "public"."batches" to "anon";

grant update on table "public"."batches" to "anon";

grant delete on table "public"."batches" to "authenticated";

grant insert on table "public"."batches" to "authenticated";

grant references on table "public"."batches" to "authenticated";

grant select on table "public"."batches" to "authenticated";

grant trigger on table "public"."batches" to "authenticated";

grant truncate on table "public"."batches" to "authenticated";

grant update on table "public"."batches" to "authenticated";

grant delete on table "public"."batches" to "service_role";

grant insert on table "public"."batches" to "service_role";

grant references on table "public"."batches" to "service_role";

grant select on table "public"."batches" to "service_role";

grant trigger on table "public"."batches" to "service_role";

grant truncate on table "public"."batches" to "service_role";

grant update on table "public"."batches" to "service_role";

grant delete on table "public"."dispensing" to "anon";

grant insert on table "public"."dispensing" to "anon";

grant references on table "public"."dispensing" to "anon";

grant select on table "public"."dispensing" to "anon";

grant trigger on table "public"."dispensing" to "anon";

grant truncate on table "public"."dispensing" to "anon";

grant update on table "public"."dispensing" to "anon";

grant delete on table "public"."dispensing" to "authenticated";

grant insert on table "public"."dispensing" to "authenticated";

grant references on table "public"."dispensing" to "authenticated";

grant select on table "public"."dispensing" to "authenticated";

grant trigger on table "public"."dispensing" to "authenticated";

grant truncate on table "public"."dispensing" to "authenticated";

grant update on table "public"."dispensing" to "authenticated";

grant delete on table "public"."dispensing" to "service_role";

grant insert on table "public"."dispensing" to "service_role";

grant references on table "public"."dispensing" to "service_role";

grant select on table "public"."dispensing" to "service_role";

grant trigger on table "public"."dispensing" to "service_role";

grant truncate on table "public"."dispensing" to "service_role";

grant update on table "public"."dispensing" to "service_role";

grant delete on table "public"."patients" to "anon";

grant insert on table "public"."patients" to "anon";

grant references on table "public"."patients" to "anon";

grant select on table "public"."patients" to "anon";

grant trigger on table "public"."patients" to "anon";

grant truncate on table "public"."patients" to "anon";

grant update on table "public"."patients" to "anon";

grant delete on table "public"."patients" to "authenticated";

grant insert on table "public"."patients" to "authenticated";

grant references on table "public"."patients" to "authenticated";

grant select on table "public"."patients" to "authenticated";

grant trigger on table "public"."patients" to "authenticated";

grant truncate on table "public"."patients" to "authenticated";

grant update on table "public"."patients" to "authenticated";

grant delete on table "public"."patients" to "service_role";

grant insert on table "public"."patients" to "service_role";

grant references on table "public"."patients" to "service_role";

grant select on table "public"."patients" to "service_role";

grant trigger on table "public"."patients" to "service_role";

grant truncate on table "public"."patients" to "service_role";

grant update on table "public"."patients" to "service_role";

grant delete on table "public"."prescriptions" to "anon";

grant insert on table "public"."prescriptions" to "anon";

grant references on table "public"."prescriptions" to "anon";

grant select on table "public"."prescriptions" to "anon";

grant trigger on table "public"."prescriptions" to "anon";

grant truncate on table "public"."prescriptions" to "anon";

grant update on table "public"."prescriptions" to "anon";

grant delete on table "public"."prescriptions" to "authenticated";

grant insert on table "public"."prescriptions" to "authenticated";

grant references on table "public"."prescriptions" to "authenticated";

grant select on table "public"."prescriptions" to "authenticated";

grant trigger on table "public"."prescriptions" to "authenticated";

grant truncate on table "public"."prescriptions" to "authenticated";

grant update on table "public"."prescriptions" to "authenticated";

grant delete on table "public"."prescriptions" to "service_role";

grant insert on table "public"."prescriptions" to "service_role";

grant references on table "public"."prescriptions" to "service_role";

grant select on table "public"."prescriptions" to "service_role";

grant trigger on table "public"."prescriptions" to "service_role";

grant truncate on table "public"."prescriptions" to "service_role";

grant update on table "public"."prescriptions" to "service_role";

grant delete on table "public"."products" to "anon";

grant insert on table "public"."products" to "anon";

grant references on table "public"."products" to "anon";

grant select on table "public"."products" to "anon";

grant trigger on table "public"."products" to "anon";

grant truncate on table "public"."products" to "anon";

grant update on table "public"."products" to "anon";

grant delete on table "public"."products" to "authenticated";

grant insert on table "public"."products" to "authenticated";

grant references on table "public"."products" to "authenticated";

grant select on table "public"."products" to "authenticated";

grant trigger on table "public"."products" to "authenticated";

grant truncate on table "public"."products" to "authenticated";

grant update on table "public"."products" to "authenticated";

grant delete on table "public"."products" to "service_role";

grant insert on table "public"."products" to "service_role";

grant references on table "public"."products" to "service_role";

grant select on table "public"."products" to "service_role";

grant trigger on table "public"."products" to "service_role";

grant truncate on table "public"."products" to "service_role";

grant update on table "public"."products" to "service_role";

grant delete on table "public"."purchase_order_items" to "anon";

grant insert on table "public"."purchase_order_items" to "anon";

grant references on table "public"."purchase_order_items" to "anon";

grant select on table "public"."purchase_order_items" to "anon";

grant trigger on table "public"."purchase_order_items" to "anon";

grant truncate on table "public"."purchase_order_items" to "anon";

grant update on table "public"."purchase_order_items" to "anon";

grant delete on table "public"."purchase_order_items" to "authenticated";

grant insert on table "public"."purchase_order_items" to "authenticated";

grant references on table "public"."purchase_order_items" to "authenticated";

grant select on table "public"."purchase_order_items" to "authenticated";

grant trigger on table "public"."purchase_order_items" to "authenticated";

grant truncate on table "public"."purchase_order_items" to "authenticated";

grant update on table "public"."purchase_order_items" to "authenticated";

grant delete on table "public"."purchase_order_items" to "service_role";

grant insert on table "public"."purchase_order_items" to "service_role";

grant references on table "public"."purchase_order_items" to "service_role";

grant select on table "public"."purchase_order_items" to "service_role";

grant trigger on table "public"."purchase_order_items" to "service_role";

grant truncate on table "public"."purchase_order_items" to "service_role";

grant update on table "public"."purchase_order_items" to "service_role";

grant delete on table "public"."purchase_orders" to "anon";

grant insert on table "public"."purchase_orders" to "anon";

grant references on table "public"."purchase_orders" to "anon";

grant select on table "public"."purchase_orders" to "anon";

grant trigger on table "public"."purchase_orders" to "anon";

grant truncate on table "public"."purchase_orders" to "anon";

grant update on table "public"."purchase_orders" to "anon";

grant delete on table "public"."purchase_orders" to "authenticated";

grant insert on table "public"."purchase_orders" to "authenticated";

grant references on table "public"."purchase_orders" to "authenticated";

grant select on table "public"."purchase_orders" to "authenticated";

grant trigger on table "public"."purchase_orders" to "authenticated";

grant truncate on table "public"."purchase_orders" to "authenticated";

grant update on table "public"."purchase_orders" to "authenticated";

grant delete on table "public"."purchase_orders" to "service_role";

grant insert on table "public"."purchase_orders" to "service_role";

grant references on table "public"."purchase_orders" to "service_role";

grant select on table "public"."purchase_orders" to "service_role";

grant trigger on table "public"."purchase_orders" to "service_role";

grant truncate on table "public"."purchase_orders" to "service_role";

grant update on table "public"."purchase_orders" to "service_role";

grant delete on table "public"."suppliers" to "anon";

grant insert on table "public"."suppliers" to "anon";

grant references on table "public"."suppliers" to "anon";

grant select on table "public"."suppliers" to "anon";

grant trigger on table "public"."suppliers" to "anon";

grant truncate on table "public"."suppliers" to "anon";

grant update on table "public"."suppliers" to "anon";

grant delete on table "public"."suppliers" to "authenticated";

grant insert on table "public"."suppliers" to "authenticated";

grant references on table "public"."suppliers" to "authenticated";

grant select on table "public"."suppliers" to "authenticated";

grant trigger on table "public"."suppliers" to "authenticated";

grant truncate on table "public"."suppliers" to "authenticated";

grant update on table "public"."suppliers" to "authenticated";

grant delete on table "public"."suppliers" to "service_role";

grant insert on table "public"."suppliers" to "service_role";

grant references on table "public"."suppliers" to "service_role";

grant select on table "public"."suppliers" to "service_role";

grant trigger on table "public"."suppliers" to "service_role";

grant truncate on table "public"."suppliers" to "service_role";

grant update on table "public"."suppliers" to "service_role";

create policy "Enable ALL for authenticated users"
on "public"."batches"
as permissive
for all
to authenticated
using (true);


create policy "Enable ALL for authenticated users"
on "public"."dispensing"
as permissive
for all
to authenticated
using (true);


create policy "Enable ALL for authenticated users"
on "public"."patients"
as permissive
for all
to authenticated
using (true);


create policy "Enable ALL for authenticated users"
on "public"."prescriptions"
as permissive
for all
to authenticated
using (true);


create policy "Enable ALL for authenticated users"
on "public"."products"
as permissive
for all
to authenticated
using (true);


create policy "Enable ALL for authenticated users"
on "public"."purchase_order_items"
as permissive
for all
to authenticated
using (true);


create policy "Enable ALL for authenticated users"
on "public"."purchase_orders"
as permissive
for all
to authenticated
using (true);


create policy "Enable ALL for authenticated users"
on "public"."suppliers"
as permissive
for all
to authenticated
using (true);



