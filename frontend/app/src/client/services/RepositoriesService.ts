/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RepositoryRead } from '../models/RepositoryRead';
import type { RepositoryUpdate } from '../models/RepositoryUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RepositoriesService {

    /**
     * Read Current Repositories
     * @returns RepositoryRead Successful Response
     * @throws ApiError
     */
    public static readCurrentRepositoriesProfilesMeRepositoriesGet(): CancelablePromise<Array<RepositoryRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profiles/@me/repositories',
        });
    }

    /**
     * Read Current Repository
     * @param id
     * @returns RepositoryRead Successful Response
     * @throws ApiError
     */
    public static readCurrentRepositoryProfilesMeRepositoriesIdGet(
        id: string,
    ): CancelablePromise<RepositoryRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profiles/@me/repositories/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Current Repository
     * @param id
     * @param requestBody
     * @returns RepositoryRead Successful Response
     * @throws ApiError
     */
    public static updateCurrentRepositoryProfilesMeRepositoriesIdPut(
        id: string,
        requestBody: RepositoryUpdate,
    ): CancelablePromise<RepositoryRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/profiles/@me/repositories/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
