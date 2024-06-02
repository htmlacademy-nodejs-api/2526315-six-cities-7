import { Request } from 'express';
import { RequestParams } from './request.params.type.js';
import { RequestBody } from './request-body.type.js';
import { CreateUserDto } from '../../../modules/user/index.js';

export type CreateUserRequest = Request<
  RequestParams,
  RequestBody,
  CreateUserDto
>;
