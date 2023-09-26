import { Router } from "express";

import { transactionController } from "./dependencies";
/**
 * @swagger
 * components:
 *  schemas:
 *    Transaction:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of transaction
 *        description:
 *          type: string
 *          description: The description of the transaction
 *        valor:
 *          type: integer
 *          description: The valor of the transaction
 *        user_id:
 *          type: string
 *          description: The id of the user
 *        subsidiary_id:
 *          type: string
 *          description: The id of the subsidiary
 *        type_transaction:
 *          type: string
 *          description: The type of transaction "income" - "outgoing"
 *        type_currency:
 *          type: string
 *          description: The type currency of transaction "coins" - "points"
 *        real_money:
 *          type: integer
 *          description: The value of the purchase
 *        created_at:
 *          type: Date
 *          description: Date created
 *        updated_at:
 *          type: Date
 *          description: Date updated
 *      example:
 *        id: 5fb11bd0-22e4-4aca-872c-0bd3a67ec50c
 *        valor: 100
 *        description: test description
 *        user_id: 5fb11bd0-22e4-4aca-872c-0bd3a67ec50c
 *        subsidiary_id: 5fb11bd0-22e4-4aca-872c-0bd3a67ec50c
 *        type_transaction: income
 *        type_currency: points
 *        real_money: 50000
 *        created_at: 2023-09-25T15:32:27.240Z
 *        updated_at: 2023-09-25T15:32:27.240Z
 */

/**
 * @swagger
 * tags:
 *  name: Transaction
 *  description: Transactions endpoint
 */

const route = Router();
/**
 * @swagger
 * /transaction/income:
 *  post:
 *    summary: Record an income transaction in a subsidiary
 *    tags: [Transaction]
 *    requestBody:
 *      description: Transaction data to record income
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *                description: The user's ID.
 *              subsidiary_id:
 *                type: string
 *                description: The subsidiary's ID.
 *              amount:
 *                type: number
 *                description: The transaction amount.
 *              description:
 *                type: string
 *                description: Description of the transaction.
 *    responses:
 *      200:
 *        description: Income transaction recorded successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  properties:
 *                    coins:
 *                      type: number
 *                      description: The updated coins balance.
 *                    points:
 *                      type: number
 *                      description: The updated points balance.
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
route.post("/transaction/income", transactionController.purchaseInSubsidiary);
/**
 * @swagger
 * /transaction/redeem:
 *  post:
 *    summary: Record an outgoing transaction (purchase) in a subsidiary
 *    tags: [Transaction]
 *    requestBody:
 *      description: Transaction data for an outgoing purchase
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: string
 *                description: The user's ID.
 *              subsidiary_id:
 *                type: string
 *                description: The subsidiary's ID.
 *              reward_id:
 *                type: string
 *                description: The ID of the reward being redeemed.
 *              type_redeem:
 *                type: string
 *                enum: ["points", "coins"]
 *                description: The type of currency used for redemption (points or coins).
 *    responses:
 *      200:
 *        description: Outgoing transaction (purchase) recorded successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  properties:
 *                    cost:
 *                      type: number
 *                      description: The cost of the redeemed reward.
 *                    new_balance:
 *                      type: number
 *                      description: The updated balance after the transaction.
 *                    description:
 *                      type: string
 *                      description: Description of the transaction.
 *                    type_currency:
 *                      type: string
 *                      description: The type of currency used for the transaction (points or coins).
 *                    shopId:
 *                      type: string
 *                      description: The ID of the shop where the transaction occurred.
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
route.post("/transaction/redeem", transactionController.purchaseInSubsidiary);
/**
 * @swagger
 * /transaction/user/{id}:
 *  get:
 *    summary: Get transactions by user ID
 *    tags: [Transaction, User]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: List of transactions for the user
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
 *                    $ref: '#/components/schemas/Transaction'
 *      404:
 *        description: User not found
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
route.get("/transaction/user/:id", transactionController.findByUser);
/**
 * @swagger
 * /transaction/subsidiary/{id}:
 *  get:
 *    summary: Get transactions by subsidiary ID
 *    tags: [Transaction, Subsidiary]
 *    parameters:
 *      - $ref: '#/components/parameters/subsidiaryId'
 *    responses:
 *      200:
 *        description: List of transactions for the subsidiary
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
 *                    $ref: '#/components/schemas/Transaction'
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
route.get(
  "/transaction/subsidiary/:id",
  transactionController.findBySubsidiary
);
/**
 * @swagger
 * /transaction/shop/{id}:
 *  get:
 *    summary: Get transactions by shop ID
 *    tags: [Transaction, Shop]
 *    parameters:
 *      - $ref: '#/components/parameters/shopId'
 *    responses:
 *      200:
 *        description: List of transactions for the shop
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
 *                    $ref: '#/components/schemas/Transaction'
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
route.get("/transaction/shop/:id", transactionController.findByShop);

export default route;
