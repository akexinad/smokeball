const { httpGet } = require("./mock-http-interface");

const statusKeyMap = {
    200: "Arnie Quote",
    500: "FAILURE",
};

const getArnieQuotes = async (urls) => {
    if (!Array.isArray(urls)) {
        return {
            status: 400,
            title: "Bad Request",
            message: "URLs must be of type array",
        };
    }

    const responses = await Promise.all(urls.map((url) => httpGet(url)));

    const results = responses.map((res) => {
        const body = JSON.parse(res.body);

        return {
            [statusKeyMap[res.status]]: body.message,
        };
    });

    return results;
};

module.exports = {
    getArnieQuotes,
};
