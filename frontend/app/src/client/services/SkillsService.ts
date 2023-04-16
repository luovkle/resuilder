/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { SkillCreate } from '../models/SkillCreate';
import type { SkillRead } from '../models/SkillRead';
import type { SkillUpdate } from '../models/SkillUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SkillsService {

    /**
     * Read Current Skills
     * @returns SkillRead Successful Response
     * @throws ApiError
     */
    public static readCurrentSkillsProfilesMeSkillsGet(): CancelablePromise<Array<SkillRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profiles/@me/skills',
        });
    }

    /**
     * Create Skill
     * @param requestBody
     * @returns SkillRead Successful Response
     * @throws ApiError
     */
    public static createSkillProfilesMeSkillsPost(
        requestBody: SkillCreate,
    ): CancelablePromise<SkillRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/profiles/@me/skills',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Current Skill
     * @param id
     * @returns SkillRead Successful Response
     * @throws ApiError
     */
    public static readCurrentSkillProfilesMeSkillsIdGet(
        id: string,
    ): CancelablePromise<SkillRead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/profiles/@me/skills/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Current Skills
     * @param id
     * @param requestBody
     * @returns SkillRead Successful Response
     * @throws ApiError
     */
    public static updateCurrentSkillsProfilesMeSkillsIdPut(
        id: string,
        requestBody: SkillUpdate,
    ): CancelablePromise<SkillRead> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/profiles/@me/skills/{id}',
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

    /**
     * Delete Current Skill
     * @param id
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static deleteCurrentSkillProfilesMeSkillsIdDelete(
        id: string,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/profiles/@me/skills/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
