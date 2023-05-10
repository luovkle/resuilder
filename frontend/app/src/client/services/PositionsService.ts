/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_update_current_picture_profiles__me_positions__id__picture_put } from "../models/Body_update_current_picture_profiles__me_positions__id__picture_put";
import type { Message } from "../models/Message";
import type { PositionCreate } from "../models/PositionCreate";
import type { PositionRead } from "../models/PositionRead";
import type { PositionUpdate } from "../models/PositionUpdate";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class PositionsService {
  /**
   * Read Current Positions
   * @returns PositionRead Successful Response
   * @throws ApiError
   */
  public static readCurrentPositionsProfilesMePositionsGet(): CancelablePromise<
    Array<PositionRead>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/profiles/@me/positions",
    });
  }

  /**
   * Create Position
   * @param requestBody
   * @returns PositionRead Successful Response
   * @throws ApiError
   */
  public static createPositionProfilesMePositionsPost(
    requestBody: PositionCreate
  ): CancelablePromise<PositionRead> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/profiles/@me/positions",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Current Position
   * @param id
   * @returns PositionRead Successful Response
   * @throws ApiError
   */
  public static readCurrentPositionProfilesMePositionsIdGet(
    id: string
  ): CancelablePromise<PositionRead> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/profiles/@me/positions/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Update Current Position
   * @param id
   * @param requestBody
   * @returns PositionRead Successful Response
   * @throws ApiError
   */
  public static updateCurrentPositionProfilesMePositionsIdPut(
    id: string,
    requestBody: PositionUpdate
  ): CancelablePromise<PositionRead> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/profiles/@me/positions/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Delete Current Position
   * @param id
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteCurrentPositionProfilesMePositionsIdDelete(
    id: string
  ): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/profiles/@me/positions/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Update Current Picture
   * @param id
   * @param formData
   * @returns PositionRead Successful Response
   * @throws ApiError
   */
  public static updateCurrentPictureProfilesMePositionsIdPicturePut(
    id: string,
    formData: Body_update_current_picture_profiles__me_positions__id__picture_put
  ): CancelablePromise<PositionRead> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/profiles/@me/positions/{id}/picture",
      path: {
        id: id,
      },
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
