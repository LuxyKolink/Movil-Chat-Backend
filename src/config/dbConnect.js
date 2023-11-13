import pg from 'pg';

const PGHOST = process.env.PGHOST;
const PGUSER = process.env.PGUSER;
const PGDATABASE = process.env.PGDATABASE;
const PGPASSWORD = process.env.PGPASSWORD;
const PGPORT = process.env.PGPORT;
const pgUrl = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

const client = new pg.Client({
    pgUrl,
});

export default client;
