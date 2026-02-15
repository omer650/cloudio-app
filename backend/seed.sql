INSERT INTO categories (name) VALUES ('Customer Setups'), ('Project Files'), ('Admin Tools'), ('Network Maps'), ('Data Backups'), ('User Manuals') ON CONFLICT (name) DO NOTHING;
