INSERT INTO categories (name) VALUES ('System Docs'), ('Infrastructure'), ('User Guides') ON CONFLICT (name) DO NOTHING;
