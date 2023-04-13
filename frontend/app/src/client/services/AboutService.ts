/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AboutRead } from '../models/AboutRead';
import type { AboutUpdate } from '../models/AboutUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AboutService {

    /**
     * Read Current About
     * @returns AboutRead Successful Response
     * @throws ApiError
     */
    public static readCurrentAboutProfilesMeAboutGet(): CancelablePromise<AboutRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profiles/@me/about',
        });
    }

    /**
     * Update Current About
     * @param requestBody
     * @returns AboutRead Successful Response
     * @throws ApiError
     */
    public static updateCurrentAboutProfilesMeAboutPut(
        requestBody: AboutUpdate,
    ): CancelablePromise<AboutRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/profiles/@me/about',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
