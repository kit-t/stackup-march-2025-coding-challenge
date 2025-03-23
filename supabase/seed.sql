-- Products
INSERT INTO public.products (product_name, generic_name, manufacturer, dosage, unit_of_measure, description, reorder_level)
VALUES ('Aspirin', 'Acetylsalicylic acid', 'Bayer', '325mg', 'tablet', 'Pain reliever', 100);

-- Batches
INSERT INTO public.batches (product_id, batch_number, expiry_date, quantity, location)
VALUES ((SELECT id FROM public.products WHERE product_name = 'Aspirin'), 'BATCH001', '2025-12-31', 500, 'Warehouse A');

-- Suppliers
INSERT INTO public.suppliers (supplier_name, contact_person, phone, email, address)
VALUES ('PharmaCorp', 'John Doe', '123-456-7890', 'john.doe@pharmacorp.com', '123 Main St');

-- Purchase Orders
INSERT INTO public.purchase_orders (supplier_id, po_date, status)
VALUES ((SELECT id FROM public.suppliers WHERE supplier_name = 'PharmaCorp'), '2023-10-26', 'Received');

-- Purchase Order Items
INSERT INTO public.purchase_order_items (po_id, product_id, quantity_ordered, unit_price)
VALUES (
  (SELECT id FROM public.purchase_orders WHERE supplier_id = (SELECT id FROM public.suppliers WHERE supplier_name = 'PharmaCorp')),
  (SELECT id FROM public.products WHERE product_name = 'Aspirin'),
  500,
  1.50
);

-- Patients
INSERT INTO public.patients (patient_name, date_of_birth, address, phone)
VALUES ('Jane Smith', '1980-05-15', '456 Oak Ave', '987-654-3210');

-- Prescriptions
INSERT INTO public.prescriptions (patient_id, prescription_date, doctor_name, diagnosis)
VALUES ((SELECT id FROM public.patients WHERE patient_name = 'Jane Smith'), '2023-10-26', 'Dr. Alice Johnson', 'Headache');

-- Dispensing
INSERT INTO public.dispensing (prescription_id, batch_id, quantity_dispensed, dispensing_date)--, pharmacist_id)
VALUES (
  (SELECT id FROM public.prescriptions WHERE patient_id = (SELECT id FROM public.patients WHERE patient_name = 'Jane Smith')),
  (SELECT id FROM public.batches WHERE product_id = (SELECT id FROM public.products WHERE product_name = 'Aspirin')),
  10,
  '2025-03-20'
);