/// <reference path="../.d.ts" />

export module StatusCodes {
    export function isUnauthorizedError(statusCode: number): boolean {
        return statusCode === 401;
    }

    export function isUserError(statusCode: number): boolean {
        return ~~(statusCode / 100) === 4;
    }

    export function isOK(statusCode: number): boolean {
        return ~~(statusCode / 100) === 2;
    }
}
