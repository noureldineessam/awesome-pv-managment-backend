export class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundError';
    }
}

export class UserAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserAlreadyExistsError';
    }
}


/**
 * Error thrown when a facility is not found.
 */
export class FacilityNotFoundError extends Error {
    constructor(message = 'Facility not found', ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FacilityNotFoundError);
        }

        this.name = 'FacilityNotFoundError';
        this.message = message;
    }
}

/**
 * Error thrown when a facility already exists.
 */
export class FacilityAlreadyExistsError extends Error {
    constructor(message = 'Facility already exists', ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FacilityAlreadyExistsError);
        }

        this.name = 'FacilityAlreadyExistsError';
        this.message = message;
    }
}



export class InvalidCredentialsError extends Error {
    /**
     * Creates an instance of InvalidCredentialsError.
     * @param {string} message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'InvalidCredentialsError';
        this.statusCode = 401; // HTTP status code for Unauthorized
    }
}


// graphql/errors.js
export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
        this.extensions = { code: 'UNAUTHENTICATED' };
    }
}

export class UserInputError extends Error {
    constructor(message, details) {
        super(message);
        this.name = 'UserInputError';
        this.extensions = { code: 'BAD_USER_INPUT', details };
    }
}
