/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactCreate } from "../models/ContactCreate";
import type { ContactRead } from "../models/ContactRead";
import type { ContactUpdate } from "../models/ContactUpdate";
import type { Message } from "../models/Message";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ContactsService {
  /**
   * Read Current Contacts
   * @returns ContactRead Successful Response
   * @throws ApiError
   */
  public static readCurrentContactsProfilesMeContactsGet(): CancelablePromise<
    Array<ContactRead>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/profiles/@me/contacts",
    });
  }

  /**
   * Create Current Contact
   * @param requestBody
   * @returns ContactRead Successful Response
   * @throws ApiError
   */
  public static createCurrentContactProfilesMeContactsPost(
    requestBody: ContactCreate,
  ): CancelablePromise<ContactRead> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/profiles/@me/contacts",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Current Contact
   * @param id
   * @returns ContactRead Successful Response
   * @throws ApiError
   */
  public static readCurrentContactProfilesMeContactsIdGet(
    id: string,
  ): CancelablePromise<ContactRead> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/profiles/@me/contacts/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Update Current Contact
   * @param id
   * @param requestBody
   * @returns ContactRead Successful Response
   * @throws ApiError
   */
  public static updateCurrentContactProfilesMeContactsIdPut(
    id: string,
    requestBody: ContactUpdate,
  ): CancelablePromise<ContactRead> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/profiles/@me/contacts/{id}",
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
   * Delete Current Contact
   * @param id
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteCurrentContactProfilesMeContactsIdDelete(
    id: string,
  ): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/profiles/@me/contacts/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
