import { Router } from "express";

import { shopController } from "./dependencies";

/**
 * @swagger
 * components:
 *  schemas:
 *    Shop:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of shop
 *        name:
 *          type: string
 *          description: The name of the shop
 *        conversion_points:
 *          type: Integer
 *          description: Point conversion rate and cashBack
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
 *        name: Texaco
 *        conversion_points: 1000
 *        created_at: 2023-09-25T15:32:27.240Z
 *        updated_at: 2023-09-25T15:32:27.240Z
 *    Error:
 *      type: object
 *      properties:
 *        ok:
 *          type: boolean
 *          description: Indicates that something went wrong
 *        message:
 *          type: string
 *          description: The error message
 *        error:
 *            type: object
 *
 *  parameters:
 *    shopId:
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
 *  name: Shop
 *  description: Shops endpoint
 */

const route = Router();

/**
 * @swagger
 * /shops/:
 *  get:
 *    summary: Returns a list of shops
 *    tags: [Shop]
 *    responses:
 *      200:
 *        description: the list of shops
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
 *                    $ref: '#/components/schemas/Shop'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *
 */
route.get("/shops/", shopController.findAll);

/**
 * @swagger
 * /shop/{id}:
 *  get:
 *    summary: Returns a shop
 *    tags: [Shop]
 *    parameters:
 *      - $ref: '#/components/parameters/shopId'
 *    responses:
 *      200:
 *        description: Information about the shop
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Shop'
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
route.get("/shop/:id", shopController.findById);

/**
 * @swagger
 * /shop/:
 *  post:
 *    summary: Create a new shop
 *    tags: [Shop]
 *    requestBody:
 *      description: Shop data to create
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: The name of the shop
 *            conversion_points:
 *              type: Integer
 *              description: Point conversion rate and cashBack
 *          example:
 *            name: TyrCode
 *            conversion_points: 1000
 *
 *    responses:
 *      201:
 *        description: Shop created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Shop'
 *      400:
 *        description: Bad request, validation error, or invalid input
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
route.post("/shop/", shopController.create);
/**
 * @swagger
 * /shop/{id}:
 *  patch:
 *    summary: Update an existing shop by ID
 *    tags: [Shop]
 *    parameters:
 *      - $ref: '#/components/parameters/shopId'
 *    requestBody:
 *      description: Updated shop data
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The updated name of the shop
 *              conversion_points:
 *                type: integer
 *                description: The updated point conversion rate and cashBack
 *            example:
 *              name: UpdatedShopName
 *              conversion_points: 1500
 *    responses:
 *      200:
 *        description: Shop updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Shop'
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
route.patch("/shop/:id", shopController.update);
/**
 * @swagger
 * /shop/{id}:
 *  delete:
 *    summary: Returns deleted shop
 *    tags: [Shop]
 *    parameters:
 *      - $ref: '#/components/parameters/shopId'
 *    responses:
 *      200:
 *        description: Delete shop
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Shop'
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
 *
 */
route.delete("/shop/:id", shopController.delete);

export default route;
