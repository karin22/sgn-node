const Pool = require('pg').Pool
const _ = require('lodash');
const pool = new Pool({
    user: 'vxksfxpc',
    host: 'satao.db.elephantsql.com',
    database: 'vxksfxpc',
    password: 'SgS4Xuhv-v6BZClxEqaGzaJdzf0LTqRn',
    port: 5432,
})

const query = `
  SELECT name, year, population
  FROM population_and_demography
  WHERE name NOT IN ('World' ,'Low-income countries', 'Land-locked developing countries (LLDC)', 'Less developed regions','Less developed regions, excluding China','Less developed regions, excluding least developed countries','Upper-middle-income countries','More developed regions','High-income countries','Asia (UN)','Lower-middle-income countries','Europe (UN)','Least developed countries','Africa (UN)','Latin America and the Caribbean (UN)','Northern America (UN)')
  ORDER BY population DESC
`;
const getPopulation = (request, response) => {
    pool.query(query, (error, results) => {
        if (error) {
            throw error
        }


        const groupByYear = _.groupBy(results.rows, "year");
        const mapData = []
        for (const key in groupByYear) {
            const total = _.sumBy(groupByYear[key], function (o) { return parseInt(o.population); });
            mapData.push({
                year: parseInt(key),
                total: total,
                country: groupByYear[key].map((x) => ({
                    name: x.name,
                    population: parseInt(x.population),
                    year: parseInt(x.year)
                }))
            })
        }

        response.status(200).json({ data: mapData })
    })
}
module.exports = {
    getPopulation
}