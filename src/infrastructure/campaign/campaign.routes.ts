import { Router } from "express";

import { campaignController } from "./dependencies";
/**
 * @swagger
 * components:
 *  schemas:
 *     Campaign:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the campaign.
 *         name:
 *           type: string
 *           description: The name of the campaign.
 *         description:
 *           type: string
 *           nullable: true
 *           description: A description of the campaign (optional).
 *         date_init:
 *           type: string
 *           format: date
 *           description: The start date of the campaign.
 *         date_finish:
 *           type: string
 *           format: date
 *           description: The end date of the campaign.
 *         reward:
 *           type: number
 *           description: The reward associated with the campaign.
 *         minimum_amount:
 *           type: number
 *           nullable: true
 *           description: The minimum required amount for participation (optional).
 *         is_cumulative:
 *           type: boolean
 *           description: Whether the campaign rewards are cumulative.
 *         created_at:
 *           type: string
 *           format: date
 *           description: The creation date of the campaign.
 *         updated_at:
 *           type: string
 *           format: date
 *           description: The last update date of the campaign.
 *       example:
 *         id: 5fb11bd0-22e4-4aca-872c-0bd3a67ec50c
 *         name: Summer Sale
 *         description: Get discounts on summer products.
 *         date_init: 2023-06-01T00:00:00Z
 *         date_finish: 2023-08-31T23:59:59Z
 *         reward: 1.3
 *         minimum_amount: 50000
 *         is_cumulative: true
 *         created_at: 2023-05-15T10:00:00Z
 *         updated_at: 2023-05-20T15:30:00Z
 *  parameters:
 *    campaignId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the campaign id
 */
/**
 * @swagger
 * tags:
 *  name: Campaign
 *  description: Campaigns endpoint
 */

const route = Router();

