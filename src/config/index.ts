const {
    TELEGRAM_TOKEN,
    TELEGRAM_USERS_TABLE,
} = process.env;

export const CONFIG =  {
    TABLES: {
        TELEGRAM_USERS: TELEGRAM_USERS_TABLE,
    },
    TELEGRAM: {
        TOKEN: TELEGRAM_TOKEN,
    },
};
