const { Pool } = require('pg');

const pool = new Pool({
  user: 'reader',
  password: 'NWDMCE5xdipIjRrp',
  host: 'hh-pgsql-public.ebi.ac.uk',
  port: '5432',
  database: 'pfmegrnargs',
});

module.exports = pool;
