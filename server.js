const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// PostgreSQL pool configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
});

app.use(cors());
app.use(express.json());


// Validate column name to prevent SQL injection
const validColumns = ['id', 'name', 'salary', 'age'];

const isValidColumn = (column) => validColumns.includes(column);

// Endpoint to fetch autocomplete suggestions dynamically
app.get('/api/employees/list', async (req, res) => {
  const { column = 'name', search = '', page = 1, limit = 10 } = req.query;

  if (!isValidColumn(column)) {
    return res.status(400).send('Invalid column name');
  }

  try {
    const offset = (page - 1) * limit;
    const query = `
      SELECT DISTINCT ${column}
      FROM employees
      WHERE ${column}::text ILIKE $1
      ORDER BY ${column}
      LIMIT $2 OFFSET $3;
    `;
    const values = [`%${search}%`, parseInt(limit, 10), parseInt(offset, 10)];

    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server error');
  }
});


const buildFilterQuery = (filters, operator) => {
  const filterConditions = [];
  const values = [];
  let valueIndex = 1;

  for (const key in filters) {
    if (Array.isArray(filters[key]) && filters[key].length > 0) {
      filterConditions.push(`${key} IN (${filters[key].map(() => `$${valueIndex++}`).join(', ')})`);
      values.push(...filters[key]);
    }
  }

  return {
    filterQuery: filterConditions.length > 0 ? `WHERE ${filterConditions.join(` ${operator} `)}` : '',
    values,
  };
};

// Endpoint to fetch employees with pagination and multi-column filters
app.post('/api/employees', async (req, res) => {
  const { page = 1, limit = 10, filters = {}, operator = 'AND' } = req.body;

  try {
    const offset = (page - 1) * limit;
    const filterOperator = operator.toUpperCase() === 'AND' ? 'AND' : 'OR';
    const { filterQuery, values } = buildFilterQuery(filters, filterOperator);

    // Separate queries to fetch data and count total filtered rows
    const countQuery = `
      SELECT COUNT(*) AS total_filtered_count
      FROM employees
      ${filterQuery};
    `;
    
    const dataQuery = `
      SELECT id, name, salary, age
      FROM employees
      ${filterQuery}
      ORDER BY id
      LIMIT $${values.length + 1} OFFSET $${values.length + 2};
    `;
    
    values.push(parseInt(limit, 10), parseInt(offset, 10));

    // Execute both queries
    const totalFilteredCountResult = await pool.query(countQuery, values.slice(0, values.length - 2));
    const totalFilteredCount = parseInt(totalFilteredCountResult.rows[0].total_filtered_count, 10);
    const totalPages = Math.ceil(totalFilteredCount / limit);

    const dataResult = await pool.query(dataQuery, values);

    const rows = dataResult.rows.map(row => ({
      id: row.id,
      name: row.name,
      salary: row.salary,
      age: row.age
    }));

    res.json({
      rows,
      totalFilteredCount,
      totalPages
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server error');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
