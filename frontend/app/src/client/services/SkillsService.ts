/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SkillsRead } from '../models/SkillsRead';
import type { SkillsUpdate } from '../models/SkillsUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SkillsService {

    /**
     * Read Current Skills
     * @returns SkillsRead Successful Response
     * @throws ApiError
     */
    public static readCurrentSkillsProfilesMeSkillsGet(): CancelablePromise<SkillsRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profiles/@me/skills',
        });
    }

    /**
     * Update Current Skills
     * @param requestBody
     * @returns SkillsRead Successful Response
     * @throws ApiError
     */
    public static updateCurrentSkillsProfilesMeSkillsPut(
        requestBody: SkillsUpdate,
    ): CancelablePromise<SkillsRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/profiles/@me/skills',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
