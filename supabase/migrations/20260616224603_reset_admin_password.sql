UPDATE auth.users 
SET encrypted_password = crypt('Baratinhas@123', gen_salt('bf')),
    updated_at = now()
WHERE email = 'luanacamposdeazevedo@gmail.com';