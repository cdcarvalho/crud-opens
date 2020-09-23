const httpStatusCode = Object.freeze({
    OK: 200,
    BAD_RESQUEST: 400,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500
})

const httpStatusText = Object.freeze({
    OK: 'OK',
    BAD_REQUEST: 'Bad Requenst',
    UNAUTHORIZED: 'Unauthorized',
    SERVER_ERROR: 'Intern Server Error',
})

module.exports = {
    httpStatusCode,
    httpStatusText,
}