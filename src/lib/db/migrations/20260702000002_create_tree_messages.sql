CREATE TABLE IF NOT EXISTS tree_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  author_name TEXT DEFAULT 'Anonymous',
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS tree_messages_created_at_idx ON tree_messages(created_at DESC);