/**
 * @swagger
 * /shop/{id}/campaigns:
 *  get:
 *    summary: Get campaigns associated with a shop by ID
 *    tags: [Campaign, Shop]
 *    parameters:
 *      - $ref: '#/components/parameters/shopId'
 *    responses:
 *      200:
 *        description: List of campaigns associated with the shop
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
 *                    $ref: '#/components/schemas/Campaign'
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
route.get("/shop/:id/campaigns", campaignController.findByShop);

/**
 * @swagger
 * /subsidiary/{id}/campaigns:
 *  get:
 *    summary: Get campaigns associated with a subsidiary by ID
 *    tags: [Campaign, Subsidiary]
 *    parameters:
 *      - $ref: '#/components/parameters/subsidiaryId'
 *    responses:
 *      200:
 *        description: List of campaigns associated with the subsidiary
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
 *                    $ref: '#/components/schemas/Campaign'
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
route.get("/subsidiary/:id/campaigns", campaignController.findBySubsidiary);

/**
 * @swagger
 * /campaign/{id}:
 *  get:
 *    summary: Get a campaign by ID
 *    tags: [Campaign]
 *    parameters:
 *      - $ref: '#/components/parameters/campaignId'
 *    responses:
 *      200:
 *        description: Information about the campaign
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Campaign'
 *      404:
 *        description: Campaign not found
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
route.get("/campaign/:id", campaignController.findById);

/**
 * @swagger
 * /shop/{id}/campaign:
 *  post:
 *    summary: Create a new campaign associated with a shop by ID
 *    tags: [Campaign, Shop]
 *    parameters:
 *      - $ref: '#/components/parameters/shopId'
 *    requestBody:
 *      description: Campaign data to create
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the campaign.
 *              description:
 *                type: string
 *                nullable: true
 *                description: A description of the campaign (optional).
 *              date_init:
 *                type: string
 *                format: date
 *                description: The start date of the campaign.
 *              date_finish:
 *                type: string
 *                format: date
 *                description: The end date of the campaign.
 *              reward:
 *                type: number
 *                description: The reward associated with the campaign.
 *              minimum_amount:
 *                type: number
 *                nullable: true
 *                description: The minimum required amount for participation (optional).
 *              is_cumulative:
 *                type: boolean
 *                description: Whether the campaign rewards are cumulative.
 *          example:
 *            name: Summer Sale
 *            description: Get discounts on summer products.
 *            date_init: 2023-06-01T00:00:00Z
 *            date_finish: 2023-08-31T23:59:59Z
 *            reward: 1.3
 *            minimum_amount: 50000
 *            is_cumulative: true
 *    responses:
 *      201:
 *        description: Campaign created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Campaign'
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
route.post("/shop/:id/campaign", campaignController.createCampaignShop);
/**
 * @swagger
 * /subsidiary/{id}/campaign:
 *  post:
 *    summary: Create a new campaign associated with a subsidiary by ID
 *    tags: [Campaign, Subsidiary]
 *    parameters:
 *      - $ref: '#/components/parameters/subsidiaryId'
 *    requestBody:
 *      description: Campaign data to create
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the campaign.
 *              description:
 *                type: string
 *                nullable: true
 *                description: A description of the campaign (optional).
 *              date_init:
 *                type: string
 *                format: date
 *                description: The start date of the campaign.
 *              date_finish:
 *                type: string
 *                format: date
 *                description: The end date of the campaign.
 *              reward:
 *                type: number
 *                description: The reward associated with the campaign.
 *              minimum_amount:
 *                type: number
 *                nullable: true
 *                description: The minimum required amount for participation (optional).
 *              is_cumulative:
 *                type: boolean
 *                description: Whether the campaign rewards are cumulative.
 *          example:
 *            name: Summer Sale
 *            description: Get discounts on summer products.
 *            date_init: 2023-06-01T00:00:00Z
 *            date_finish: 2023-08-31T23:59:59Z
 *            reward: 1.3
 *            minimum_amount: 50000
 *            is_cumulative: true
 *    responses:
 *      201:
 *        description: Campaign created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Campaign'
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
route.post(
  "/subsidiary/:id/campaign",
  campaignController.createCampaignSubsidiary
);

/**
 * @swagger
 * /campaign/{id}:
 *  patch:
 *    summary: Update an existing campaign by ID
 *    tags: [Campaign]
 *    parameters:
 *      - $ref: '#/components/parameters/campaignId'
 *    requestBody:
 *      description: Updated campaign data
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the campaign.
 *              description:
 *                type: string
 *                nullable: true
 *                description: A description of the campaign (optional).
 *              date_init:
 *                type: string
 *                format: date
 *                description: The start date of the campaign.
 *              date_finish:
 *                type: string
 *                format: date
 *                description: The end date of the campaign.
 *              reward:
 *                type: number
 *                description: The reward associated with the campaign.
 *              minimum_amount:
 *                type: number
 *                nullable: true
 *                description: The minimum required amount for participation (optional).
 *              is_cumulative:
 *                type: boolean
 *                description: Whether the campaign rewards are cumulative.
 *          example:
 *            name: Summer Sale
 *            description: Get discounts on summer products.
 *            date_init: 2023-06-01T00:00:00Z
 *            date_finish: 2023-08-31T23:59:59Z
 *            reward: 1.3
 *            minimum_amount: 50000
 *            is_cumulative: true
 *    responses:
 *      200:
 *        description: Campaign updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Campaign'
 *      400:
 *        description: Bad request, validation error, or invalid input
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      404:
 *        description: Campaign not found
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
route.patch("/campaign/:id", campaignController.update);

/**
 * @swagger
 * /campaign/{id}:
 *  delete:
 *    summary: Delete a campaign by ID
 *    tags: [Campaign]
 *    parameters:
 *      - $ref: '#/components/parameters/campaignId'
 *    responses:
 *      200:
 *        description: Campaign deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Campaign'
 *      404:
 *        description: Campaign not found
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
route.delete("/campaign/:id", campaignController.delete);

export default route;
