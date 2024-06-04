import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';

import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { StatusCodes } from 'http-status-codes';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({
      path: '/:id',
      method: HttpMethod.Get,
      handler: this.getExactOffer,
    });

    this.addRoute({
      path: '/:id',
      method: HttpMethod.Patch,
      handler: this.update,
    });

    this.addRoute({
      path: '/:id',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    {
      body,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response,
  ): Promise<void> {
    const existOffer = await this.offerService.findById(body.title);

    if (existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with title «${body.title}» exists.`,
        'OfferController',
      );
    }
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async getExactOffer(req: Request, res: Response): Promise<void> {
    const id = req.params?.id ?? '';
    const result = await this.offerService.findById(id);
    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found`,
      );
    }
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async update(
    req: Request<
      Record<string, string>,
      Record<string, unknown>,
      UpdateOfferDto
    >,
    res: Response,
  ) {
    const id = req.params.id ?? '';
    const result = await this.offerService.updateById(id, req.body);
    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found`,
      );
    }
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.id ?? '';
    const result = await this.offerService.deleteById(id);
    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found`,
      );
    }
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async getPremium(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremium();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }
}
