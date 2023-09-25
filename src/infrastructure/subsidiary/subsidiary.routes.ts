import { Router } from "express";

import { subsidiaryController } from "./dependencies";
/**
 * @swagger
 * components:
 *  schemas:
 *    Subsidiary:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of subsidiary
 *        name:
 *          type: string
 *          description: The name of the subsidiary
 *        created_at:
 *          type: Date
 *          description: Date created
 *        updated_at:
 *          type: Date
 *          description: Date updated
 *      required:
 *        - name
 *        - conversion_points
 *      example:
 *        id: 5fb11bd0-22e4-4aca-872c-0bd3a67ec50c
 *        name: Texaco #1
 *        shop_id: 5fb11bd0-22e4-4aca-872c-0bd3a67ec50c
 *        created_at: 2023-09-25T15:32:27.240Z
 *        updated_at: 2023-09-25T15:32:27.240Z
 *  parameters:
 *    subsidiaryId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the shop id
 */
/**
 * @swagger
 * tags:
 *  name: Subsidiary
 *  description: Subsidiaries endpoint
 */

const route = Router();
/**
 * @swagger
 * /shop/{id}/subsidiaries:
 *  get:
 *    summary: Get subsidiaries of a shop by ID
 *    tags: [Subsidiary, Shop]
 *    parameters:
 *      - $ref: '#/components/parameters/subsidiaryId'
 *    responses:
 *      200:
 *        description: List of subsidiaries
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Subsidiary'
 *      404:
 *        description: Shop not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
route.get("/shop/:id/subsidiaries", subsidiaryController.findAll);
/**
 * @swagger
 * /subsidiary/{id}:
 *  get:
 *    summary: Get a subsidiary by ID
 *    tags: [Subsidiary]
 *    parameters:
 *      - $ref: '#/components/parameters/subsidiaryId'
 *    responses:
 *      200:
 *        description: Information about the subsidiary
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Subsidiary'
 *      404:
 *        description: Subsidiary not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
route.get("/subsidiary/:id", subsidiaryController.findById);
/**
 * @swagger
 * /shop/{id}/subsidiary:
 *  post:
 *    summary: Create a new subsidiary for a shop
 *    tags: [Subsidiary, Shop]
 *    parameters:
 *      - $ref: '#/components/parameters/shopId'
 *    requestBody:
 *      description: Subsidiary data to create
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the subsidiary
 *            example:
 *              name: NewSubsidiary
 *    responses:
 *      201:
 *        description: Subsidiary created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Subsidiary'
 *      400:
 *        description: Bad request, validation error, or invalid input
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      404:
 *        description: Shop not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
route.post("/shop/:id/subsidiary", subsidiaryController.create);
/**
 * @swagger
 * /subsidiary/{id}:
 *  patch:
 *    summary: Update an existing subsidiary by ID
 *    tags: [Subsidiary]
 *    parameters:
 *      - $ref: '#/components/parameters/subsidiaryId'
 *    requestBody:
 *      description: Updated subsidiary data
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The updated name of the subsidiary
 *            example:
 *              name: UpdatedSubsidiaryName
 *    responses:
 *      200:
 *        description: Subsidiary updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Subsidiary'
 *      400:
 *        description: Bad request, validation error, or invalid input
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      404:
 *        description: Subsidiary not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
route.patch("/subsidiary/:id", subsidiaryController.update);

/**
 * @swagger
 * /subsidiary/{id}:
 *  delete:
 *    summary: Delete a subsidiary by ID
 *    tags: [Subsidiary]
 *    parameters:
 *      - $ref: '#/components/parameters/subsidiaryId'
 *    responses:
 *      200:
 *        description: Subsidiary deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Subsidiary'
 *      404:
 *        description: Subsidiary not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */
route.delete("/subsidiary/:id", subsidiaryController.delete);

export default route;
