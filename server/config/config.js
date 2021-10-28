const config = {
    default: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    }
}

exports.get = function get(env){
    return config[env] || config.default;
}