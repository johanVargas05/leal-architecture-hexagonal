import { Router } from "express";

import { rewardController } from "./dependencies";

/**
 * @swagger
 * components:
 *  schemas:
 *    Reward:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of reward
 *        name:
 *          type: string
 *          description: The name of the reward
 *        description:
 *          type: string
 *          description: The description of the reward
 *        points:
 *          type: integer
 *          description: Value in points
 *        coins:
 *          type: integer
 *          description: Value in coins
 *        thumbnail:
 *          type: string
 *          description: The thumbnail of the reward
 *        shop_id:
 *          type: string
 *          description: The id of the shop
 *        due_date:
 *          type: date
 *          description: The due date of the reward
 *        stock:
 *          type: integer
 *          description: The stock of the reward
 *        created_at:
 *          type: Date
 *          description: Date created
 *        updated_at:
 *          type: Date
 *          description: Date updated
 *      required:
 *        - name
 *        - points
 *        - coins
 *        - shop_id
 *        - description
 *      example:
 *        id: 503fe742-7820-4a80-b4a9-fa0a89583188
 *        name: Viaje a cartagena
 *        description: Es un viaje con todo pago
 *        points: 1000
 *        coins: 100000
 *        thumbnail: http://images.tes.com
 *        shop_id: 21c92cbc-6a30-4ed9-b23a-9684a152c0ac
 *        due_date: 2023-10-05T00:00:00.000Z
 *        stock: 2000
 *        created_at: 2023-09-26T15:11:43.858Z
 *        updated_at: 2023-09-26T15:11:43.858Z
 *  parameters:
 *    rewardId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the reward id
 */
/**
/**
 * @swagger
 * tags:
 *  name: Reward
 *  description: Rewards endpoint
 */

const route = Router();

/**
 * @swagger
 * /shop/{id}/rewards:
 *  get:
 *    summary: Get rewards associated with a shop by ID
 *    tags: [Reward, Shop]
 *    parameters:
 *      - $ref: '#/components/parameters/shopId'
 *    responses:
 *      200:
 *        description: List of rewards associated with the shop
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
 *                    $ref: '#/components/schemas/Reward'
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
route.get("/shop/:id/rewards", rewardController.findAllByShop);

/**
 * @swagger
 * /reward/{id}:
 *  get:
 *    summary: Get a reward by ID
 *    tags: [Reward]
 *    parameters:
 *      - $ref: '#/components/parameters/rewardId'
 *    responses:
 *      200:
 *        description: Information about the reward
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Reward'
 *      404:
 *        description: Reward not found
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
route.get("/reward/:id", rewardController.findById);
/**
 * @swagger
 * /reward:
 *  post:
 *    summary: Create a new reward
 *    tags: [Reward]
 *    requestBody:
 *      description: Reward data to create
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the reward
 *              description:
 *                type: string
 *                description: The description of the reward
 *              points:
 *                type: integer
 *                description: Value in points
 *              coins:
 *                type: integer
 *                description: Value in coins
 *              thumbnail:
 *                type: string
 *                description: The thumbnail of the reward
 *              shop_id:
 *                type: string
 *                description: The id of the shop
 *              due_date:
 *                type: date
 *                description: The due date of the reward
 *              stock:
 *                type: integer
 *                description: The stock of the reward
 *            required:
 *              - name
 *              - points
 *              - coins
 *              - shop_id
 *              - description
 *            example:
 *              name: Viaje a cartagena
 *              description: Es un viaje con todo pago
 *              thumbnail: http://images.tes.com
 *              due_date: 2023-10-05
 *              stock: 2000
 *              points: 1000
 *              coins: 100000
 *              shop_id: 21c92cbc-6a30-4ed9-b23a-9684a152c0ac
 *    responses:
 *      201:
 *        description: Reward created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Reward'
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
route.post("/reward", rewardController.create);

/**
 * @swagger
 * /reward/{id}:
 *  patch:
 *    summary: Update an existing reward by ID
 *    tags: [Reward]
 *    parameters:
 *      - $ref: '#/components/parameters/rewardId'
 *    requestBody:
 *      description: Updated reward data
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the reward
 *              description:
 *                type: string
 *                description: The description of the reward
 *              points:
 *                type: integer
 *                description: Value in points
 *              coins:
 *                type: integer
 *                description: Value in coins
 *              thumbnail:
 *                type: string
 *                description: The thumbnail of the reward
 *              shop_id:
 *                type: string
 *                description: The id of the shop
 *              due_date:
 *                type: date
 *                description: The due date of the reward
 *              stock:
 *                type: integer
 *                description: The stock of the reward
 *    responses:
 *      200:
 *        description: Reward updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Reward'
 *      400:
 *        description: Bad request, validation error, or invalid input
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      404:
 *        description: Reward not found
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
route.patch("/reward/:id", rewardController.update);

/**
 * @swagger
 * /reward/{id}:
 *  delete:
 *    summary: Delete a reward by ID
 *    tags: [Reward]
 *    parameters:
 *      - $ref: '#/components/parameters/rewardId'
 *    responses:
 *      200:
 *        description: Reward deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Reward'
 *      404:
 *        description: Reward not found
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
route.delete("/reward/:id", rewardController.delete);

export default route;
