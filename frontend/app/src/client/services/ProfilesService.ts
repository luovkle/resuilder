/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_update_current_picture_profiles__me_picture_put } from "../models/Body_update_current_picture_profiles__me_picture_put";
import type { ProfileRead } from "../models/ProfileRead";
import type { ProfileUpdate } from "../models/ProfileUpdate";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ProfilesService {
  /**
   * Read Current Profile
   * @returns ProfileRead Successful Response
   * @throws ApiError
   */
  public static readCurrentProfileProfilesMeGet(): CancelablePromise<
    ProfileRead
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/profiles/@me",
    });
  }

  /**
   * Update Current Profile
   * @param requestBody
   * @returns ProfileRead Successful Response
   * @throws ApiError
   */
  public static updateCurrentProfileProfilesMePut(
    requestBody: ProfileUpdate,
  ): CancelablePromise<ProfileRead> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/profiles/@me",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Update Current Picture
   * @param formData
   * @returns ProfileRead Successful Response
   * @throws ApiError
   */
  public static updateCurrentPictureProfilesMePicturePut(
    formData: Body_update_current_picture_profiles__me_picture_put,
  ): CancelablePromise<ProfileRead> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/profiles/@me/picture",
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
