import { Router } from "express";

import { userController } from "./dependencies";

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of user
 *        name:
 *          type: string
 *          description: The name of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        balance:
 *          type: integer
 *          description: Number of user coins
 *        created_at:
 *          type: Date
 *          description: Date created
 *        updated_at:
 *          type: Date
 *          description: Date updated
 *      required:
 *        - name
 *        - email
 *      example:
 *        id: 5fb11bd0-22e4-4aca-872c-0bd3a67ec50c
 *        name: Johan vargas
 *        email: test@tes.com
 *        balance_coins: 100
 *        created_at: 2023-09-25T15:32:27.240Z
 *        updated_at: 2023-09-25T15:32:27.240Z
 *  parameters:
 *    userId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the user id
 */
/**
 * @swagger
 * tags:
 *  name: User
 *  description: Users endpoint
 */

const route = Router();
/**
 * @swagger
 * /users:
 *  get:
 *    summary: Get a list of all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: List of users
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
 *                    $ref: '#/components/schemas/User'
 *      404:
 *        description: There are not users
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
route.get("/users", userController.findAll);
/**
 * @swagger
 * /user/{id}:
 *  get:
 *    summary: Get a user by ID
 *    tags: [User]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: Information about the user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
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
route.get("/user/:id", userController.findById);
/**
 * @swagger
 * /user:
 *  post:
 *    summary: Create a new user
 *    tags: [User]
 *    requestBody:
 *      description: User data to create
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The  name of the user
 *              email:
 *                type: string
 *                description: The  email of the user
 *              balance:
 *                type: integer
 *                description: Beginning balance
 *            example:
 *              name: Camilo Jimenez
 *              email: test@test.com
 *              balance: 10
 *            required:
 *              - name
 *              - email
 *    responses:
 *      201:
 *        description: User created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
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
route.post("/user", userController.create);
/**
 * @swagger
 * /user/{id}:
 *  patch:
 *    summary: Update an existing user by ID
 *    tags: [User]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    requestBody:
 *      description: Updated user data
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The  name of the user
 *              email:
 *                type: string
 *                description: The  email of the user
 *            example:
 *              name: Camilo Jimenez
 *              email: test@test.com
 *    responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request, validation error, or invalid input
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
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
route.patch("/user/:id", userController.update);
/**
 * @swagger
 * /user/{id}:
 *  delete:
 *    summary: Delete a user by ID
 *    tags: [User]
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: User deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
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
route.delete("/user/:id", userController.delete);

export default route;
