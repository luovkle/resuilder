/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AboutRead } from "../models/AboutRead";
import type { AboutUpdate } from "../models/AboutUpdate";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AboutsService {
  /**
   * Read Current About
   * @returns AboutRead Successful Response
   * @throws ApiError
   */
  public static readCurrentAboutProfilesMeAboutsGet(): CancelablePromise<AboutRead> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/profiles/@me/abouts",
    });
  }

  /**
   * Update Current About
   * @param requestBody
   * @returns AboutRead Successful Response
   * @throws ApiError
   */
  public static updateCurrentAboutProfilesMeAboutsPut(
    requestBody: AboutUpdate
  ): CancelablePromise<AboutRead> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/profiles/@me/abouts",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
