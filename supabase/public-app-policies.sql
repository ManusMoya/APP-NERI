alter table factories enable row level security;
alter table products enable row level security;
alter table clients enable row level security;
alter table operations enable row level security;
alter table operation_items enable row level security;

drop policy if exists "Public app can read factories" on factories;
drop policy if exists "Public app can insert factories" on factories;
drop policy if exists "Public app can update factories" on factories;
drop policy if exists "Public app can delete factories" on factories;

drop policy if exists "Public app can read products" on products;
drop policy if exists "Public app can insert products" on products;
drop policy if exists "Public app can update products" on products;
drop policy if exists "Public app can delete products" on products;

drop policy if exists "Public app can read clients" on clients;
drop policy if exists "Public app can insert clients" on clients;
drop policy if exists "Public app can update clients" on clients;
drop policy if exists "Public app can delete clients" on clients;

drop policy if exists "Public app can read operations" on operations;
drop policy if exists "Public app can insert operations" on operations;
drop policy if exists "Public app can update operations" on operations;
drop policy if exists "Public app can delete operations" on operations;

drop policy if exists "Public app can read operation items" on operation_items;
drop policy if exists "Public app can insert operation items" on operation_items;
drop policy if exists "Public app can update operation items" on operation_items;
drop policy if exists "Public app can delete operation items" on operation_items;

create policy "Public app can read factories"
on factories for select
to anon
using (true);

create policy "Public app can insert factories"
on factories for insert
to anon
with check (true);

create policy "Public app can update factories"
on factories for update
to anon
using (true)
with check (true);

create policy "Public app can delete factories"
on factories for delete
to anon
using (true);

create policy "Public app can read products"
on products for select
to anon
using (true);

create policy "Public app can insert products"
on products for insert
to anon
with check (true);

create policy "Public app can update products"
on products for update
to anon
using (true)
with check (true);

create policy "Public app can delete products"
on products for delete
to anon
using (true);

create policy "Public app can read clients"
on clients for select
to anon
using (true);

create policy "Public app can insert clients"
on clients for insert
to anon
with check (true);

create policy "Public app can update clients"
on clients for update
to anon
using (true)
with check (true);

create policy "Public app can delete clients"
on clients for delete
to anon
using (true);

create policy "Public app can read operations"
on operations for select
to anon
using (true);

create policy "Public app can insert operations"
on operations for insert
to anon
with check (true);

create policy "Public app can update operations"
on operations for update
to anon
using (true)
with check (true);

create policy "Public app can delete operations"
on operations for delete
to anon
using (true);

create policy "Public app can read operation items"
on operation_items for select
to anon
using (true);

create policy "Public app can insert operation items"
on operation_items for insert
to anon
with check (true);

create policy "Public app can update operation items"
on operation_items for update
to anon
using (true)
with check (true);

create policy "Public app can delete operation items"
on operation_items for delete
to anon
using (true);
