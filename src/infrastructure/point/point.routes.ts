import { Router } from "express";

import { pointController } from "./dependencies";

/**
 * @swagger
 * tags:
 *  name: Point
 *  description: Points endpoint
 */

const route = Router();
/**
 * @swagger
 * /point/{user}/{shop}:
 *  get:
 *    summary: Get points for a user at a specific shop
 *    tags: [Point, User]
 *    parameters:
 *      - in : path
 *        name: user
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of the user
 *      - in : path
 *        name: shop
 *        schema:
 *          type: string
 *        required: true
 *        description: The id of the shop
 *    responses:
 *      200:
 *        description: Total accumulated points of a user in a specific shop
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: integer
 *      404:
 *        description: The user does not have points in this shop
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
route.get("/point/:user/:shop", pointController.findPointsUserByShop);

export default route;
