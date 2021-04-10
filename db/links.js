const { client } = require('./index');

const createLink = async ({count, date, description = '', url}) => {
    try {
        const { rows: [link]} = await client.query(`
            INSERT INTO links (count, date, description, url)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [count, date, description, url]);

        return link;
    } catch (error) {
        throw error;
    }
}

const getLinks = async () => {
    try {
        const { rows } = await client.query(`
            SELECT * from links;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
}

const getComments = async () => {
    try{
        const { rows } = await client.query(`
            SELECT * from comments;
        `);
        return rows
    } catch (error) {
        throw error
    }
}


module.exports = {
    createLink,
    getLinks,
    getComments
}