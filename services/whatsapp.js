const { default: axios } = require("axios");
const knex = require('../config/knex');

module.exports.sendMessage = async ({ phone, message }) => {
    console.log({ message });
    try {
        const payload = {
            recipient_type: "individual",
            to: phone,
            type: "text",
            text: {
                body: message,
            },
        };
        await axios.post("https://waba-sandbox.360dialog.io/v1/messages", payload, {
            headers: { "D360-API-KEY": "emr1IC_sandbox", },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports.initConversation = async (phone) => {
    const payload = { phone, stage: 0, step: 0, payload: {} };
    try {
        await knex('stages').insert(payload)
            .onConflict('phone')
            .merge();
    } catch (error) {
        console.log(error);
    }
};

module.exports.getConversation = async (phone) => {
    try {
        const conversation = await knex('stages').where('phone', phone).first();
        return conversation;
    } catch (error) {
        return null;
    }
};

module.exports.updateConversation = async ({ phone, stage, payload }) => {
    try {
        await knex('stages').where('phone', phone).update({ stage, payload });
    } catch (error) {
        console.log(error);
    }
};

module.exports.deleteConversation = async (phone) => {
    try {
        await knex('stages').where('phone', phone).del();
    } catch (error) {
        console.log(error);
    }
};
